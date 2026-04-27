"use client";

import React, { useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { User, Mail, Phone, Building2, Activity } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

// --- IMPORTS TANSTACK QUERY & ACTIONS ---
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFormData, updateContactAction } from './actions'; // Assure-toi d'avoir updateContactAction
import { type contact } from "./columns";

interface Props {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    contact: contact | null;
}

export function UpdateContactModal({ isOpen, onOpenChange, contact }: Props) {
    const queryClient = useQueryClient();

    const [formData, setFormData] = React.useState({
        id: '',
        name: '',
        email: '',
        phone: '',
        entrepriseId: '',
        statusId: ''
    });

    // 1. SYNC FORM AVEC LE CONTACT SÉLECTIONNÉ
    useEffect(() => {
        if (contact) {
            setFormData({
                id: contact.id.toString(),
                name: contact.name,
                email: contact.email || '',
                phone: contact.phone || '',
                entrepriseId: contact.entreprise?.id.toString() || '',
                statusId: contact.status?.id.toString() || ''
            });
        }
    }, [contact]);

    // 2. CHARGEMENT DES OPTIONS (ENTREPRISES & STATUTS)
    const { data: options, isLoading: isFetchingOptions } = useQuery({
        queryKey: ['form-data-options'],
        queryFn: getFormData,
        enabled: isOpen,
    });

    // 3. MUTATION POUR METTRE À JOUR
    const mutation = useMutation({
        mutationFn: updateContactAction,
        onSuccess: (result) => {
            if (result.success) {
                queryClient.invalidateQueries({ queryKey: ['contacts'] });
                onOpenChange(false);
            } else {
                alert(result.error);
            }
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate(formData);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-none shadow-2xl rounded-xl">
                <DialogHeader className="px-8 pt-4 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100/50">
                    <DialogTitle className="text-xl font-bold text-gray-900">Modifier le Contact</DialogTitle>
                    <DialogDescription className="text-gray-400 text-xs text-xs mt-0.5">
                        Mettez à jour les informations de <span className="text-foreground font-medium">{contact?.name}</span>
                    </DialogDescription>
                </DialogHeader>

                {isFetchingOptions ? (
                    <div className="p-20 flex justify-center"><Spinner /></div>
                ) : (
                    <form onSubmit={handleSubmit} className="px-8 py-2 space-y-4 bg-white">
                        <div className="grid gap-4 py-4">
                            {/* Nom complet */}
                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold text-gray-500 flex items-center gap-2">
                                    <User className="w-3.5 h-3.5" /> Nom complet
                                </Label>
                                <Input
                                    className="border-gray-200 text-xs"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Email */}
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold text-gray-500 flex items-center gap-2">
                                        <Mail className="w-3.5 h-3.5" /> Email
                                    </Label>
                                    <Input
                                        className="border-gray-200 text-xs"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                {/* Téléphone */}
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold text-gray-500 flex items-center gap-2">
                                        <Phone className="w-3.5 h-3.5" /> Téléphone
                                    </Label>
                                    <Input
                                        className="border-gray-200 text-xs"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Entreprise */}
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold text-gray-500 flex items-center gap-2">
                                        <Building2 className="w-3.5 h-3.5" /> Entreprise
                                    </Label>
                                    <Select
                                        value={formData.entrepriseId}
                                        onValueChange={(v) => setFormData({ ...formData, entrepriseId: v })}
                                    >
                                        <SelectTrigger className="border-gray-200 text-xs w-full"><SelectValue placeholder="Choisir..." /></SelectTrigger>
                                        <SelectContent>
                                            {options?.entreprises.map((ent: any) => (
                                                <SelectItem key={ent.id} value={ent.id.toString()}>{ent.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                {/* Statut */}
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold text-gray-500 flex items-center gap-2">
                                        <Activity className="w-3.5 h-3.5" /> Statut
                                    </Label>
                                    <Select
                                        value={formData.statusId}
                                        onValueChange={(v) => setFormData({ ...formData, statusId: v })}
                                    >
                                        <SelectTrigger className="border-gray-200 text-xs w-full"><SelectValue placeholder="Statut..." /></SelectTrigger>
                                        <SelectContent>
                                            {options?.status.map((st: any) => (
                                                <SelectItem key={st.id} value={st.id.toString()}>{st.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="pb-6">
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={mutation.isPending}>
                                Annuler
                            </Button>
                            <Button type="submit" disabled={mutation.isPending}>
                                {mutation.isPending && <Spinner className="mr-2 h-4 w-4" />}
                                Mettre à jour
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}