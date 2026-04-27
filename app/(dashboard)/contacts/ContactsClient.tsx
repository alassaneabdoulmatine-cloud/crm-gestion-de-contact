"use client"

import { columns } from "./columns"
import { DataTable } from "./data-table"
import { CreateContactModal } from "./CreateContactModal"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ContactsClientProps {
    initialData: any[]
}

export function ContactsClient({ initialData }: ContactsClientProps) {
    const [isOpen, setIsOpen] = useState(false)
    const data = initialData || []

    return (
        <div className="h-[90vh] overflow-hidden">
            <div className="px-8 py-4">
                {/* header */}
                <div className="flex flex-row justify-between items-center">
                    <div>
                        <h1 className="text-xl font-semibold">Contacts</h1>
                        <p className="text-sm text-muted-foreground">{data.length} contacts</p>
                    </div>
                    <div>
                        <Button
                            className="h-[36px]"
                            onClick={() => setIsOpen(true)}
                        >
                            add contact
                        </Button>
                    </div>
                </div>

                {/* table */}
                <div>
                    <div className="py-4">
                        <DataTable columns={columns} data={data} />
                    </div>
                </div>

            </div>
            {/* modal de creation de contact */}
            <div className="w-full p-0 overflow-hidden">
                <CreateContactModal isOpen={isOpen} onOpenChange={setIsOpen} />
            </div>
        </div>
    )
}
