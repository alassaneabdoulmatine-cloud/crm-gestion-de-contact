"use client"

import { columns } from "./columns"
import { DataTable } from "./data-table"
import { CreateEntrepriseModal } from "./CreateEntrepriseModal"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface EntreprisesClientProps {
    initialData: any[]
}

export function EntreprisesClient({ initialData }: EntreprisesClientProps) {
    const [isOpen, setIsOpen] = useState(false)
    const data = initialData || []

    return (
        <div className="h-[90vh] overflow-hidden">
            <div className="px-8 py-4 flex flex-col gap-4">
                {/* header */}
                <div className="flex flex-row justify-between items-center w-full">
                    <div>
                        <h1 className="text-xl font-semibold">Entreprises</h1>
                        <p className="text-sm text-muted-foreground">{data.length} entreprises</p>
                    </div>
                    <div>
                        <Button
                            className="h-[36px]"
                            onClick={() => setIsOpen(true)}
                        >
                            add entreprise
                        </Button>
                    </div>
                </div>

                {/* table */}
                <div>
                    <div>
                        <DataTable columns={columns} data={data} />
                    </div>
                </div>

            </div>
            {/* modal de creation d'entreprise */}
            <div className="w-full p-0 overflow-hidden">
                <CreateEntrepriseModal isOpen={isOpen} onOpenChange={setIsOpen} />
            </div>
        </div>
    )
}
