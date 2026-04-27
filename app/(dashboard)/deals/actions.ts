'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'


// Récupérer tous les deals pour le Kanban
export async function getDeals() {
    try {
        const deals = await prisma.deal.findMany({
            where: { userId: "1" },
            include: {
                contact: true,
                entreprise: true,
            },
        })
        return deals;
    } catch (error) {
        console.error("Erreur de récupération des deals:", error);
        return [];
    }
}

// Récupérer les données pour le formulaire de deal
export async function getDealFormData() {
    try {
        const [contacts, entreprises] = await Promise.all([
            prisma.contact.findMany({ where: { userId: "1" } }),
            prisma.entreprise.findMany({ where: { userId: "1" } })
        ]);
        return { contacts, entreprises };
    } catch (error) {
        console.error("Erreur de récupération des données de formulaire:", error);
        return { contacts: [], entreprises: [] };
    }
}

// Créer un deal
export async function createDeal(formData: any) {
    try {
        const newDeal = await prisma.deal.create({
            data: {
                title: formData.title,
                amount: formData.amount ? parseFloat(formData.amount) : 0,
                stageId: formData.stageId ? Number(formData.stageId) : null,
                userId: "1", // À dynamiser plus tard
                contactId: formData.contactId ? Number(formData.contactId) : null,
                entrepriseId: formData.entrepriseId ? Number(formData.entrepriseId) : null,
            },
        });

        revalidatePath('/deals');
        return { success: true, deal: newDeal };
    } catch (error) {
        console.error("Erreur Prisma (createDeal):", error);
        return { success: false, error: "Impossible de créer le deal" };
    }
}
//deal stage
export async function getDealStages() {
    try {
        const stages = await prisma.dealStage.findMany({
            orderBy: { id: 'asc' }
        });
        return stages;
    } catch (error) {
        console.error("Erreur de récupération des stages:", error);
        return [];
    }
}
// Mettre à jour le stage d'un deal (Drag & Drop)
export async function updateDealStage(id: number, stageId: number) {
    try {
        const updatedDeal = await prisma.deal.update({
            where: { id },
            data: { stageId },
        });

        revalidatePath('/deals');
        return { success: true, deal: updatedDeal };
    } catch (error) {
        console.error("Erreur Prisma (updateStage):", error);
        return { success: false, error: "Impossible de mettre à jour le stage" };
    }
}

// Mettre à jour un deal complet
export async function updateDeal(id: number, formData: any) {
    try {
        const updatedDeal = await prisma.deal.update({
            where: { id },
            data: {
                title: formData.title,
                amount: formData.amount ? parseFloat(formData.amount) : 0,
                stageId: formData.stageId ? Number(formData.stageId) : null,
                contactId: formData.contactId ? Number(formData.contactId) : null,
                entrepriseId: formData.entrepriseId ? Number(formData.entrepriseId) : null,
            },
        });

        revalidatePath('/deals');
        return { success: true, deal: updatedDeal };
    } catch (error) {
        console.error("Erreur Prisma (updateDeal):", error);
        return { success: false, error: "Impossible de mettre à jour le deal" };
    }
}

// Supprimer un deal
export async function deleteDeal(id: number) {
    try {
        await prisma.deal.delete({ where: { id } });
        revalidatePath('/deals');
        return { success: true };
    } catch (error) {
        console.error("Erreur de suppression:", error);
        return { success: false, error: "Impossible de supprimer le deal" };
    }
}
