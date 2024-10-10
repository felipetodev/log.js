import { Fragment } from "react/jsx-runtime";
import { useMonacoEditor } from "~/hooks/use-monaco-editor";
import { useTabs } from "~/hooks/use-tab";
import { useTabsStore } from "~/store/tabs";

export function Header() {
  const { isLoading, inputEditor } = useMonacoEditor();
  const { tabs, activeTab, createNewTab, deleteTab, setActiveTab } = useTabs()

  const hasHydratedStorage = useTabsStore(state => state._hasHydrated);

  return (
    <div className="flex h-8 w-full bg-[#282A36]/70 border-b border-neutral-700">
      {hasHydratedStorage ?
        tabs?.map(tab => (
          <Fragment key={tab.id}>
            {tab.id === activeTab.id ? (
              <div className="flex items-center justify-between text-white bg-[#282A36] h-full pl-4 pr-1 w-40 rounded-t-lg mt-0.5 ml-0.5 border-x border-t border-neutral-700">
                <span className="text-sm font-semibold truncate">
                  {tab.name}
                </span>
                {tabs.length > 1 && (
                  <button className="hover:opacity-80 p-1" onClick={() => deleteTab(tab.id)}>
                    <svg className="size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ) : (
              <button
                disabled={isLoading}
                onClick={() => {
                  setActiveTab(tab);
                  inputEditor?.setValue(tab.code);
                }}
                className="flex items-center justify-between text-white bg-[#282A36] opacity-50 h-[calc(100%-2px)] px-4 w-40 rounded-t-lg mt-auto ml-0.5 hover:opacity-100 border-x border-t border-transparent hover:border-neutral-700 transition-all disabled:cursor-not-allowed"
              >
                <span className="text-sm truncate">
                  {tab.name}
                </span>
              </button>
            )}
          </Fragment>
        )) : (
          <div className="flex items-center justify-between text-white opacity-50 bg-[#282A36] h-full pl-4 pr-1 w-40 rounded-t-lg mt-0.5 ml-0.5 border-x border-t border-neutral-700">
            <span className="text-sm">
              Loading...
            </span>
          </div>
        )}
      <button
        disabled={isLoading}
        onClick={createNewTab}
        className="px-1.5 text-white hover:bg-[#282A36] rounded-lg my-1 ml-0.5 transition-colors"
      >
        <svg className="size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
      </button>
    </div>
  )
}