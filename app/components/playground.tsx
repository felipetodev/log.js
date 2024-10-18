import { useMonacoEditor } from "~/hooks/use-monaco-editor";
import { useTabsStore } from "~/store/tabs";
import { LanguageSwitch } from "./language-switch";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle
} from "react-resizable-panels";

export function Playground() {
  const {
    inputEditorRef,
    outputEditorRef
  } = useMonacoEditor()

  const hasHydratedStorage = useTabsStore(state => state._hasHydrated);
  return (
    <>
      {hasHydratedStorage ? (
        <div className="h-[calc(100%-56px)] bg-[#282A36]">
          <PanelGroup autoSaveId="editor" direction="horizontal">
            <Panel defaultSize={50} minSize={20} className="relative">
              <div ref={inputEditorRef} className="size-full" />
              <LanguageSwitch />
            </Panel>
            <PanelResizeHandle className="w-[1px] bg-neutral-700/80 data-[resize-handle-state=drag]:bg-neutral-600" />
            <Panel defaultSize={50} minSize={20}>
              <div ref={outputEditorRef} className="size-full" />
            </Panel>
          </PanelGroup>
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