import { useEffect, useState, useRef } from "react"
import { editor } from "monaco-editor";
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import debounce from "just-debounce-it";
import { useTabsStore } from "~/store/tabs";
import { useTabs } from "./use-tab";
import ts from "typescript";

// Dracula theme definition
const draculaTheme: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    // { token: '', foreground: '50FA7B' },
    { token: 'comment', foreground: '6272A4' },
    { token: 'string', foreground: 'F1FA8C' },
    { token: 'keyword', foreground: 'FF79C6' },
    { token: 'number', foreground: 'BD93F9' },
    { token: 'operator', foreground: 'FF79C6' },
    { token: 'function', foreground: '50FA7B' },
    { token: 'variable', foreground: 'F8F8F2' },
    { token: 'variable.parameter', foreground: 'FFB86C' },
    { token: 'type', foreground: '8BE9FD' },
    { token: 'class', foreground: '8BE9FD' },
  ],
  colors: {
    'editor.background': '#282A36',
    'editor.foreground': '#F8F8F2',
    'editor.lineHighlightBackground': '#44475A',
    'editorCursor.foreground': '#F8F8F2',
    'editorWhitespace.foreground': '#6272A4',
  }
};

export function useMonacoEditor() {
  const { language, activeTab, setCode } = useTabs()
  const [isLoading, setIsLoading] = useState(false)
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
  }, [inputEditor, outputEditor, language]);

  useEffect(() => {
    if (inputEditorRef.current && !inputEditor && hasHydratedStorage) {
      import('monaco-editor').then((monaco) => {
        monaco.editor.defineTheme('dracula', draculaTheme);
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
      setCode(codeToExecute); // update log code in active tab
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
        // transpile TypeScript to JavaScript
        const result = ts.transpileModule(codeToExecute, {
          compilerOptions: {
            moduleResolution: ts.ModuleResolutionKind.NodeNext,
            module: ts.ModuleKind.ESNext,
            target: ts.ScriptTarget.ESNext,
          }
        });

        // execute the transpiled JavaScript
        const func = new Function(result.outputText);
        func();
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
        debouncedExecuteCode(newCode);
      });

      return () => disposable.dispose();
    }
  }, [inputEditor, debouncedExecuteCode]);

  useEffect(() => {
    // set log code from actual tab instance when initializing app
    debouncedExecuteCode(activeTab.code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydratedStorage]);

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
