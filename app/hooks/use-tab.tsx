import { useEffect, useRef, useState } from "react";
import { useTabsStore } from "~/store/tabs"
import type { Tab } from "~/lib/types";

export function useTabs() {
  const tabs = useTabsStore(state => state.tabs);
  const activeTab = useTabsStore(state => state.activeTab)
  const setCode = useTabsStore(state => state.setCode)
  const setActiveTab = useTabsStore(state => state.setActiveTab);
  const createNewTab = useTabsStore(state => state.createNewTab);
  const deleteTab = useTabsStore(state => state.deleteTab);
  const updateTab = useTabsStore(state => state.updateTab);

  return {
    tabs,
    activeTab,
    setCode,
    setActiveTab,
    createNewTab,
    deleteTab,
    updateTab
  }
}

export function useTabEditing(tab: Tab) {
  const {updateTab} = useTabs();
  const [isEditing, setIsEditing] = useState(false);
  const [tabName, setTabName] = useState(tab.name);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleRename = () => {
    setIsEditing(false);
    updateTab(tab.id, {
      name: tabName.trim() || "Untitled Tab",
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTabName(tab.name);
  };

  useEffect(() => {
    setTabName(tab.name);
  }, [tab.name]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(0, tab.name.length);
    }
  }, [isEditing, tab.name]);

  return {
    isEditing,
    tabName,
    setTabName,
    inputRef,
    handleRename,
    handleEdit,
  };
}