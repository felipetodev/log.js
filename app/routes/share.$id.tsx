import { type LoaderFunctionArgs, MetaFunction, data, redirect } from '@remix-run/node'
import { useLoaderData } from "@remix-run/react";
import { Footer } from "~/components/footer";
import { PlaygroundPreview } from "~/components/playground-preview";
import { useShareCode } from "~/hooks/use-share-code";
import { GitForkIcon, LinkIcon } from "lucide-react";
import { SchemaTable } from '~/lib/types';
import { createSSRClient } from '~/lib/supabase.server';
import { FEATURE_FLAGS } from '~/lib/feature-flags';
import { validateParams } from '~/lib/schemas';

export const meta: MetaFunction = () => {
  return [
    { title: "Share | log.js 🧪" },
  ];
};

type LoaderArgs = LoaderFunctionArgs & { params: { id: string } }

const throwError = (message: string) => {
  throw new Response(null, {
    status: 404,
    statusText: message,
  })
}

export async function loader({ request, params }: LoaderArgs) {
  if (!FEATURE_FLAGS.SHARE_CODE) {
    return redirect("/");
  }
  const supabase = createSSRClient(request)
  const { success } = validateParams(params)

  if (!success) throwError("Share code not found")

  const shareCode = await supabase
    .from(SchemaTable.Shares)
    .select()
    .eq('id', params.id)
    .single()

  if (!shareCode.data || shareCode.status >= 400) {
    // add trasanctional logging
    console.error(shareCode.error?.message)
    throwError("Share code not found")
  }

  return data(shareCode.data, {
    status: 200,
  })
}

export default function Share() {
  const { code } = useLoaderData<{ code: string }>()
  const { forkCode } = useShareCode()

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
