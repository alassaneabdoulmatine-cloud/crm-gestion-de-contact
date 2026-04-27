'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Récupérer toutes les entreprises
export async function getAllEntreprises() {
    try {
        const entreprises = await prisma.entreprise.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return entreprises;
    } catch (error) {
        console.error("Erreur de récupération des entreprises:", error);
        return [];
    }
}

// Créer une entreprise
export async function createEntrepriseAction(formData: any) {
    try {
        const newEntreprise = await prisma.entreprise.create({
            data: {
                name: formData.name,
                proprietaire: formData.proprietaire,
                email: formData.email,
                phone: formData.phone,
                ville: formData.ville,
                secteur: formData.secteur,
                userId: "1", // À dynamiser plus tard
            },
        });

        revalidatePath('/entreprises');
        return { success: true, entreprise: newEntreprise };
    } catch (error) {
        console.error("Erreur Prisma (création entreprise):", error);
        return { success: false, error: "Impossible de créer l'entreprise" };
    }
}

// Mettre à jour une entreprise
export async function updateEntrepriseAction(formData: any) {
    try {
        const updatedEntreprise = await prisma.entreprise.update({
            where: { id: Number(formData.id) },
            data: {
                name: formData.name,
                proprietaire: formData.proprietaire,
                email: formData.email,
                phone: formData.phone,
                ville: formData.ville,
                secteur: formData.secteur,
            },
        });

        revalidatePath('/entreprises');
        return { success: true, entreprise: updatedEntreprise };
    } catch (error) {
        console.error("Erreur Prisma (mise à jour entreprise):", error);
        return { success: false, error: "Impossible de mettre à jour l'entreprise" };
    }
}

// Supprimer une entreprise
export async function deleteEntrepriseAction(id: number) {
    try {
        await prisma.entreprise.delete({
            where: { id }
        });

        revalidatePath('/entreprises');
        return { success: true };
    } catch (error) {
        console.error("Erreur Prisma (suppression entreprise):", error);
        return { success: false, error: "Impossible de supprimer l'entreprise" };
    }
}
