"use client"

import React, { useState } from 'react';
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
import { Building2, User, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEntrepriseAction } from './actions';
import { Spinner } from '@/components/ui/spinner';

interface Props {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateEntrepriseModal({ isOpen, onOpenChange }: Props) {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        name: '',
        proprietaire: '',
        email: '',
        phone: '',
        ville: '',
        secteur: ''
    });

    const mutation = useMutation({
        mutationFn: createEntrepriseAction,
        onSuccess: (result) => {
            if (result.success) {
                queryClient.invalidateQueries({ queryKey: ['entreprises'] });
                onOpenChange(false);
                setFormData({
                    name: '',
                    proprietaire: '',
                    email: '',
                    phone: '',
                    ville: '',
                    secteur: ''
                });
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
            <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-none shadow-2xl rounded-xl">
                <DialogHeader className="px-8 pt-4 pb-2 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100/50">
                    <div className="flex items-center gap-3">
                        <div>
                            <DialogTitle className="text-xl font-bold tracking-tight text-gray-900">Nouvelle Entreprise</DialogTitle>
                            <DialogDescription className="text-gray-400 text-xs mt-0.5">Saisissez les informations pour ajouter une nouvelle entreprise.</DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="px-8 space-y-5 bg-white py-4">
                    <div className="grid gap-5">
                        {/* Champ Nom */}
                        <div className="space-y-1.5 group">
                            <Label htmlFor="ent-name" className="text-xs font-semibold text-gray-500 flex items-center gap-2">
                                <Building2 className="w-3.5 h-3.5 group-focus-within:text-black transition-colors" />
                                Nom de l'entreprise
                            </Label>
                            <Input
                                id="ent-name"
                                placeholder="Ma Super Entreprise"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="rounded-md border-gray-200 focus:border-primary focus:ring-0 transition-all outline-none text-sm"
                                required
                            />
                        </div>

                        {/* Propriétaire */}
                        <div className="space-y-1.5 group">
                            <Label htmlFor="ent-owner" className="text-xs font-semibold text-gray-500 flex items-center gap-2">
                                <User className="w-3.5 h-3.5 group-focus-within:text-black transition-colors" />
                                Propriétaire
                            </Label>
                            <Input
                                id="ent-owner"
                                placeholder="Prénom Nom"
                                value={formData.proprietaire}
                                onChange={(e) => setFormData({ ...formData, proprietaire: e.target.value })}
                                className="rounded-md border-gray-200 focus:border-primary focus:ring-0 transition-all outline-none text-sm"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Email */}
                            <div className="space-y-1.5 group">
                                <Label htmlFor="ent-email" className="text-xs font-semibold text-gray-500 flex items-center gap-2">
                                    <Mail className="w-3.5 h-3.5 group-focus-within:text-black transition-colors" />
                                    Email
                                </Label>
                                <Input
                                    id="ent-email"
                                    type="email"
                                    placeholder="contact@entreprise.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="rounded-md border-gray-200 focus:border-primary focus:ring-0 transition-all outline-none text-sm"
                                />
                            </div>

                            {/* Téléphone */}
                            <div className="space-y-1.5 group">
                                <Label htmlFor="ent-phone" className="text-xs font-semibold text-gray-500 flex items-center gap-2">
                                    <Phone className="w-3.5 h-3.5 group-focus-within:text-black transition-colors" />
                                    Téléphone
                                </Label>
                                <Input
                                    id="ent-phone"
                                    type="tel"
                                    placeholder="+33..."
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="rounded-md border-gray-200 focus:border-primary focus:ring-0 transition-all outline-none text-sm"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Ville */}
                            <div className="space-y-1.5 group">
                                <Label htmlFor="ent-ville" className="text-xs font-semibold text-gray-500 flex items-center gap-2">
                                    <MapPin className="w-3.5 h-3.5 group-focus-within:text-black transition-colors" />
                                    Ville
                                </Label>
                                <Input
                                    id="ent-ville"
                                    placeholder="Paris"
                                    value={formData.ville}
                                    onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                                    className="rounded-md border-gray-200 focus:border-primary focus:ring-0 transition-all outline-none text-sm"
                                />
                            </div>

                            {/* Secteur d'activité */}
                            <div className="space-y-1.5 group">
                                <Label htmlFor="ent-secteur" className="text-xs font-semibold text-gray-500 flex items-center gap-2">
                                    <Briefcase className="w-3.5 h-3.5 group-focus-within:text-black transition-colors" />
                                    Secteur d'activité
                                </Label>
                                <Input
                                    id="ent-secteur"
                                    placeholder="Informatique, Vente, etc."
                                    value={formData.secteur}
                                    onChange={(e) => setFormData({ ...formData, secteur: e.target.value })}
                                    className="rounded-md border-gray-200 focus:border-primary focus:ring-0 transition-all outline-none text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <div className="pb-4 flex items-center gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                className="w-[100px] rounded-md"
                                disabled={mutation.isPending}
                            >
                                Annuler
                            </Button>
                            <Button
                                type="submit"
                                className="rounded-md"
                                disabled={mutation.isPending}
                            >
                                {mutation.isPending && <Spinner className="mr-2 h-4 w-4" />}
                                Enregistrer
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
