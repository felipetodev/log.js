import { DialogActions } from "./components/dialog-actions"
import { SettingsIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/ui/dialog"

export function DialogSettings() {
  return (
    <Dialog open>
      <DialogTrigger asChild>
        {/* change trigger styles if actual UI changes */}
        <button className="absolute bg-[#4e78cc] h-full px-4 transition-opacity hover:opacity-70">
          <SettingsIcon className="size-3.5 inline" />
        </button>
      </DialogTrigger>
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
