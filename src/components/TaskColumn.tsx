'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Trash2 } from 'lucide-react';


interface Task {
  id: number;
  title: string;
  status: 'Backlog' | 'A Fazer' | 'Em Progresso' | 'Concluído';
  priority: 'Alta' | 'Média' | 'Baixa';
}

interface Props {
  title: string;
  tasks: Task[];
  onMove: (id: number, direction: 'forward' | 'backward') => void;
  onDelete: (id: number) => void;
}

export default function TaskColumn({ title, tasks, onMove, onDelete }: Props) {
  const getColor = () => {
    switch (title) {
      case 'Backlog':
        return 'bg-blue-50';
      case 'A Fazer':
        return 'bg-yellow-50';
      case 'Em Progresso':
        return 'bg-purple-50';
      case 'Concluído':
        return 'bg-green-50';
      default:
        return 'bg-white';
    }
  };

  return (
    <div className={`${getColor()} border border-gray-200 rounded-2xl shadow-md p-4 space-y-3`}>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>

      {tasks.map((task) => {
        const priorityColor =
          task.priority === 'Alta'
            ? 'bg-red-100 border-red-300'
            : task.priority === 'Baixa'
            ? 'bg-green-100 border-green-300'
            : 'bg-yellow-100 border-yellow-300';

        return (
          <div
            key={task.id}
            className={`p-4 rounded-xl border ${priorityColor} text-gray-800 shadow-sm transition-all flex flex-col gap-3`}
          >
            <div>
              <div className="font-semibold text-base">{task.title}</div>
              <div className="text-xs text-gray-600 italic">
                Prioridade: <span className="font-medium">{task.priority}</span>
              </div>
            </div>

            <div className="flex justify-between gap-2">
  <button
    disabled={title === 'Backlog'}
    onClick={() => onMove(task.id, 'backward')}
    className={`w-10 h-10 rounded-xl flex items-center justify-center
      ${title === 'Backlog' ? 'bg-gray-300' : 'bg-sky-600 hover:bg-sky-700'}
      text-white shadow-md transition`}
    title="Mover para anterior"
  >
    <ArrowLeft size={20} />
  </button>

  <button
    onClick={() => onDelete(task.id)}
    className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-500 hover:bg-red-600 text-white shadow-md transition"
    title="Excluir"
  >
    <Trash2 size={20} />
  </button>

  <button
    disabled={title === 'Concluído'}
    onClick={() => onMove(task.id, 'forward')}
    className={`w-10 h-10 rounded-xl flex items-center justify-center
      ${title === 'Concluído' ? 'bg-gray-300' : 'bg-sky-600 hover:bg-sky-700'}
      text-white shadow-md transition`}
    title="Mover para próximo"
  >
    <ArrowRight size={20} />
  </button>
</div>

          </div>
        );
      })}
    </div>
  );
}
