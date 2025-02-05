import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Tab } from '~/lib/types';

interface TabsState {
  _hasHydrated: boolean;
  tabs: Tab[];
  activeTab: Tab;
  createNewTab: (code?: Tab['code']) => void;
  setActiveTab: (tab: Tab) => void;
  setCode: (code: Tab['code']) => void;
  deleteTab: (id: Tab['id']) => void;
}

const DEFAULT_TAB: Tab = {
  id: crypto.randomUUID(),
  name: 'Welcome 🎉',
  code: `\
/**
 * Welcome to Log.js 🧪
 * Now you can share your code and fork others' code!
 * Click on the "Share" button below to get started! 🚀
 */

function sum(a: number, b: number) {\n  return a + b\n}\n\nconsole.log(sum(2, 2))\n`,
  createdAt: new Date(),
}

export const useTabsStore = create<TabsState>()(persist((set) => ({
  _hasHydrated: false,
  tabs: [DEFAULT_TAB],
  activeTab: DEFAULT_TAB,

  setActiveTab: (tab: Tab) => set({ activeTab: tab }),

  setCode: (code: Tab['code']) => set((state) => {
    const { tabs, activeTab } = state;
    const updatedTabs = tabs.map(tab => {
      if (tab.id === activeTab.id) {
        return {
          ...tab,
          name: code.trim() ? `${code.trim().slice(0, 20)}...` : tab.name,
          code,
        };
      }
      return tab;
    });

    return {
      tabs: updatedTabs,
      activeTab: {
        ...activeTab,
        code,
      },
    }
  }),

  createNewTab: (shareCode?: string) => set((state) => {
    const { tabs } = state;

    const newTab: Tab = shareCode
      ? {
        id: crypto.randomUUID(),
        name: `${shareCode.trim().slice(0, 20)}...`,
        code: shareCode,
        createdAt: new Date(),
      } : {
        id: crypto.randomUUID(),
        name: `Tab ${tabs.length + 1}`,
        code: '',
        createdAt: new Date(),
      };

    return {
      activeTab: newTab,
      tabs: [...tabs, newTab],
    }
  }),

  deleteTab: (id: Tab['id']) => set((state) => {
    const { tabs } = state;

    const updatedTabs = tabs.filter(t => t.id !== id);
    const activeTab = updatedTabs[updatedTabs.length - 1]

    return {
      tabs: updatedTabs,
      activeTab,
    }
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
