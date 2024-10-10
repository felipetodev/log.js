import { useTabsStore } from "~/store/tabs"

export function useTabs() {
  const tabs = useTabsStore(state => state.tabs);
  const language = useTabsStore(state => state.language)
  const activeTab = useTabsStore(state => state.activeTab)
  const setCode = useTabsStore(state => state.setCode)
  const setActiveTab = useTabsStore(state => state.setActiveTab);
  const createNewTab = useTabsStore(state => state.createNewTab);
  const deleteTab = useTabsStore(state => state.deleteTab);

  return {
    tabs,
    activeTab,
    language,
    setCode,
    setActiveTab,
    createNewTab,
    deleteTab,
  }
}
