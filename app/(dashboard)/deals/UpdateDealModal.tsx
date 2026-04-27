"use client"

import React, { FormEvent, useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, Building2, User, Landmark, Activity, Trash2 } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import { useDealFormData, useUpdateDeal, useDealStages, useDeleteDeal } from './hooks'
import { DeleteDealConfirm } from './DeleteDealConfirm'

interface UpdateDealModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    deal: any; // Using any for now to match the flexible deal object
}

export function UpdateDealModal({ isOpen, onOpenChange, deal }: UpdateDealModalProps) {

    const { contacts, entreprises, isLoading: isFetchingOptions } = useDealFormData(isOpen);
    const updateDeal = useUpdateDeal();
    const deleteDeal = useDeleteDeal();
    const { stages, isLoading: isLoadingStages } = useDealStages();

    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        stageId: '',
        contactId: '',
        entrepriseId: ''
    });

    useEffect(() => {
        if (deal && isOpen) {
            setFormData({
                title: deal.title || '',
                amount: deal.amount?.toString() || '',
                stageId: deal.stageId?.toString() || '',
                contactId: deal.contactId?.toString() || '',
                entrepriseId: deal.entrepriseId?.toString() || ''
            });
        }
    }, [deal, isOpen]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!deal) return;

        updateDeal.mutate({ id: deal.id, formData }, {
            onSuccess: () => {
                onOpenChange(false);
            }
        });
    };

    const handleDeleteConfirm = () => {
        if (!deal) return;
        deleteDeal.mutate(deal.id, {
            onSuccess: () => {
                setIsDeleteConfirmOpen(false);
                onOpenChange(false);
            }
        });
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-none shadow-2xl rounded-xl">
                    <DialogHeader className="px-8 pt-6 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100/50">
                        <DialogTitle className="text-xl font-bold text-gray-900">Modifier le Deal</DialogTitle>
                        <DialogDescription className="text-gray-400 text-xs text-balance">Modifiez les informations de cette opportunité d'affaire.</DialogDescription>
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
                                        className="border-gray-200 focus:border-primary/50 focus:ring-primary/20 transition-all font-medium"
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
                                            className="border-gray-200 focus:border-primary/50 font-medium"
                                            placeholder="0.00"
                                            value={formData.amount}
                                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                        />
                                    </div>
                                    {/* Étape */}
                                    <div className="space-y-2">
                                        <Label className="text-xs font-semibold text-gray-500 flex items-center gap-2">
                                            <Activity className="w-3.5 h-3.5 text-primary" /> Étape actuelle
                                        </Label>
                                        <Select
                                            value={formData.stageId}
                                            onValueChange={(v) => setFormData({ ...formData, stageId: v })}
                                        >
                                            <SelectTrigger className="border-gray-200 w-full font-medium">
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
                                            <SelectTrigger className="border-gray-200 w-full font-medium">
                                                <SelectValue placeholder="Lier une entreprise..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">Aucune entreprise</SelectItem>
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
                                            <SelectTrigger className="border-gray-200 w-full font-medium">
                                                <SelectValue placeholder="Lier un contact..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">Aucun contact</SelectItem>
                                                {contacts?.map((c) => (
                                                    <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <DialogFooter className="pt-4 flex w-full justify-between ">
                                <div className='flex items-center gap-3 w-full'>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        className="text-destructive hover:text-destructive hover:bg-destructive/10 px-3"
                                        onClick={() => setIsDeleteConfirmOpen(true)}
                                        disabled={updateDeal.isPending || deleteDeal.isPending}
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                    </Button>
                                </div>

                                <div className="flex items-center gap-3 w-full justify-end">
                                    <Button type="button" variant="outline" className="border-gray-200 text-gray-500 hover:bg-gray-50" onClick={() => onOpenChange(false)}>
                                        Annuler
                                    </Button>
                                    <Button
                                        type="submit"
                                        className=" hover:bg-primary/90 text-white font-semibold shadow-lg px-6"
                                        disabled={updateDeal.isPending || deleteDeal.isPending}
                                    >
                                        {updateDeal.isPending && <Spinner className="mr-2 h-4 w-4" stroke="white" />}
                                        Modifier
                                    </Button>
                                </div>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>

            <DeleteDealConfirm
                open={isDeleteConfirmOpen}
                onOpenChange={setIsDeleteConfirmOpen}
                dealTitle={deal?.title || ''}
                onConfirm={handleDeleteConfirm}
                isDeleting={deleteDeal.isPending}
            />
        </>
    );
}
