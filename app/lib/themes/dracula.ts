import type { editor } from "monaco-editor";

export const dracula: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
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
} 