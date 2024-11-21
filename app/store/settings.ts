import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_MONACO_OPTIONS, SETTINGS_CONTENT } from '~/features/dialog-settings/lib/constants';
import { parseMonacoValues } from '~/features/dialog-settings/lib/utils';
import { type MonacoOptions, type OptionChangeParams } from '~/lib/types';

interface SettingsState {
  form: typeof SETTINGS_CONTENT;
  options: MonacoOptions;
  language: 'typescript' | 'javascript';
  setLanguage: (language: SettingsState['language']) => void;
  setForm: <T>(params: OptionChangeParams<T>) => void;
}

export const useSettingsStore = create<SettingsState>()(persist((set) => ({
  options: DEFAULT_MONACO_OPTIONS,
  form: SETTINGS_CONTENT,
  language: 'typescript',

  setLanguage: (language: SettingsState['language']) => set({ language }),

  setForm: ({ key, value, option, monacoId }) => set((state) => {
    const updatedForm = {
      ...state.form,
      [option]: {
        ...state.form[option],
        options: state.form[option].options.map((o) => {
          if (o.name === key) {
            return { ...o, value }
          }
          return o
        })
      },
    }

    return {
      form: updatedForm,
      options: {
        ...state.options,
        ...(monacoId ? {
          [monacoId]: monacoId in parseMonacoValues
            ? parseMonacoValues[monacoId as keyof typeof parseMonacoValues](value as boolean)
            : value,
        } : {}),
      },
    }
  })
}),
  {
    name: 'settings-storage',
  }
));
