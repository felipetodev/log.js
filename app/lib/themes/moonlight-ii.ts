import type { editor } from "monaco-editor";

export const moonlightII: editor.IStandaloneThemeData = {
  base: "vs-dark",
  inherit: true,
  rules: [
    { token: "", foreground: "ffffff" },
    { token: "variable", foreground: "baacff" },
    { token: "constant", foreground: "ff757f" },
    { token: "constant.numeric", foreground: "ff98a4" },
    { token: "keyword", foreground: "c099ff" },
    { token: "keyword.operator", foreground: "c099ff" },
    { token: "keyword.control", foreground: "c099ff" },
    { token: "string", foreground: "7af8ca" },
    { token: "comment", foreground: "7e8a9d" },
    { token: "function", foreground: "65bcff" },
    { token: "class", foreground: "65bcff" },
    { token: "type", foreground: "65bcff" },
    { token: "tag", foreground: "65bcff" },
    { token: "attribute", foreground: "ffd47e" }
  ],
  colors: {
    "editor.background": "#222436",
    "editor.foreground": "#baacff",
    "editor.lineHighlightBackground": "#2f334d",
    "editor.selectionBackground": "#2f334d",
    "editorCursor.foreground": "#baacff",
    "editorWhitespace.foreground": "#3b4167",
    "editorIndentGuide.background": "#3b4167",
    "editorLineNumber.foreground": "#3b4167",
    "editorLineNumber.activeForeground": "#baacff"
  }
}
