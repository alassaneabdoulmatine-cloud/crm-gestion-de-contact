"use client";

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, Phone, Building2, Activity } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

// --- IMPORTS TANSTACK QUERY ---
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFormData, createContactAction } from './actions';

interface Props {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateContactModal({ isOpen, onOpenChange }: Props) {
    const queryClient = useQueryClient();
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        entrepriseId: '',
        statusId: ''
    });

    // 1. CHARGEMENT DES DONNÉES (STATUS & ENTREPRISES)
    // On utilise enabled: isOpen pour ne charger que quand la modale est ouverte
    const { data, isLoading: isFetchingData } = useQuery({
        queryKey: ['form-data-options'],
        queryFn: getFormData,
        enabled: isOpen,
    });

    // 2. MUTATION POUR CRÉER LE CONTACT
    const mutation = useMutation({
        mutationFn: createContactAction,
        onSuccess: (result) => {
            if (result.success) {
                // MAGIE : On dit à TanStack de rafraîchir la liste des contacts
                queryClient.invalidateQueries({ queryKey: ['contacts'] });

                // On ferme et on reset
                onOpenChange(false);
                setFormData({ name: '', email: '', phone: '', entrepriseId: '', statusId: '' });
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
                    <DialogTitle className="text-xl font-bold text-gray-900">Nouveau Contact</DialogTitle>
                    <DialogDescription className="text-gray-400 text-xs">Saisissez les informations du contact.</DialogDescription>
                </DialogHeader>

                {isFetchingData ? (
                    <div className="p-20 flex justify-center"><Spinner /></div>
                ) : (
                    <form onSubmit={handleSubmit} className="px-8 py-2 space-y-4 bg-white">
                        <div className="grid gap-4">
                            {/* Nom */}
                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold text-gray-500 flex items-center gap-2">
                                    <User className="w-3.5 h-3.5" /> Nom complet
                                </Label>
                                <Input
                                    className="border-gray-200 text-xs"
                                    placeholder="Nom du contact"
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
                                        placeholder="email@exemple.com"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                {/* Phone */}
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold text-gray-500 flex items-center gap-2">
                                        <Phone className="w-3.5 h-3.5" /> Téléphone
                                    </Label>
                                    <Input
                                        className="border-gray-200 text-xs"
                                        placeholder="+229..."
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
                                            {data?.entreprises.map((ent: any) => (
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
                                            {data?.status.map((st: any) => (
                                                <SelectItem key={st.id} value={st.id.toString()}>{st.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="pt-4 pb-4">
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
                            <Button type="submit" disabled={mutation.isPending}>
                                {mutation.isPending && <Spinner data-icon="inline-start" className="mr-2" />}
                                Enregistrer
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}