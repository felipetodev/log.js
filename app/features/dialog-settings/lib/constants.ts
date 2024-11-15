import {
  type LucideProps,
  BotIcon,
  BracesIcon,
  CircleHelpIcon,
  SettingsIcon,
  UserPenIcon
} from "lucide-react";
import type { SettingsTab, SettingsTabData } from "~/lib/types";

export const SETTINGS_TABS: { value: SettingsTab; icon: React.ComponentType<LucideProps>; name: string; disabled: boolean }[] = [
  { value: "general", icon: SettingsIcon, name: "General", disabled: false },
  { value: "appearance", icon: UserPenIcon, name: "Appearance", disabled: false },
  { value: "formatting", icon: BracesIcon, name: "Formatting", disabled: false },
  { value: "help", icon: CircleHelpIcon, name: "Help", disabled: false },
  { value: "ai", icon: BotIcon, name: "AI", disabled: true },
] as const

export const SETTINGS_CONTENT: Record<SettingsTab, SettingsTabData> = {
  ai: { value: "ai", options: [] },
  general: {
    value: "general",
    options: [
      { name: "Wrap long lines", type: "switch", value: false },
      { name: "Auto close brackets", type: "switch", value: true },
      { name: "Show inline errors and warnings", type: "switch", value: true },
      { name: "Show information on hover", type: "switch", value: true },
    ]
  },
  appearance: {
    value: "appearance",
    options: [
      {
        name: "Theme",
        type: "select",
        value: "dracula",
        values: [
          { value: "dracula", name: "Dracula" },
          { value: "one-dark-pro", name: "One Dark Pro", disabled: true },
          { value: "synthwave-84", name: "SynthWave '84", disabled: true },
          { value: "ayu", name: "Ayu", disabled: true },
        ]
      },
      {
        name: "Font",
        type: "select",
        value: "fira-code",
        values: [
          { value: "fira-code", name: "Fira Code" },
          { value: "monospace", name: "Monospace" },
        ]
      },
      {
        name: "Font size",
        type: "number",
        value: 16
      },
      {
        name: "Show line numbers",
        type: "switch",
        value: true
      },
      {
        name: "Show invisible characters",
        type: "switch",
        value: false
      },
      {
        name: "Highlight active line",
        type: "switch",
        value: true
      },
      {
        name: "Show minimap",
        type: "switch",
        value: false
      },
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
      { name: "Print Width", type: "number", value: 80 },
      { name: "Tab Width", type: "number", value: 2 },
      { name: "Semi-colons", description: "Print semi-colons at the ends of statements", type: "switch", value: true },
      { name: "Single Quotes", description: "Use single quotes instead of double quotes", type: "switch", value: false },
      { name: "Bracket Spacing", description: "Print spaces between brackets in object literals", type: "switch", value: true },
      {
        name: "Arrow Parens",
        description: "Include parentheses around a sole arrow function parameter",
        value: "always",
        type: "select",
        values: [
          { value: "always", name: "Always" },
          { value: "avoid", name: "Avoid" },
        ]
      },
    ]
  },
  help: {
    value: "help",
    options: [
      { name: "Feedback", type: "button" },
      { name: "Report a bug", type: "button" },
      { name: "Keyboard shortcuts", type: "button" },
    ]
  }
}