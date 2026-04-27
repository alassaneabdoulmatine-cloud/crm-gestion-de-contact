"use client"

import { useState } from 'react'
import { DragDropProvider, DragOverlay } from '@dnd-kit/react'
import { KanbanColumn } from './KanbanColumn'
import { KanbanCard } from './KanbanCard'
import { useDealStages, useUpdateDealStage, } from './hooks'

interface KanbanBoardProps {
    deals: any[];
    onUpdateDeal: (deal: any) => void;
}

export function KanbanBoard({ deals, onUpdateDeal }: KanbanBoardProps) {
    const [activeDeal, setActiveDeal] = useState<any | null>(null);
    const { stages, isLoading: isLoadingStages, error } = useDealStages();
    const updateDealStage = useUpdateDealStage();

    const handleDragStart = (event: any) => {
        const { source } = event.operation;
        setActiveDeal(source.data?.deal || null);
    };

    const handleDragEnd = (event: any) => {
        const { source, target } = event.operation;
        setActiveDeal(null);

        if (!target) return;

        const activeDealId = source.id;
        let newStage = null;

        // Si la cible est une colonne
        if (target.data?.type === 'Column') {
            newStage = target.id;
        }
        // Si la cible est un autre deal
        else if (target.data?.type === 'Deal') {
            newStage = target.data.deal.stageId;
        }

        if (newStage && newStage !== source.data?.deal.stageId) {
            updateDealStage.mutate({ id: activeDealId, stageId: newStage });
        }
    };

    return (
        <DragDropProvider onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="flex gap-6 h-full overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-200">
                {stages?.map((stage) => (
                    <KanbanColumn
                        key={stage.id}
                        id={stage.id}
                        label={stage.name}
                        deals={deals.filter(d => d.stageId === stage.id)}
                        onUpdateDeal={onUpdateDeal}
                    />
                ))}
            </div>

            <DragOverlay>
                {activeDeal ? (
                    <KanbanCard deal={activeDeal} index={0} onUpdateDeal={onUpdateDeal} />
                ) : null}
            </DragOverlay>
        </DragDropProvider>
    );
}
