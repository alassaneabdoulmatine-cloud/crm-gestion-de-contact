import { useDroppable } from '@dnd-kit/react';
interface DroppableProps {
    id: string;
    children: React.ReactNode;
}

export function Droppable({ id, children }: DroppableProps) {
    const { ref } = useDroppable({
        
        id,
    });

    return (
        <div ref={ref} className='w-[300px] h-[300px] bg-red-500'>
            {children}
        </div>
    );
}