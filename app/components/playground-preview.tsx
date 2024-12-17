import { useEditorPreview } from "~/hooks/use-editor-preview";
import { LanguageSwitch } from "~/components/language-switch";
import { LoopLoader } from "~/components/loop-loader";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle
} from "react-resizable-panels";

export function PlaygroundPreview({ code }: { code: string }) {
  const { inputEditorContainer, outputEditorContainer, isLoading } = useEditorPreview(code)
  return (
    <>
      {/* {hasHydratedStorage ? ( */}
      <div className="h-[calc(100%-56px)] bg-[#282A36]">
        <PanelGroup autoSaveId="editor" direction="horizontal">
          <Panel defaultSize={50} minSize={20} className="relative">
            <div ref={inputEditorContainer} className="size-full" />
            <LoopLoader isPreview isLoading={isLoading} />
            <LanguageSwitch />
          </Panel>
          <PanelResizeHandle className="w-[1.5px] bg-neutral-700/80 data-[resize-handle-state=drag]:bg-neutral-600 transition-colors" />
          <Panel defaultSize={50} minSize={20}>
            <div ref={outputEditorContainer} className="size-full" />
          </Panel>
        </PanelGroup>
      </div>
      {/* ) : (
        <div className="grid h-[calc(100%-56px)] place-content-center bg-[#282A36]">
          <h2 className="text-white">
            Loading editor...
          </h2>
        </div>
      )} */}
    </>
  )
}