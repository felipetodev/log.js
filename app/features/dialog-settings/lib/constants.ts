import {
  type LucideProps,
  Code,
  BotIcon,
  BracesIcon,
  CircleHelpIcon,
  SettingsIcon,
  UserPenIcon
} from "lucide-react";
import { getMonacoOptions } from "./utils";
import type { SettingsTab, SettingsTabData } from "~/lib/types";

export const SETTINGS_TABS: {
  value: SettingsTab;
  icon: React.ComponentType<LucideProps>;
  name: string;
  disabled: boolean
}[] = [
  { value: "general", icon: SettingsIcon, name: "General", disabled: false },
  { value: "appearance", icon: UserPenIcon, name: "Appearance", disabled: false },
  { value: "formatting", icon: BracesIcon, name: "Formatting", disabled: false },
  { value: "support", icon: CircleHelpIcon, name: "Support", disabled: false },
  { value: "resources", icon: Code, name: "Resources", disabled: false },
  { value: "ai", icon: BotIcon, name: "AI", disabled: true },
] as const

export const SETTINGS_CONTENT: Record<SettingsTab, SettingsTabData> = {
  ai: { value: "ai", options: [] },
  general: {
    value: "general",
    options: [
      { name: "Wrap long lines", type: "switch", value: false, monacoId: "wordWrap" },
      { name: "Auto close brackets", type: "switch", value: true, monacoId: "autoClosingBrackets" },
      { name: "Show information on hover", type: "switch", value: true, monacoId: "hover" },
      {
        name: "Show minimap",
        monacoId: "minimap",
        type: "switch",
        value: false
      },
    ]
  },
  appearance: {
    value: "appearance",
    options: [
      {
        name: "Theme",
        type: "select",
        value: "dracula",
        monacoId: "theme",
        values: [
          { value: "dracula", name: "Dracula" },
          // { value: "vs-dark", name: "VS Dark" },
          // { value: "vs-light", name: "VS Light" },
          { value: "nightOwlTheme", name: "Night Owl" },
          { value: "oneDarkPro", name: "One Dark Pro", disabled: false },
          { value: "moonlight", name: "Moonlight", disabled: false },
          { value: "moonlightII", name: "Moonlight II", disabled: false },
          { value: "synthwave-84", name: "SynthWave '84", disabled: true },
          { value: "ayu", name: "Ayu", disabled: true },
        ]
      },
      {
        name: "Font",
        type: "select",
        value: "Cascadia Code PL",
        monacoId: "fontFamily",
        values: [
          { value: "Cascadia Code PL", name: "Cascadia Code-PL" },
          { value: "monospace", name: "Monospace" },
          { value: "Monaco", name: "Monaco" },
          { value: "Courier New", name: "Courier New" },
          { value: "sans-serif", name: "Sans-serif" },
        ]
      },
      {
        name: "Font size",
        monacoId: "fontSize",
        type: "number",
        value: 16
      },
      {
        name: "Font ligatures",
        monacoId: "fontLigatures",
        type: "switch",
        value: false
      },
      {
        name: "Show line numbers",
        monacoId: "lineNumbers",
        type: "switch",
        value: true
      },
      {
        name: "Show invisible characters",
        monacoId: "renderWhitespace",
        type: "switch",
        value: false
      },
      {
        name: "Highlight active line",
        monacoId: "renderLineHighlight",
        type: "switch",
        value: true
      },
      {
        name: "Cursor blinking",
        monacoId: "cursorBlinking",
        type: "select",
        value: "blink",
        values: [
          { value: "blink", name: "Blink" },
          { value: "expand", name: "Expand" },
          { value: "solid", name: "Solid" }
        ]
      },
      {
        name: "Cursor width",
        monacoId: "cursorWidth",
        type: "number",
        value: 2
      }
      // {
      //   name: "Show activity bar",
      //   type: "switch",
      //   value: true
      // },
    ]
  },
  formatting: {
    value: "formatting",
    options: [
      { name: "Print Width", type: "number", value: 80, monacoId: "wordWrapColumn" },
      { name: "Tab Width", type: "number", value: 2, monacoId: "tabSize" },
      {
        name: "Bracket Pair Colorization",
        description: "Highlight matching brackets",
        type: "switch",
        value: false,
        monacoId: "guides"
      },
      {
        name: "Semi-colons",
        description: "Print semi-colons at the ends of statements",
        type: "switch",
        value: false,
        disabled: true
        // prettier: "semi"
      },
      {
        name: "Single Quotes",
        description: "Use single quotes instead of double quotes",
        type: "switch",
        value: false,
        disabled: true
        // prettier: "singleQuote"
      },
      {
        name: "Arrow Parens",
        description: "Include parentheses around a sole arrow function parameter",
        value: "always",
        type: "select",
        values: [
          { value: "always", name: "Always" },
          { value: "avoid", name: "Avoid" },
        ],
        disabled: true
        // prettier: "arrowParens"
      },
    ]
  },
  resources: {
    value: "resources",
    options: [
      {
        name: "Advent.js",
        description: "JavaScript coding challenges every day of December. Learn and have fun with adventJS coding challenges!",
        type: "link",
        href: "https://adventjs.dev/"
      },
      {
        name: "Advent of Code",
        description: "Advent of Code is an Advent calendar of small programming puzzles for a variety of skill sets and skill levels.",
        type: "link",
        href: "https://adventofcode.com/"
      },
      {
        name: "TypeHero",
        description: "Level up and learn TypeScript with interactive exercises.",
        type: "link",
        href: "https://typehero.dev/"
      }
    ]
  },
  support: {
    value: "support",
    options: [
      { name: "Feedback", type: "link", href: "https://github.com/felipetodev/log.js/issues/new" },
      { name: "Report a bug", type: "link", href: "https://github.com/felipetodev/log.js/issues/new" },
    ]
  },
}

export const DEFAULT_MONACO_OPTIONS = getMonacoOptions(SETTINGS_CONTENT)
