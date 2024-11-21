import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "~/ui/tabs";
import { useQueryState } from "nuqs";
import { SettingOptions } from "./setting-options";
import { useSettingsStore } from "~/store/settings";
import { SETTINGS_TABS } from "../lib/constants";

export function DialogActions() {
  const [tab, setTab] = useQueryState('option', { defaultValue: 'general' });
  const options = useSettingsStore((state) => state.form)
  const setOptions = useSettingsStore((state) => state.setForm)

  return (
    <Tabs
      defaultValue={tab}
      orientation="vertical"
      className="flex flex-col gap-6 md:flex-row"
      onValueChange={setTab}
    >
      <TabsList>
        {SETTINGS_TABS.map((tab) => {
          const { icon: Icon } = tab
          return (
            <TabsTrigger key={tab.value} value={tab.value} disabled={tab.disabled}>
              <Icon className="size-3.5" />
              {tab.name}
            </TabsTrigger>
          )
        })}

        <a target="_blank" rel="noreferrer" className="mt-auto mb-8 justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed ring-offset-background border-input hover:bg-accent hover:text-accent-foreground h-10 hidden items-center gap-2 rounded-xl border px-4 py-2 md:inline-flex" href="https://github.com/felipetodev/log.js">
          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-4 w-4">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
          </svg>
          GitHub
        </a>
      </TabsList>

      {
        SETTINGS_TABS.map(({ value: tabValue }) => (
          <TabsContent key={tabValue} value={tabValue}>
            <div className="flex flex-col gap-3 px-4 pb-6 text-sm text-token-text-primary sm:px-6 md:ps-0 md:pt-5">
              {options[tabValue].options.map((option) => (
                <div key={option.name} className="flex justify-between items-center border-b pb-3 last-of-type:border-b-0">
                  {option.type !== 'button' && option.type !== 'link' && <span>{option.name}</span>}
                  <SettingOptions
                    option={option}
                    onUpdate={(value) => {
                      setOptions({
                        key: option.name,
                        option: tabValue,
                        value,
                        monacoId: 'monacoId' in option ? option.monacoId : undefined
                      })
                    }}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        ))
      }
    </Tabs>
  )
}