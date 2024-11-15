import { useCallback, useState } from "react"
import { Switch } from "~/ui/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "~/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/ui/select"
import { InputNumber } from "~/ui/input-number"
import { SettingsOption, SettingsTab } from "~/lib/types";
import { SETTINGS_CONTENT, SETTINGS_TABS } from "../lib/constants"

export function DialogActions() {
  const [options, setOptions] = useState(SETTINGS_CONTENT);

  const onOptionChange = ({ key, value, option }: { key: string; value: string | boolean | number, option: SettingsTab }) => {
    setOptions((prev) => ({
      ...prev,
      [option]: {
        ...prev[option],
        options: prev[option].options.map((o) => {
          if (o.name === key) {
            return { ...o, value }
          }
          return o
        })
      }
    }))
  }

  const renderOption = useCallback((option: SettingsOption<number | string>, optionType: SettingsTab) => {
    switch (option.type) {
      case "switch":
        return (
          <Switch
            checked={option.value}
            onCheckedChange={(check) => {
              onOptionChange({ key: option.name, value: check, option: optionType })
            }}
          />
        )
      case "number":
        return (
          <InputNumber
            aria-label={option.name}
            defaultValue={Number(option.value)}
            onChange={(num) => {
              onOptionChange({ key: option.name, value: num, option: optionType })
            }}
          />
        )
      case "select":
        return (
          <Select
            defaultValue={String(option.value)}
            onValueChange={(value) => onOptionChange({ key: option.name, value, option: optionType })}
          >
            <SelectTrigger id="select-place" className="max-w-[208px]">
              <SelectValue placeholder={`Select ${option.name}`} id="select-place" />
            </SelectTrigger>
            <SelectContent>
              {option.values.map((option) => (
                <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                  {option.name}
                </SelectItem>
              ))
              }
            </SelectContent>
          </Select>
        )
      case "button":
        return (
          <button className="border rounded-md px-2 py-1.5">
            {option.name}
          </button>
        )
    }
  }, [])

  return (
    <Tabs defaultValue="general" orientation="vertical" className="flex flex-col gap-6 md:flex-row">
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

        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/felipetodev/log.js"
          style={
            { "--primary": "238.7 83.5% 66.7%", "--ring": "238.7 83.5% 66.7%" } as React.CSSProperties
          }
          className="bg-primary text-secondary font-medium border flex items-center justify-center gap-2 rounded-md px-2 whitespace-nowrap py-1.5 text-sm mt-auto mb-6"
        >
          GitHub ⭐️
        </a>
      </TabsList>

      {
        SETTINGS_TABS.map(({ value }) => (
          <TabsContent key={value} value={value}>
            <div className="flex flex-col gap-3 px-4 pb-6 text-sm text-token-text-primary sm:px-6 md:ps-0 md:pt-5">
              {options[value].options.map((option) => (
                <div key={option.name} className="flex justify-between items-center border-b pb-3 last-of-type:border-b-0">
                  {option.type !== 'button' && <span>{option.name}</span>}
                  {renderOption(option, value)}
                </div>
              ))}
            </div>
          </TabsContent>
        ))
      }
    </Tabs>
  )
}