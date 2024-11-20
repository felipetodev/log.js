import type { MonacoOptions, SettingsTab, SettingsTabData } from "~/lib/types"

export const parseMonacoValues = {
  hidden: (value: boolean) => ({ enabled: value }),
  guides: (value: boolean) => ({ bracketPairs: value }),
  minimap: (value: boolean) => ({ enabled: value }),
  hover: (value: boolean) => ({ enabled: value }),
} as const

export function getMonacoOptions(optionsData: Record<SettingsTab, SettingsTabData>) {
  return Object.values(optionsData).reduce((acc, { options }) => {
    // @ts-expect-error TODO: type this correctly 👀
    options.forEach(({ monacoId, value }) => {
      if (monacoId) {
        // @ts-expect-error TODO: type this correctly 👀
        acc[monacoId] = parseMonacoValues[monacoId]?.(value) ?? value
      }
    })

    return acc
  }, {} as MonacoOptions)
}
