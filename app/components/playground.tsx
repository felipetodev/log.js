import { useMonacoEditor } from "~/hooks/use-monaco-editor";
import { useTabsStore } from "~/store/tabs";
import { LanguageSwitch } from "./language-switch";

export function Playground() {
  const {
    inputEditorRef,
    outputEditorRef
  } = useMonacoEditor()

  const hasHydratedStorage = useTabsStore(state => state._hasHydrated);
  return (
    <div className="grid grid-cols-2 flex-col h-[calc(100%-56px)] bg-[#282A36]">
      {hasHydratedStorage && (
        <>
          <div className="relative">
            <div ref={inputEditorRef} className="size-full" />
            <LanguageSwitch />
          </div>
          <div ref={outputEditorRef} className="size-full" />
        </>
      )}
    </div>
  )
}