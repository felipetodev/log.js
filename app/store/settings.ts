import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SETTINGS_CONTENT } from '~/features/dialog-settings/lib/constants';
import { type SettingsTab } from '~/lib/types';

interface SettingsState {
  _hasHydrated: boolean;
  form: typeof SETTINGS_CONTENT;
  language: 'typescript' | 'javascript';
  setLanguage: (language: SettingsState['language']) => void;
  setForm: <T, >({ key, value, option }: { key: string, value: T, option: SettingsTab }) => void;
}

export const useSettingsStore = create<SettingsState>()(persist((set) => ({
  _hasHydrated: false,
  form: SETTINGS_CONTENT,
  language: 'typescript',

  setLanguage: (language: SettingsState['language']) => set({ language }),

  setForm: ({ key, value, option }) => set((state) => {
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

    return { form: updatedForm }
  })
}),
  {
    name: 'tabs-storage',
    onRehydrateStorage: () => (state) => {
      if (state) {
        state._hasHydrated = true
      }
    },
  }
));
