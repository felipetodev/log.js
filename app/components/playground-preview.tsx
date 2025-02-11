import { useEditorPreview } from "~/hooks/use-editor-preview";
import { LanguageSwitch } from "~/components/language-switch";
import { LoopLoader } from "~/components/loop-loader";
import { useMediaQuery } from "~/hooks/use-media-query";
import {
  Panel,
  PanelGroup,
  PanelResizeHandle
} from "react-resizable-panels";
import { cn } from "~/lib/utils";

export function PlaygroundPreview({ code }: { code: string }) {
  const { inputEditorContainer, outputEditorContainer, isLoading } = useEditorPreview(code)
  const { isMobile } = useMediaQuery()
  return (
    <div className="h-[calc(100%-56px)] bg-[#282A36]">
      <PanelGroup autoSaveId="editor" direction={isMobile ? "vertical" : "horizontal"}>
        <Panel defaultSize={50} minSize={20} className="relative">
          <div ref={inputEditorContainer} className="size-full" />
          <LoopLoader isPreview isLoading={isLoading} />
          <LanguageSwitch />
        </Panel>
        <PanelResizeHandle className={cn("bg-neutral-700/80 data-[resize-handle-state=drag]:bg-neutral-600 transition-colors", {
          "h-1": isMobile,
          "w-[1.5px]": !isMobile
        })} />
        <Panel defaultSize={50} minSize={20}>
          <div ref={outputEditorContainer} className="size-full" />
        </Panel>
      </PanelGroup>
    </div>
  )
}
