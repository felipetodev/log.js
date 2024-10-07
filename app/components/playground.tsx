import { useMonacoEditor } from "~/hooks/use-monaco-editor";
import { useTabsStore } from "~/store/tabs";

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
          <div ref={inputEditorRef} className="size-full" />
          <div ref={outputEditorRef} className="size-full" />
        </>
      )}
    </div>
  )
}