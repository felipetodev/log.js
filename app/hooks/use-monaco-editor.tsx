import { useEffect, useState, useRef } from "react"
import { editor } from "monaco-editor";
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import debounce from "just-debounce-it";
import { useTabsStore } from "~/store/tabs";
import { useTabs } from "~/hooks/use-tab";
import { dracula } from "~/lib/themes/dracula";
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

function executeCode(codeToExecute: string) {
  let outputBuffer: string[] = [];
  const originalLog = console.log;
  console.log = (...args) => {
    const formattedArgs = args.map(arg => {
      if (typeof arg === 'object' && arg !== null) {
        return JSON.stringify(arg, null, 2);
      }
      if (typeof arg === 'string') {
        return `'${arg}'`;
      }
      return String(arg);
    });
    outputBuffer.push(formattedArgs.join(' '));
  };

  try {
    const code = babelTransform(codeToExecute);

    if (code) {
      // Execute the transformed code
      const func = new Function(code);
      func();
    } else {
      throw new Error("Babel transformation failed");
    }
  } catch (error) {
    if (error instanceof Error) {
      outputBuffer = [`Error: ${error.message}`];
    } else {
      outputBuffer = ['An unknown error occurred'];
    }
  }

  console.log = originalLog;
  return outputBuffer.join('\n')
}

export function useMonacoEditor() {
  const { language, activeTab, setCode } = useTabs()
  const [isLoading, setIsLoading] = useState(true)
  const [output, setOutput] = useState<string>('')
  const inputEditor = useRef<editor.IStandaloneCodeEditor | null>(null);
  const outputEditor = useRef<editor.IStandaloneCodeEditor | null>(null);
  const inputEditorContainer = useRef<HTMLDivElement>(null)
  const outputEditorContainer = useRef<HTMLDivElement>(null)

  const hasHydratedStorage = useTabsStore(state => state._hasHydrated);

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
        monaco.editor.defineTheme('dracula', dracula);
        inputEditor.current = monaco.editor.create(inputEditorContainer.current!, {
          value: activeTab.code,
          language,
          theme: 'dracula',
          tabSize: 2,
          fontSize: 16,
          detectIndentation: true,
          automaticLayout: true,
          minimap: {
            enabled: false
          }
        });
      });
    }

    if (outputEditorContainer.current && !outputEditor.current && hasHydratedStorage) {
      import('monaco-editor').then((monaco) => {
        outputEditor.current = monaco.editor.create(outputEditorContainer.current!, {
          value: '',
          language,
          theme: 'dracula',
          tabSize: 2,
          fontSize: 16,
          readOnly: true,
          automaticLayout: true,
          minimap: {
            enabled: false
          }
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

  const debouncedExecuteCode = useRef(
    debounce((codeToExecute: string) => {
      const output = executeCode(codeToExecute);
      setOutput(output);
      setIsLoading(false);
    }, 600)
  ).current;

  useEffect(() => {
    if (inputEditor.current) {
      const disposable = inputEditor.current.onDidChangeModelContent(() => {
        const newCode = inputEditor.current?.getValue() || '';
        setCode(newCode);
      });

      return () => disposable.dispose();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputEditor.current, setCode]);

  useEffect(() => {
    // set log code from actual tab instance when initializing app or changing tabs
    debouncedExecuteCode(activeTab.code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab.code, hasHydratedStorage]);

  useEffect(() => {
    // update output editor when executing code or changing tabs
    outputEditor?.current?.setValue(output);
  }, [output, outputEditor]);

  useEffect(() => {
    // sync input editor when creating tab or changing between tabs
    if (inputEditor.current && activeTab.code !== inputEditor.current?.getValue()) {
      setIsLoading(true);
      inputEditor.current.setValue(activeTab.code);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab.code !== inputEditor.current?.getValue()]);

  return {
    isLoading,
    inputEditorContainer,
    outputEditorContainer
  }
}
