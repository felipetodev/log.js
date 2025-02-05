/* eslint-disable import/namespace */
import { useEffect, useState, useRef } from "react"
import { editor } from "monaco-editor";
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import CodeExecutionWorker from '~/lib/worker/code-execution?worker';
import debounce from "just-debounce-it";
import { useTabsStore } from "~/store/tabs";
import { useSettingsStore } from "~/store/settings";
import * as themes from "~/lib/themes";
import { transform } from "@babel/standalone";

function babelTransform(code: string) {
  return transform(code, {
    presets: [
      'env',
      'typescript',
    ],
    plugins: [
      ["proposal-pipeline-operator", { proposal: "minimal" }],
    ],
    filename: "log.ts",
  }).code;
}

export function useEditorPreview(activeTab: string) {
  const [isLoading, setIsLoading] = useState(true)
  const [output, setOutput] = useState<string>('')
  const inputEditor = useRef<editor.IStandaloneCodeEditor | null>(null);
  const outputEditor = useRef<editor.IStandaloneCodeEditor | null>(null);
  const inputEditorContainer = useRef<HTMLDivElement>(null)
  const outputEditorContainer = useRef<HTMLDivElement>(null)

  const hasHydratedStorage = useTabsStore(state => state._hasHydrated);
  const language = useSettingsStore(state => state.language);
  const options = useSettingsStore(state => state.options);

  useEffect(() => {
    inputEditor.current?.updateOptions(options)
    outputEditor.current?.updateOptions(options)
  }, [options])

  useEffect(() => {
    if (!hasHydratedStorage) return;
    import('monaco-editor').then((monaco) => {
      const theme = options.theme as keyof typeof themes;
      const themeData = themes[theme]

      if (themeData) {
        monaco.editor.defineTheme(theme, themeData);
        monaco.editor.setTheme(theme);

        document.body.style.backgroundColor = themeData.colors['editor.background'] + "b0";
        document.body.style.setProperty('--border-color', themeData.colors['scrollbarSlider.background'] ?? "#282A36")
      }
    });
  }, [hasHydratedStorage, options.theme])

  useEffect(() => {
    if (!window.MonacoEnvironment) {
      window.MonacoEnvironment = {
        getWorker(_, label) {
          if (label === "typescript" || label === "javascript") {
            return new TsWorker()
          }
          return new EditorWorker()
        },
      }
    }
  }, [])

  useEffect(() => {
    // change - update editor options
    if (!inputEditor.current || !outputEditor.current) return;
    import('monaco-editor').then((monaco) => {
      const model = inputEditor.current?.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, language);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => {
    if (inputEditorContainer.current && !inputEditor.current && hasHydratedStorage) {
      import('monaco-editor').then((monaco) => {
        const theme = options.theme as keyof typeof themes;
        const themeData = themes[theme]
        if (themeData) monaco.editor.defineTheme(theme, themeData);
        inputEditor.current = monaco.editor.create(inputEditorContainer.current!, {
          value: activeTab,
          language,
          readOnly: true,
          detectIndentation: true,
          automaticLayout: true,
          ...options
        });
      });
    }

    if (outputEditorContainer.current && !outputEditor.current && hasHydratedStorage) {
      import('monaco-editor').then((monaco) => {
        outputEditor.current = monaco.editor.create(outputEditorContainer.current!, {
          value: '',
          language,
          readOnly: true,
          automaticLayout: true,
          ...options
        });
      });
    }

    return () => {
      inputEditor.current?.dispose();
      outputEditor.current?.dispose();
    }

    // hasHydrated prevents create a new editor with default states
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydratedStorage]);

  function executeCode(codeToExecute: string) {
    const worker = new CodeExecutionWorker();

    try {
      const transformedCode = babelTransform(codeToExecute);

      const loader = setTimeout(() => {
        setIsLoading(true);
        setOutput('Executing... ⏳');
      }, 1000);

      const timeout = setTimeout(() => {
        worker.terminate();
        setOutput('Execution timed out.');
        setIsLoading(false);
      }, 20000);

      worker.onmessage = (event) => {
        clearTimeout(timeout);
        clearTimeout(loader);
        setOutput(event.data.output);
        setIsLoading(false);
        worker.terminate();
      };

      worker.postMessage({ code: transformedCode });
    } catch (error) {
      if (error instanceof Error) {
        setOutput(`Error: ${error.message}`);
      } else {
        setOutput('An unknown error occurred');
      }
    }
  }

  const debouncedExecuteCode = useRef(
    debounce((codeToExecute: string) => {
      executeCode(codeToExecute);
    }, 600)
  ).current;

  useEffect(() => {
    // set log code from actual tab instance when initializing app or changing tabs
    debouncedExecuteCode(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, hasHydratedStorage]);

  useEffect(() => {
    // update output editor when executing code or changing tabs
    outputEditor?.current?.setValue(output);
  }, [output, outputEditor]);

  useEffect(() => {
    // sync input editor when creating tab or changing between tabs
    if (inputEditor.current && activeTab !== inputEditor.current?.getValue()) {
      if (activeTab === '') {
        // focus editor when creating a new tab or switching to an empty tab
        inputEditor.current.focus();
      }

      inputEditor.current.setValue(activeTab);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab !== inputEditor.current?.getValue()]);

  return {
    isLoading,
    inputEditorContainer,
    outputEditorContainer
  }
}
