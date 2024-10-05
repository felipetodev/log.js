import { useEffect, useRef, useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { editor } from "monaco-editor";
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import debounce from "just-debounce-it";

export const meta: MetaFunction = () => {
  return [
    { title: "lab.js 🧪" },
    { name: "description", content: "A beautiful playground for JavaScript and TypeScript" },
  ];
};

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

const defState = 'function sum(a, b) {\n  return a + b \n}\n\nconsole.log(sum(2, 2))\n'

export default function Playground() {
  const [code, setCode] = useState<string>(() => {
    if (typeof window === 'undefined') return defState
    const savedCode = localStorage.getItem('code')
    return savedCode ? JSON.parse(savedCode) : defState
  })
  const [editor, setEditor] = useState<editor.IStandaloneCodeEditor | null>(null)
  const [output, setOutput] = useState<string[]>([])
  const editorRef = useRef<HTMLDivElement>(null)

  const debouncedExecuteCode = useRef(
    debounce((codeToExecute: string) => {
      let outputBuffer: string[] = [];
      const originalLog = console.log;
      console.log = (...args) => {
        const formattedArgs = args.map(arg => {
          if (typeof arg === 'object' && arg !== null) {
            return JSON.stringify(arg, null, 2);
          }
          return String(arg);
        });
        outputBuffer.push(formattedArgs.join(' '));
      };

      try {
        const func = new Function(codeToExecute);
        func();
      } catch (error) {
        if (error instanceof Error) {
          outputBuffer = [`Error: ${error.message}`];
        } else {
          outputBuffer = ['An unknown error occurred'];
        }
      }

      console.log = originalLog;
      setOutput(outputBuffer);
    }, 1000)
  ).current;

  useEffect(() => {
    window.MonacoEnvironment = {
      getWorker(_, label) {
        if (label === "typescript" || label === "javascript") {
          return new TsWorker()
        }
        return new EditorWorker()
      },
    }
  }, [])

  useEffect(() => {
    if (editorRef.current && !editor) {
      import('monaco-editor').then((monaco) => {
        monaco.editor.defineTheme('dracula', draculaTheme);
        const newEditor = monaco.editor.create(editorRef.current!, {
          value: code,
          language: 'javascript',
          theme: 'dracula',
          tabSize: 2,
          fontSize: 16,
          detectIndentation: true,
          automaticLayout: true,
          minimap: {
            enabled: false
          }
        });

        setEditor(newEditor);
      });
    }

    return () => {
      if (editor) {
        editor.dispose();
      }
    };
  }, []);

  editor?.onDidChangeModelContent(() => {
    // should be in a useEffect (?)
    const newCode = editor.getValue() || '';
    localStorage.setItem('code', JSON.stringify(newCode));
    setCode(newCode);
  })

  useEffect(() => {
    debouncedExecuteCode(code);
  }, [code]);

  return (
    <div className="relative h-screen w-screen">
      <div className="grid grid-cols-2 flex-col h-[calc(100%-24px)] bg-[#282A36]">
        <div ref={editorRef} className="size-full" />
        <div className="w-full overflow-auto h-full">
          <SyntaxHighlighter
            PreTag="div"
            codeTagProps={{
              style: {
                fontSize: 16,
                fontFamily: 'var(--font-mono)'
              }
            }}
            customStyle={{
              margin: 0,
              width: '100%',
              height: '100%',
              background: 'transparent',
              padding: '0 0 10rem 0'
            }}
            language='javascript'
            showLineNumbers
            style={dracula}
          >
            {output.join('\n')}
          </SyntaxHighlighter>
        </div>
      </div>
      <div className="flex items-center justify-center w-full h-6 text-xs text-white bg-neutral-700 border-t border-neutral-800">
        <h4>
          crafted by{" "}
          <a
            href="https://github.com/felipetodev"
            rel="noopener noreferrer"
            target="_blank"
            className="text-blue-400"
          >
            felipetodev
          </a>
        </h4>
      </div>
    </div>
  );
}