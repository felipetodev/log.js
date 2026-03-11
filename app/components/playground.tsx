import { useMonacoEditor } from "~/hooks/use-monaco-editor";
import { useTabsStore } from "~/store/tabs";
import { LanguageSwitch } from "~/components/language-switch";
import { LoopLoader } from "~/components/loop-loader";
import { useMediaQuery } from "~/hooks/use-media-query";
import { usePanelLayout } from "~/hooks/use-panel-layout";
import { Panel, Group, Separator } from "react-resizable-panels";
import { cn } from "~/lib/utils";

export function Playground() {
  const {
    inputEditorContainer,
    outputEditorContainer,
    isLoading
  } = useMonacoEditor();
  const { isMobile } = useMediaQuery();

  const hasHydratedStorage = useTabsStore(state => state._hasHydrated);
  const { defaultLayout, onLayoutChanged } = usePanelLayout({ id: "editor" });

  return (
    <>
      {hasHydratedStorage ? (
        <div className="h-[calc(100%-56px)] bg-[#282A36]">
          <Group id="editor" defaultLayout={defaultLayout} onLayoutChanged={onLayoutChanged} orientation={isMobile ? "vertical" : "horizontal"}>
            <Panel defaultSize={50} minSize={20} className="relative">
              <div ref={inputEditorContainer} className="size-full" />
              <LanguageSwitch />
              <LoopLoader isLoading={isLoading} />
            </Panel>
            <Separator className={cn("bg-neutral-700/80 data-[separator=active]:bg-neutral-600 transition-colors outline-none", {
              "h-1": isMobile,
              "w-[2px]": !isMobile
            })} />
            <Panel defaultSize={50} minSize={20}>
              <div ref={outputEditorContainer} className="size-full" />
            </Panel>
          </Group>
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