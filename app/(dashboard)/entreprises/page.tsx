"use client"

import { Loader } from "lucide-react";
import { EntreprisesClient } from "./EntreprisesClient";
import { getAllEntreprises } from "./actions";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";

export default function Entreprises() {
    const { data: entreprises, isLoading, error } = useQuery({
        queryKey: ["entreprises"],
        queryFn: getAllEntreprises,
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
        <EntreprisesClient initialData={entreprises ?? []} />
    )
}