import { DialogActions } from "~/features/dialog-settings/components/dialog-actions";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/ui/dialog";

export function DialogSettings({ children }: { children: React.ReactNode }) {
  const [{ modal }, setModal] = useQueryStates(
    {
      'modal': parseAsBoolean.withDefault(false),
      'option': parseAsString.withDefault('')
    },
    parseAsBoolean.withDefault(false)
  );

  return (
    <Dialog
      open={modal}
      onOpenChange={(modal) => {
        if (!modal) {
          setModal(null) // clear all keys
        } else {
          setModal({ modal })
        }
      }}
    >
      {/* <DialogTrigger asChild> */}
      {children}
      {/* </DialogTrigger> */}
      <DialogContent className="md:max-w-[680px]">
        <DialogHeader>
          <DialogTitle>
            Settings
          </DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto">
          <DialogActions />
        </div>
      </DialogContent>
    </Dialog>
  )
}
