"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useSortable } from '@dnd-kit/react/sortable'
import { Calendar, Building2, User, MoreHorizontal } from 'lucide-react'


interface KanbanCardProps {
    deal: any;
    index: number;
    onUpdateDeal: (deal: any) => void;
}

export function KanbanCard({ deal, index, onUpdateDeal }: KanbanCardProps) {
    const { ref, isDragging } = useSortable({
        id: deal.id,
        index,
        data: {
            type: 'Deal',
            deal,
        },
    });

    const style = {
        opacity: isDragging ? 0.3 : 1,
    };

    return (
        <Card
            ref={ref}
            style={style}
            onClick={() => onUpdateDeal(deal)}
            className="group relative bg-white hover:border-primary/50 transition-all shadow-sm cursor-grab active:cursor-grabbing mb-3 select-none"
        >
            <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-sm text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                        {deal.title}
                    </h3>
                    <button className="text-gray-400 hover:text-gray-600 shrink-0">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </div>

                <div className="space-y-1.5 min-h-[40px]">
                    {deal.entreprise && (
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Building2 className="w-3.5 h-3.5 text-gray-400" />
                            <span className="truncate">{deal.entreprise.name}</span>
                        </div>
                    )}
                    {deal.contact && (
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <User className="w-3.5 h-3.5 text-gray-400" />
                            <span className="truncate">{deal.contact.name}</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400 lowercase">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(deal.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}</span>
                    </div>
                    <div className="font-bold text-sm text-primary">
                        {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(deal.amount || 0)}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
