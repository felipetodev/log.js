import { useEffect } from "react";
import { useFetcher } from "@remix-run/react";
import { toast } from 'sonner';
import { useTabs } from "~/hooks/use-tab";

type ShareActionResponse = {
  message: string;
  success: boolean;
};

export function useShareCode(props?: { onSuccess?: () => void }) {
  const action = useFetcher<ShareActionResponse>();
  const { activeTab, createNewTab } = useTabs();
  const { onSuccess } = props ?? {};

  const shareCode = async () => {
    const { id, code } = activeTab;

    action.submit(
      { id, code },
      { method: "post", action: "/share" }
    );
  }

  const forkCode = async (code: string) => {
    createNewTab(code)
    toast.success('Code forked')
    await new Promise(resolve => setTimeout(resolve, 700))

    window.location.pathname = '/'
  }

  useEffect(() => {
    if (action.data?.success) {
      navigator.clipboard.writeText(
        `${window.location.origin}/share/${activeTab.id}`
      )
      toast.success(action.data.message);
      onSuccess && setTimeout(onSuccess, 1000)
    } else {
      toast.error(action.data?.message || "Failed to share code");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action.data]);

  return { shareCode, forkCode };
}
