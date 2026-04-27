import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Trash2Icon } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

interface DeleteContactProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    contactName: string
    onConfirm: () => void
    isDeleting?: boolean
}

export function DeleteContactConfirm({
    open,
    onOpenChange,
    contactName,
    onConfirm,
    isDeleting = false
}: DeleteContactProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    {/* Le badge visuel de danger */}
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon className="h-4 w-4" />
                    </AlertDialogMedia>

                    <AlertDialogTitle className="text-sm">Supprimer le contact ?</AlertDialogTitle>

                    <AlertDialogDescription className="text-xs">
                        Cette action est irréversible. Vous êtes sur le point de supprimer définitivement
                        <span className="font-semibold text-foreground"> {contactName} </span>
                        ainsi que tout son historique du CRM.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel className="text-xs" variant="outline" disabled={isDeleting}>
                        Annuler
                    </AlertDialogCancel>

                    <AlertDialogAction
                        className="text-xs"
                        variant="destructive"
                        onClick={(e) => {
                            e.preventDefault();
                            onConfirm();
                        }}
                        disabled={isDeleting}
                    >
                        {isDeleting && <Spinner className="mr-2 h-4 w-4" />}
                        {isDeleting ? "Suppression..." : "Supprimer"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}