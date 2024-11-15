export interface Tab {
  id: string;
  name: string;
  code: string;
  createdAt: Date;
}

export type SettingsTab = 'general' | 'appearance' | 'formatting' | 'help' | 'ai';

type SelectOption<T> = {
  value: T;
  name: string;
  disabled?: boolean;
};

export type SettingsOption<T> =
  | { name: string; description?: string; type: 'switch'; value: boolean }
  | { name: string; type: 'number'; value: T }
  | { name: string; type: 'button' }
  | { name: string; description?: string; type: 'select'; value: T; values: SelectOption<string>[] };

export type SettingsTabData = {
  value: string;
  options: SettingsOption<number | string>[];
};
