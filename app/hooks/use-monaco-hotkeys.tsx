import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import type { editor } from "monaco-editor";
import { useTabs } from "./use-tab";

export function useMonacoHotkeys() {
  const [{ modal }, setModal] = useQueryStates(
    {
      'modal': parseAsBoolean.withDefault(false),
      'option': parseAsString.withDefault('')
    },
    parseAsBoolean.withDefault(false)
  );
  const { createNewTab } = useTabs()

  const loadHotkeys = (editor: editor.IStandaloneCodeEditor, monaco: typeof import('monaco-editor')) => {
    editor.addAction({
      id: 'create-new-tab',
      label: 'Create New Tab',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK], // ⌘ + K
      run: () => {
        createNewTab();
      }
    });

    editor.addAction({
      id: 'toggle-settings',
      label: 'Toggle Settings',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Period], // ⌘ + .
      run: () => {
        setModal({ modal: !modal })
      }
    });
  }

  return { loadHotkeys }
}
