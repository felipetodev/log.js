import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Tab } from '~/lib/types';

interface TabsState {
  _hasHydrated: boolean;
  tabs: Tab[];
  activeTab: Tab;
  createNewTab: () => void;
  setActiveTab: (tab: Tab) => void;
  setCode: (code: Tab['code']) => void;
  deleteTab: (id: Tab['id']) => void;
  updateTab: (id: Tab['id'], tab: Partial<Omit<Tab, 'id'>>) => void;
}

const DEFAULT_TAB: Tab = {
  id: crypto.randomUUID(),
  name: 'Welcome 🎉',
  code: 'function sum(a: number, b: number) {\n  return a + b \n}\n\nconsole.log(sum(2, 2))\n',
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
          name: !tab.hasRealName && code.trim() ? `${code.trim().slice(0, 20)}...` : tab.name,
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

  createNewTab: () => set((state) => {
    const { tabs } = state;
    const newTab: Tab = {
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
  }),

  updateTab: (id: Tab['id'], tab: Partial<Omit<Tab, 'id'>>) => set((state) => {
    const { tabs } = state;

    const index = tabs.findIndex(t => t.id === id);
    const oldTab = tabs[index];
    const updatedTab = { ...oldTab, ...tab, hasRealName: Boolean(oldTab.hasRealName || (oldTab.name !== tab.name)) };
    const updatedTabs = [
      ...tabs.slice(0, index),
      updatedTab,
      ...tabs.slice(index + 1),
    ]

    return {
      tabs: updatedTabs,
      activeTab: updatedTab,
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
