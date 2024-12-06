import type { editor } from "monaco-editor";

export interface Tab {
  id: string;
  name: string;
  code: string;
  createdAt: Date;
  hasRealName?: boolean;
}

export type SettingsTab = 'general' | 'appearance' | 'formatting' | 'support' | 'resources' | 'ai';

type SelectOption<T> = {
  value: T;
  name: string;
  disabled?: boolean;
};

export type MonacoOptions = editor.IEditorOptions & editor.IGlobalEditorOptions

export type OptionChangeParams<T> = {
  key: string
  value: T
  option: SettingsTab
  monacoId?: keyof MonacoOptions
}

export type SettingsOption<T> =
  | {
    name: string;
    description?: string;
    type: 'switch';
    value: boolean;
    monacoId?: keyof MonacoOptions;
    disabled?: boolean;
  }
  | { name: string; type: 'number'; value: T; monacoId?: keyof MonacoOptions }
  | { name: string; type: 'button', disabled?: boolean }
  | { name: string; type: 'link'; description?: string; href: string }
  | {
    name: string;
    description?: string;
    type: 'select';
    value: T;
    values: SelectOption<string>[];
    monacoId?: keyof MonacoOptions;
    disabled?: boolean;
  };

export type SettingsTabData = {
  value: string;
  options: SettingsOption<number | string>[];
};
