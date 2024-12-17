import { useLoaderData } from "@remix-run/react";
import { Footer } from "~/components/footer";
import { PlaygroundPreview } from "~/components/playground-preview";
import { useShareCode } from "~/hooks/use-share-code";
import { GitForkIcon, LinkIcon } from "lucide-react";

export function loader({ params }: { params: { id: string } }) {
  return params
}

export default function Share() {
  const { id } = useLoaderData<typeof loader>()
  const { forkCode, decodeCode } = useShareCode()
  const code = decodeCode(id)

  return (
    <main className="relative h-screen w-screen">
      <div
        style={
          { "--primary": "var(--color-background)" } as React.CSSProperties
        }
        className="flex h-8 w-full border-b border-neutral-700 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <div className="flex items-center justify-between text-white bg-[var(--border-color)] pl-4 pr-1 w-40 rounded-t-lg ml-[3px] mt-auto h-[calc(100%-2px)] border-x border-t border-neutral-700">
          <span className="text-sm font-semibold truncate">
            {code}  <LinkIcon className="size-3.5 ml-1 inline" />
          </span>
        </div>
        <button
          onClick={() => forkCode(code)}
          aria-label="Fork shared code"
          className="font-semibold text-xs rounded-lg text-gray-300 px-1.5 mt-0.5 mb-0.5 ml-0.5 animate-background-shine items-center justify-center border transition-colors border-gray-800 hover:text-gray-400 hover:border-[var(--border-color)] bg-[linear-gradient(110deg,#000,45%,#4D4B4B,55%,#000)] bg-[length:250%_100%]"
        >
          Fork Shared Code <GitForkIcon className="size-3.5 ml-3 inline" />
        </button>
      </div>
      <PlaygroundPreview code={code} />
      <Footer isPreview />
    </main>
  );
}
