import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { useHotkeys } from "react-hotkeys-hook";
import { useTabs } from "~/hooks/use-tab";

export function HotKeys() {
  const { createNewTab } = useTabs();
  const [{ modal }, setModal] = useQueryStates(
    {
      'modal': parseAsBoolean.withDefault(false),
      'option': parseAsString.withDefault('')
    },
    parseAsBoolean.withDefault(false)
  );

  useHotkeys("meta+k", (evt) => {
    evt.preventDefault();
    createNewTab();
  });

  useHotkeys("meta+.", (evt) => {
    evt.preventDefault();
    if (modal) {
      setModal(null); // clear all keys
    } else {
      setModal({ modal: !modal });
    }
  });

  return null;
}
