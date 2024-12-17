import { useTabs } from "~/hooks/use-tab";
import { encode, decode } from 'js-base64';

export function useShareCode() {
  const { activeTab, createNewTab } = useTabs()

  const shareCode = () => {
    const hashedCode = encode(activeTab.code)

    navigator.clipboard.writeText(
      `${window.location.origin}/share/${hashedCode}`
    )
  }

  const decodeCode = (code: string) => {
    return decode(code)
  }

  const forkCode = (code: string) => {
    createNewTab(code)
    window.location.pathname = '/'
  }

  return { shareCode, decodeCode, forkCode }
}
