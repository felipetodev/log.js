import { MonacoOptions, SettingsTab, SettingsTabData } from "~/lib/types"

/*
  {
    "minimap": { "enabled": true },
    "guides": { "bracketPairs": true },
    "hidden": { "enabled": false }
  }
*/

export const parseMonacoValues = {
  hidden: (value: boolean) => ({ enabled: value }),
  guides: (value: boolean) => ({ bracketPairs: value }),
  minimap: (value: boolean) => ({ enabled: value }),
  hover: (value: boolean) => ({ enabled: value }),
} as const

export function getMonacoOptions(formData: Record<SettingsTab, SettingsTabData>) {
  const options: MonacoOptions = {}

  for (const settings of Object.values(formData)) {
    if (settings.options.length > 0) {
      settings.options.forEach(opt => {
        if ('monacoId' in opt && opt.monacoId) {
          const monacoId = opt.monacoId
          // @ts-expect-error TODO: type this correctly
          if (parseMonacoValues[monacoId]) {
            // @ts-expect-error TODO: type this correctly
            options[monacoId] = parseMonacoValues[monacoId](opt.value)
          } else {
            // @ts-expect-error TODO: type this correctly
            options[monacoId] = opt.value
          }
        }
      })
    }
  }

  return options
}
