"use client"
import { Spinner } from "@/components/ui/spinner";
import { ContactsClient } from "./ContactsClient";
import { getAllContacts } from "./actions";
import { useQuery } from "@tanstack/react-query";

export default function Contacts() {
    const { data: contacts, isLoading, error } = useQuery({
        queryKey: ["contacts"],
        queryFn: getAllContacts,
    })

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">
            <Spinner className="w-10 h-10" />
        </div>
    }

    if (error) {
        return <div className="p-8 text-center text-destructive text-sm font-medium">Error: {error.message}</div>
    }

    return (
        <ContactsClient initialData={contacts ?? []} />
    )
}