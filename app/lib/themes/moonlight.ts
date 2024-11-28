import type { editor } from "monaco-editor";

export const moonlight: editor.IStandaloneThemeData = {
  base: "vs-dark",
  inherit: true,
  rules: [
    { token: "", foreground: "c8d3f5" },
    { token: "variable", foreground: "c8d3f5" },
    { token: "constant", foreground: "ff757f" },
    { token: "constant.numeric", foreground: "ff98a4" },
    { token: "keyword", foreground: "86e1fc" },
    { token: "keyword.operator", foreground: "86e1fc" },
    { token: "keyword.control", foreground: "86e1fc" },
    { token: "string", foreground: "c3e88d" },
    { token: "comment", foreground: "7a88cf" },
    { token: "function", foreground: "82aaff" },
    { token: "class", foreground: "82aaff" },
    { token: "type", foreground: "82aaff" },
    { token: "tag", foreground: "82aaff" },
    { token: "attribute", foreground: "ffc777" },
  ],
  colors: {
    "editor.background": "#1e2030",
    "editor.foreground": "#c8d3f5",
    "editor.lineHighlightBackground": "#2f334d",
    "editor.selectionBackground": "#2f334d",
    "editorCursor.foreground": "#c8d3f5",
    "editorWhitespace.foreground": "#3b4167",
    "editorIndentGuide.background": "#3b4167",
    "editorLineNumber.foreground": "#3b4167",
    "editorLineNumber.activeForeground": "#c8d3f5"
  }
}
