'use client';

import { PencilSimple, Trash } from 'phosphor-react';

interface CardProps {
  id: string;
  title: string;
  priority: 'baixa' | 'média' | 'alta' | 'urgente';
  description?: string;
  onEdit: () => void;
  onDelete: () => void;
  cardColor: string;
}

export default function Card({
  title,
  description,
  priority,
  onEdit,
  onDelete,
  cardColor,
}: CardProps) {
  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'urgente':
        return 'bg-red-100 text-red-700 border border-red-200';
      case 'alta':
        return 'bg-rose-100 text-rose-700 border border-rose-200';
      case 'média':
        return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
      case 'baixa':
        return 'bg-emerald-100 text-emerald-700 border border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  return (
    <div className={`rounded-xl p-4 shadow-sm border border-zinc-200 mb-4 ${cardColor}`}>      
      <div className="flex justify-between items-start">
        <h3 className="text-base font-medium text-zinc-800">{title}</h3>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${getPriorityStyle(priority)}`}
        >
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>
      </div>

      {description && (
        <p className="text-sm text-zinc-600 mt-2 line-clamp-3">{description}</p>
      )}

      <div className="flex justify-end gap-2 mt-3">
        <PencilSimple
          size={20}
          weight="bold"
          className="cursor-pointer text-zinc-500 hover:text-zinc-800 transition"
          title="Editar"
          onClick={onEdit}
        />
        <Trash
          size={20}
          weight="bold"
          className="cursor-pointer text-zinc-500 hover:text-red-600 transition"
          title="Excluir"
          onClick={onDelete}
        />
      </div>
    </div>
  );
} 