"use client"

import React from 'react'
import { useDroppable } from '@dnd-kit/react'
import { KanbanCard } from './KanbanCard'
import { Plus } from 'lucide-react'

interface KanbanColumnProps {
    id: number;
    label: string;
    deals: any[];
    onUpdateDeal: (deal: any) => void;
}

export function KanbanColumn({ id, label, deals, onUpdateDeal }: KanbanColumnProps) {
    const { ref } = useDroppable({
        id,
        data: {
            type: 'Column',
            stage: id,
        },
    });

    return (
        <div className="flex flex-col w-[300px] min-w-[300px] h-full bg-gray-50/50 rounded-lg border border-gray-100">
            <div className="p-4 flex items-center justify-between sticky top-0 bg-gray-50/50 backdrop-blur-sm rounded-t-lg">
                <div className="flex items-center gap-2">
                    <h2 className="font-bold text-sm text-gray-700">{label}</h2>
                    <span className="bg-gray-200 text-gray-600 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                        {deals.length}
                    </span>
                </div>
                <button className="text-gray-400 hover:text-primary transition-colors">
                    <Plus className="w-4 h-4" />
                </button>
            </div>

            <div ref={ref} className="flex-1 p-3 overflow-y-auto min-h-[500px]">
                {deals.map((deal, index) => (
                    <KanbanCard key={deal.id} deal={deal} index={index} onUpdateDeal={onUpdateDeal} />
                ))}
            </div>
        </div>
    );
}
