"use client"

import { useState } from "react"
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
import { UpdateContactModal } from "./UpdateContactModal"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteContactAction } from "./actions"
import { DeleteContactConfirm } from "./DeleteContactConfirm"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type contact = {
    id: number
    name: string
    email: string | null
    phone: string | null
    status: {
        id: number
        name: string
    } | null
    entreprise: {
        id: number
        name: string
    } | null
    createdAt: string | Date
}

export const columns: ColumnDef<contact>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            return row.original.status?.name || "N/A"
        }
    },
    {
        accessorKey: "entreprise",
        header: "Entreprise",
        cell: ({ row }) => {
            return row.original.entreprise?.name || "N/A"
        }
    },
    {
        accessorKey: "createdAt",
        header: "Date de creation",
        cell: ({ row }) => {
            const date = typeof row.original.createdAt === 'string' ? new Date(row.original.createdAt) : row.original.createdAt;
            return date.toLocaleString() || "N/A"
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const contact = row.original
            const [isOpen, setIsOpen] = useState(false)
            const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
            const queryClient = useQueryClient();

            const mutation = useMutation({
                mutationFn: deleteContactAction,
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['contacts'] });
                }
            })

            const handleDelete = () => {
                mutation.mutate(contact.id);
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
                            <DropdownMenuItem>View contact</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => { setIsOpen(true) }} >Edit contact</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)} disabled={mutation.isPending}>
                                {mutation.isPending ? "Suppression..." : "Delete contact"}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <UpdateContactModal isOpen={isOpen} onOpenChange={setIsOpen} contact={contact} />
                    <DeleteContactConfirm
                        open={isDeleteDialogOpen}
                        onOpenChange={setIsDeleteDialogOpen}
                        contactName={contact.name}
                        onConfirm={handleDelete}
                        isDeleting={mutation.isPending}
                    />
                </>
            )
        },
    },
]