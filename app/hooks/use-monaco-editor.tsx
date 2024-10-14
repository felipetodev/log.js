import { useEffect, useState, useRef } from "react"
import { editor } from "monaco-editor";
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import debounce from "just-debounce-it";
import { useTabsStore } from "~/store/tabs";
import { useTabs } from "~/hooks/use-tab";
import { dracula } from "~/lib/themes/dracula";
import * as Babel from "@babel/standalone";

export function useMonacoEditor() {
  const { language, activeTab, setCode } = useTabs()
  const [isLoading, setIsLoading] = useState(true)
  const [inputEditor, setInputEditor] = useState<editor.IStandaloneCodeEditor | null>(null)
  const [outputEditor, setOutputEditor] = useState<editor.IStandaloneCodeEditor | null>(null)
  const [output, setOutput] = useState<string>('')
  const inputEditorRef = useRef<HTMLDivElement>(null)
  const outputEditorRef = useRef<HTMLDivElement>(null)

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
    if (!inputEditor || !outputEditor) return;
    import('monaco-editor').then((monaco) => {
      const model = inputEditor.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, language);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  useEffect(() => {
    if (inputEditorRef.current && !inputEditor && hasHydratedStorage) {
      import('monaco-editor').then((monaco) => {
        monaco.editor.defineTheme('dracula', dracula);
        const newEditor = monaco.editor.create(inputEditorRef.current!, {
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

        setInputEditor(newEditor);
      });
    }

    if (outputEditorRef.current && !outputEditor) {
      import('monaco-editor').then((monaco) => {
        const outputEditor = monaco.editor.create(outputEditorRef.current!, {
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

        setOutputEditor(outputEditor);
      });
    }

    return () => {
      inputEditor?.dispose();
      outputEditor?.dispose();
    };

    // hasHydrated prevents create a new editor with default states
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydratedStorage]);

  const debouncedExecuteCode = useRef(
    debounce((codeToExecute: string) => {
      let outputBuffer: string[] = [];
      const originalLog = console.log;
      console.log = (...args) => {
        const formattedArgs = args.map(arg => {
          if (typeof arg === 'object' && arg !== null) {
            return JSON.stringify(arg, null, 2);
          }
          if (typeof arg === 'string') {
            return `"${arg}"`;
          }
          return String(arg);
        });
        outputBuffer.push(formattedArgs.join(' '));
      };

      try {
        const result = Babel.transform(codeToExecute, {
          presets: [
            'env',
            'typescript'
          ],
          plugins: [
            ["proposal-pipeline-operator", { proposal: "minimal" }],
          ],
          filename: "log.ts",
        });

        if (result?.code) {
          // Execute the transformed code
          const func = new Function(result.code);
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
      setOutput(outputBuffer.join('\n'));
      setIsLoading(false);
    }, 600)
  ).current;

  useEffect(() => {
    if (inputEditor) {
      const disposable = inputEditor.onDidChangeModelContent(() => {
        const newCode = inputEditor.getValue();
        setCode(newCode);
      });

      return () => disposable.dispose();
    }
  }, [inputEditor, setCode]);

  useEffect(() => {
    // set log code from actual tab instance when initializing app or changing tabs
    debouncedExecuteCode(activeTab.code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab.code, hasHydratedStorage]);

  useEffect(() => {
    // update output editor when executing code or changing tabs
    outputEditor?.setValue(output);
  }, [output, outputEditor]);

  useEffect(() => {
    // sync input editor when creating tab or changing between tabs
    if (inputEditor && activeTab.code !== inputEditor.getValue()) {
      setIsLoading(true);
      inputEditor.setValue(activeTab.code);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab.code !== inputEditor?.getValue()]);

  return {
    isLoading,
    inputEditor,
    inputEditorRef,
    outputEditorRef
  }
}
