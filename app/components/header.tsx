import { PlusIcon, } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/ui/tooltip"
import { useMonacoEditor } from "~/hooks/use-monaco-editor";
import { useTabs } from "~/hooks/use-tab";
import { useTabsStore } from "~/store/tabs";
import { Tab } from "./tab";

export function Header() {
  const { isLoading } = useMonacoEditor();
  const { tabs, createNewTab, } = useTabs()

  const hasHydratedStorage = useTabsStore(state => state._hasHydrated);

  return (
    <div
      style={
        { "--primary": "var(--color-background)" } as React.CSSProperties
      }
      className="flex h-8 w-full border-b border-neutral-700 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
    >
      {hasHydratedStorage ?
        tabs?.map(tab => (
          <Tab key={tab.id} tab={tab} />
        )) : (
          <div className="flex items-center justify-between text-white opacity-50 bg-[#282A36] h-full pl-4 pr-1 w-40 rounded-t-lg mt-0.5 ml-0.5 border-x border-t border-neutral-700">
            <span className="text-sm">
              Loading...
            </span>
          </div>
        )}
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              disabled={isLoading}
              onClick={() => createNewTab()}
              aria-label="Create new tab"
              className="px-1 text-white hover:bg-[var(--border-color)] rounded-lg mt-1 mb-0.5 ml-0.5 border border-transparent hover:border-neutral-700 transition-colors"
            >
              <PlusIcon className="size-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent align="center" className="bg-[var(--border-color)] border border-neutral-500 px-1.5">
            <div className="flex items-center space-x-2">
              <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded border px-1 text-[10px] font-medium flex bg-[#2C2C2C]">
                <span className="text-[14px]">⌘</span>K
              </kbd>
              <span className="text-[10px]">New Tab</span>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}