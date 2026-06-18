import { Fragment } from "react";
import { XIcon } from "lucide-react";
import { useMonacoEditor } from "~/hooks/use-monaco-editor";
import { useTabEditing, useTabs } from "~/hooks/use-tab";
import type { Tab } from "~/lib/types";

interface TabProps {
  tab: Tab;
}

export function Tab({ tab }: TabProps) {
  const { isLoading } = useMonacoEditor();
  const { tabs, activeTab, deleteTab, setActiveTab } = useTabs()
  const { handleEdit, handleRename, inputRef, isEditing, setTabName, tabName } = useTabEditing(tab);

  return (
    <Fragment>
      {tab.id === activeTab.id ? (
        <div className="flex items-center justify-between text-white bg-[var(--border-color)] pl-4 pr-1 w-40 rounded-t-lg ml-[3px] mt-auto h-[calc(100%-2px)] border-x border-t border-neutral-700">
          {
            isEditing ? (
              <div className="relative w-full bg-white/10 after:bg-blue-400 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-center after:transform after:scale-x-0 after:transition-transform after:duration-150 focus-within:after:scale-x-100">
                <input
                  ref={inputRef}
                  value={tabName}
                  onChange={(e) => setTabName(e.target.value)}
                  onBlur={handleRename}
                  onKeyDown={(e) => e.key === "Enter" && handleRename()}
                  className="text-sm bg-transparent outline-none text-center w-full"
                />
              </div>
            ) : (
              <button
                onClick={handleEdit}
                className="text-sm truncate w-full"
              >
                {tab.name}
              </button>
            )
          }
          {tabs.length > 1 && (
            <button
              className="ml-0.5 hover:bg-neutral-500/10 p-[3px] rounded-md border border-transparent hover:border-neutral-700"
              aria-label="Delete tab"
              onClick={() => deleteTab(tab.id)}
            >
              <XIcon className="size-3.5" />
            </button>
          )}
        </div>
      ) : (
        <button
          disabled={isLoading}
          onClick={() => setActiveTab(tab)}
          aria-label="Switch tab"
          className="flex items-center justify-between text-white bg-[var(--border-color)] opacity-50 h-[calc(100%-3px)] px-4 w-40 rounded-t-lg mt-auto ml-[3px] hover:opacity-100 border-x border-t border-transparent hover:border-neutral-700 transition-all disabled:cursor-not-allowed"
        >
          <span className="text-sm truncate">
            {tab.name}
          </span>
        </button>
      )}
    </Fragment>
  )
}