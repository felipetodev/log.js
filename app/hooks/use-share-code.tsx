import { useTabs } from "~/hooks/use-tab";
import { supabase } from "~/lib/supabase-client";
import { SchemaTable } from "~/lib/types";
import { toast } from 'sonner';

export function useShareCode() {
  const { activeTab, createNewTab } = useTabs()

  const shareCode = async () => {
    const { id, code } = activeTab

    const { status } = await supabase
      .from(SchemaTable.Shares)
      .upsert({ id, code })

    if (status === 200 || status === 201) {
      navigator.clipboard.writeText(
        `${window.location.origin}/share/${id}`
      )
      toast.success('Share code copied to clipboard')
    } else {
      toast.error('Failed to share code')
    }
  }

  const forkCode = async (code: string) => {
    createNewTab(code)
    toast.success('Code forked')
    await new Promise(resolve => setTimeout(resolve, 700))

    window.location.pathname = '/'
  }

  return { shareCode, forkCode }
}
