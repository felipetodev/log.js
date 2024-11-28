import type { editor } from "monaco-editor";

export const oneDarkPro: editor.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '5C6370', fontStyle: 'italic' },
    { token: 'string', foreground: '98C379' },
    { token: 'keyword', foreground: 'C678DD' },
    { token: 'number', foreground: 'D19A66' },
    { token: 'operator', foreground: '56B6C2' },
    { token: 'function', foreground: '61AFEF' },
    { token: 'variable', foreground: 'E06C75' },
    { token: 'variable.parameter', foreground: 'ABB2BF' },
    { token: 'type', foreground: '56B6C2' },
    { token: 'class', foreground: 'E5C07B' },
    // Additional syntax tokens
    { token: 'constant', foreground: 'D19A66' },
    { token: 'tag', foreground: 'E06C75' },
    { token: 'string.escape', foreground: '56B6C2' },
    { token: 'entity.name.function', foreground: '61AFEF' },
  ],
  colors: {
    'editor.background': '#282C34',
    'editor.foreground': '#ABB2BF',
    'editor.lineHighlightBackground': '#2C313C',
    'editorCursor.foreground': '#528BFF',
    'editorWhitespace.foreground': '#3B4048',
    'editor.selectionBackground': '#3E4451',
    'editor.findMatchBackground': '#42557B',
    'editor.findMatchHighlightBackground': '#314365',
    'editorLineNumber.foreground': '#495162',
    'editorLineNumber.activeForeground': '#6B7380',
    'editorIndentGuide.background': '#3B4048',
    'editorIndentGuide.activeBackground': '#C8C8C8',
  }
}
