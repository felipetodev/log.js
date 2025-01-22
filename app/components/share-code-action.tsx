import { useState } from "react"
import { CopyIcon, LinkIcon } from "lucide-react";
import { useShareCode } from "~/hooks/use-share-code";

export function ShareCodeAction() {
  const [copyClipboard, setCopyClipboard] = useState(false)
  const { shareCode } = useShareCode({
    onSuccess: () => {
      setCopyClipboard(false)
    }
  });

  const onShare = async () => {
    setCopyClipboard(true)
    shareCode()
  };

  return (
    <button
      onClick={onShare}
      aria-label="Fork shared code"
      className="font-semibold text-xs h-full text-gray-300 px-1.5 animate-background-shine items-center justify-center border transition-colors border-gray-800 hover:text-gray-400 hover:border-[var(--border-color)] bg-[linear-gradient(110deg,#000,45%,#4D4B4B,55%,#000)] bg-[length:250%_100%]"
    >
      {copyClipboard
        ? <>Copied to Clipboard <CopyIcon className="size-3.5 ml-1.5 inline" /></>
        : <>Share Active Tab <LinkIcon className="size-3.5 ml-1.5 inline" /></>
      }
    </button>
  )
}
