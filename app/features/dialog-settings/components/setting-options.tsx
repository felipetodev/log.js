import { Switch } from "~/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/ui/select"
import { InputNumber } from "~/ui/input-number"
import type { SettingsOption } from "~/lib/types"
import { ChevronRight } from "lucide-react"

type Props = {
  option: SettingsOption<number | string | boolean>
  onUpdate: (value: string | number | boolean) => void
}

export function SettingOptions({ option, onUpdate }: Props) {
  switch (option.type) {
    case "switch":
      return (
        <Switch
          checked={option.value}
          disabled={option.disabled}
          onCheckedChange={onUpdate}
        />
      )
    case "number":
      return (
        <InputNumber
          aria-label={option.name}
          defaultValue={Number(option.value)}
          onChange={onUpdate}
        />
      )
    case "select":
      return (
        <Select
          defaultValue={String(option.value)}
          onValueChange={onUpdate}
          disabled={option.disabled}
        >
          <SelectTrigger id="select-place" className="max-w-[208px]">
            <SelectValue placeholder={`Select ${option.name}`} id="select-place" />
          </SelectTrigger>
          <SelectContent>
            {option.values.map((optionItem) => (
              <SelectItem
                key={optionItem.value}
                value={optionItem.value}
                disabled={optionItem.disabled}
              >
                {optionItem.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )
    case "link":
      return (
        <a
          href={option.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={option.name}
          className="inline-flex w-full justify-between items-center group h-auto gap-4 py-3 text-left p-2 rounded-lg hover:bg-accent transition-colors"
        >
          <div className="space-y-1">
            <h3>{option.name}</h3>
            {option.description && (
              <p className="whitespace-break-spaces font-normal text-muted-foreground text-pretty">
                {option.description}
              </p>
            )}
          </div>
          <ChevronRight
            className="size-5 min-w-5 opacity-60 transition-transform group-hover:translate-x-0.5"
            strokeWidth={2}
            aria-hidden="true"
          />
        </a>
      )
    // case "button":
  }
}
