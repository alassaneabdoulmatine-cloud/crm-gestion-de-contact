"use client"

import { useState } from 'react'
import { KanbanBoard } from './KanbanBoard'
import { CreateDealModal } from './CreateDealModal'
import { useDeals } from './hooks'
import { Plus, LayoutGrid, ListFilter, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { UpdateDealModal } from './UpdateDealModal'

export default function DealsPage() {
    const { data: deals, isLoading, isError } = useDeals();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDeal, setSelectedDeal] = useState<any>(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const handleUpdateDeal = (deal: any) => {
        setSelectedDeal(deal);
        setIsUpdateModalOpen(true);
    };

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50/50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                    <p className="text-sm font-medium text-gray-500">Chargement des deals...</p>
                </div>
            </div>
        );
    }

    const filteredDeals = deals || [];

    return (
        <div className="flex flex-col bg-white h-[90vh] overflow-hidden">
            {/* Header */}
            <header className='m-8'>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <LayoutGrid className="w-5 h-5 text-primary" />
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Pipeline des Deals</h1>
                        </div>
                        <p className="text-sm text-gray-500 font-medium">
                            Gérez vos opportunités et suivez votre progression ({filteredDeals.length} deals)
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                placeholder="Rechercher un deal..."
                                className="pl-9 bg-gray-50 border-none h-10 text-sm focus-visible:ring-primary/20"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="icon" className="h-10 w-10 border-gray-200">
                            <ListFilter className="w-4 h-4" />
                        </Button>
                        <Button
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Nouveau Deal
                        </Button>
                    </div>
                </div>
            </header>

            {/* Kanban Content */}
            <main className="flex-1 overflow-hidden">
                <div className="h-full px-8 py-6">
                    <KanbanBoard deals={filteredDeals} onUpdateDeal={handleUpdateDeal} />
                </div>
            </main>

            {/* Modals */}
            <CreateDealModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
            <UpdateDealModal
                isOpen={isUpdateModalOpen}
                onOpenChange={setIsUpdateModalOpen}
                deal={selectedDeal}
            />
        </div>
    );
}