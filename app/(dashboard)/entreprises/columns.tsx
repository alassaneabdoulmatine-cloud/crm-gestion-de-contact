import { ColumnDef } from "@tanstack/react-table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { UpdateEntrepriseModal } from "./UpdateEntrepriseModal"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteEntrepriseAction } from "./actions"
import { DeleteEntrepriseConfirm } from "./DeleteEntrepriseConfirm"

// This type is used to define the shape of our data.
export type entreprise = {
    id: number
    name: string
    proprietaire: string | null
    email: string | null
    phone: string | null
    ville: string | null
    secteur: string | null
    createdAt: string | Date
}

export const columns: ColumnDef<entreprise>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "proprietaire",
        header: "Propriétaire",
        cell: ({ row }) => row.original.proprietaire || "N/A"
    },
    {
        accessorKey: "ville",
        header: "Ville",
        cell: ({ row }) => row.original.ville || "N/A"
    },
    {
        accessorKey: "secteur",
        header: "Secteur",
        cell: ({ row }) => row.original.secteur || "N/A"
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => row.original.email || "N/A"
    },
    {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => row.original.phone || "N/A"
    },
    {
        accessorKey: "createdAt",
        header: "Date de création",
        cell: ({ row }) => {
            const date = typeof row.original.createdAt === 'string' ? new Date(row.original.createdAt) : row.original.createdAt;
            return date.toLocaleString() || "N/A"
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const entreprise = row.original
            const [isUpdateOpen, setIsUpdateOpen] = useState(false)
            const [isDeleteOpen, setIsDeleteOpen] = useState(false)
            const queryClient = useQueryClient();

            const deleteMutation = useMutation({
                mutationFn: deleteEntrepriseAction,
                onSuccess: (result) => {
                    if (result.success) {
                        queryClient.invalidateQueries({ queryKey: ['entreprises'] });
                        setIsDeleteOpen(false);
                    } else {
                        alert(result.error);
                    }
                }
            })

            const handleDelete = () => {
                deleteMutation.mutate(entreprise.id);
            }

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setIsUpdateOpen(true)}>Edit entreprise</DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setIsDeleteOpen(true)}
                                className="text-destructive focus:text-destructive"
                                disabled={deleteMutation.isPending}
                            >
                                {deleteMutation.isPending ? "Suppression..." : "Supprimer"}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <UpdateEntrepriseModal
                        isOpen={isUpdateOpen}
                        onOpenChange={setIsUpdateOpen}
                        entreprise={entreprise}
                    />

                    <DeleteEntrepriseConfirm
                        open={isDeleteOpen}
                        onOpenChange={setIsDeleteOpen}
                        entrepriseName={entreprise.name}
                        onConfirm={handleDelete}
                        isDeleting={deleteMutation.isPending}
                    />
                </>
            )
        },
    },
]
