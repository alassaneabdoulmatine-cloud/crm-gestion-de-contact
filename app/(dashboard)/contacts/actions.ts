'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Récupérer les données pour remplir les Select
export async function getFormData() {
    try {
        const [status, entreprises] = await Promise.all([
            prisma.status.findMany(),
            prisma.entreprise.findMany({ where: { userId: "1" } })
        ]);
        return { status, entreprises };
    } catch (error) {
        console.error("Erreur de récupération:", error);
        return { status: [], entreprises: [] };
    }
}

// Créer le contact
export async function createContactAction(formData: any) {
    try {
        const newContact = await prisma.contact.create({
            data: {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                entrepriseId: Number(formData.entrepriseId),
                statusId: Number(formData.statusId),
                userId: "1", // À dynamiser plus tard
            },
        });

        // Indique à Next.js de rafraîchir la liste des contacts
        revalidatePath('/contacts');
        return { success: true, contact: newContact };
    } catch (error) {
        console.error("Erreur Prisma:", error);
        return { success: false, error: "Impossible de créer le contact" };
    }
}

// Récupérer tous les contacts pour la liste
export async function getAllContacts() {
    try {
        const contacts = await prisma.contact.findMany({
            include: {
                status: true,
                entreprise: true,
            }
        });
        return contacts;
    } catch (error) {
        console.error("Erreur de récupération des contacts:", error);
        return [];
    }
}

// update un contact
export async function updateContactAction(formData: any) {
    try {
        const updatedContact = await prisma.contact.update({
            where: { id: Number(formData.id) },
            data: {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                entrepriseId: Number(formData.entrepriseId),
                statusId: Number(formData.statusId),
            },
        });

        revalidatePath('/contacts');
        return { success: true, contact: updatedContact };
    } catch (error) {
        console.error("Erreur de mise à jour:", error);
        return { success: false, error: "Impossible de mettre à jour le contact" };
    }
}

// supprimer un contact
export async function deleteContactAction(id: number) {
    try {
        await prisma.contact.delete({ where: { id } });
        revalidatePath('/contacts');
        return { success: true };
    } catch (error) {
        console.error("Erreur de suppression:", error);
        return { success: false, error: "Impossible de supprimer le contact" };
    }
}
