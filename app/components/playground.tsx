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
    <>
      {hasHydratedStorage ? (
        <div className="grid grid-cols-2 flex-col h-[calc(100%-56px)] bg-[#282A36]">
          <div className="relative">
            <div ref={inputEditorRef} className="size-full" />
            <LanguageSwitch />
          </div>
          <div ref={outputEditorRef} className="size-full" />
        </div>
      ) : (
        <div className="grid h-[calc(100%-56px)] place-content-center bg-[#282A36]">
          <h2 className="text-white">
            Loading editor...
          </h2>
        </div>
      )}
    </>
  )
}