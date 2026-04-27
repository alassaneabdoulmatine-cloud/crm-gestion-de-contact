"use client"

import React, { FormEvent, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, Building2, User, Landmark, Activity } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import { useDealFormData, useCreateDeal, useDealStages } from './hooks'

interface CreateDealModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateDealModal({ isOpen, onOpenChange }: CreateDealModalProps) {

    const { contacts, entreprises, isLoading: isFetchingOptions } = useDealFormData(isOpen);
    const createDeal = useCreateDeal();
    const { stages, isLoading: isLoadingStages, error } = useDealStages();
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        stageId: '',
        contactId: '',
        entrepriseId: ''
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        createDeal.mutate(formData, {
            onSuccess: () => {
                onOpenChange(false);
                setFormData({
                    title: '',
                    amount: '',
                    stageId: '',
                    contactId: '',
                    entrepriseId: ''
                });
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-none shadow-2xl rounded-xl">
                <DialogHeader className="px-8 pt-6 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100/50">
                    <DialogTitle className="text-xl font-bold text-gray-900">Nouveau Deal</DialogTitle>
                    <DialogDescription className="text-gray-400 text-xs text-balance">Créez une nouvelle opportunité d'affaire dans votre pipeline.</DialogDescription>
                </DialogHeader>

                {isFetchingOptions ? (
                    <div className="p-20 flex justify-center"><Spinner /></div>
                ) : (
                    <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5 bg-white">
                        <div className="grid gap-5">
                            {/* Titre du Deal */}
                            <div className="space-y-2">
                                <Label className="text-xs font-semibold text-gray-500 flex items-center gap-2">
                                    <Briefcase className="w-3.5 h-3.5 text-primary" /> Titre du deal
                                </Label>
                                <Input
                                    className="border-gray-200 focus:border-primary/50 focus:ring-primary/20 transition-all"
                                    placeholder="ex: Refonte Site Web - Client X"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Montant */}
                                <div className="space-y-2">
                                    <Label className="text-xs font-semibold text-gray-500 flex items-center gap-2">
                                        <Landmark className="w-3.5 h-3.5 text-primary" /> Montant (€)
                                    </Label>
                                    <Input
                                        type="number"
                                        className="border-gray-200 focus:border-primary/50"
                                        placeholder="0.00"
                                        value={formData.amount}
                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                    />
                                </div>
                                {/* Etape Initiale */}
                                <div className="space-y-2">
                                    <Label className="text-xs font-semibold text-gray-500 flex items-center gap-2">
                                        <Activity className="w-3.5 h-3.5 text-primary" /> Étape initiale
                                    </Label>
                                    <Select
                                        value={formData.stageId}
                                        onValueChange={(v) => setFormData({ ...formData, stageId: v })}
                                    >
                                        <SelectTrigger className="border-gray-200 w-full">
                                            <SelectValue placeholder="Choisir..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {stages?.map((s) => (
                                                <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Entreprise liée */}
                                <div className="space-y-2">
                                    <Label className="text-xs font-semibold text-gray-500 flex items-center gap-2">
                                        <Building2 className="w-3.5 h-3.5 text-primary" /> Entreprise
                                    </Label>
                                    <Select
                                        value={formData.entrepriseId}
                                        onValueChange={(v) => setFormData({ ...formData, entrepriseId: v })}
                                    >
                                        <SelectTrigger className="border-gray-200 w-full">
                                            <SelectValue placeholder="Lier une entreprise..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {entreprises?.map((ent) => (
                                                <SelectItem key={ent.id} value={ent.id.toString()}>{ent.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                {/* Contact lié */}
                                <div className="space-y-2">
                                    <Label className="text-xs font-semibold text-gray-500 flex items-center gap-2">
                                        <User className="w-3.5 h-3.5 text-primary" /> Contact
                                    </Label>
                                    <Select
                                        value={formData.contactId}
                                        onValueChange={(v) => setFormData({ ...formData, contactId: v })}
                                    >
                                        <SelectTrigger className="border-gray-200 w-full">
                                            <SelectValue placeholder="Lier un contact..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {contacts?.map((c) => (
                                                <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="pt-4 gap-3">
                            <Button type="button" variant="outline" className="border-gray-200 text-gray-500" onClick={() => onOpenChange(false)}>
                                Annuler
                            </Button>
                            <Button type="submit" className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg shadow-primary/20" disabled={createDeal.isPending}>
                                {createDeal.isPending && <Spinner className="mr-2 h-4 w-4" />}
                                Créer le deal
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
