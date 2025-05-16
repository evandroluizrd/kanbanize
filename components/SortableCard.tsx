'use client';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function SortableCard({ id, title }: { id: string; title: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    boxShadow: isDragging
      ? '0 4px 14px rgba(0, 0, 0, 0.2)'
      : '0 1px 4px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-2xl border border-gray-200 cursor-grab mb-4 p-4"
    >
      <h3 className="text-md font-semibold text-textPrimary">{title}</h3>
      <p className="text-sm text-textSecondary mt-2">Descrição da tarefa.</p>
    </div>
  );
}
