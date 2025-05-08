'use client';

import React, { useState } from 'react';

interface Props {
  onAdd: (title: string, priority: 'Alta' | 'Média' | 'Baixa', dueDate: string) => void;
}

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'Alta' | 'Média' | 'Baixa'>('Média');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Envia todos os dados
    onAdd(title.trim(), priority, dueDate);

    // Limpa os campos após envio
    setTitle('');
    setPriority('Média');
    setDueDate('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-800">📝 Nova Tarefa</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título da tarefa"
          className="w-full p-3 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-sky-300 focus:outline-none transition"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'Alta' | 'Média' | 'Baixa')}
          className="w-full p-3 rounded-lg border border-gray-300 text-gray-800 focus:ring-2 focus:ring-sky-300 focus:outline-none transition"
        >
          <option value="Alta">🔥 Alta</option>
          <option value="Média">⚖️ Média</option>
          <option value="Baixa">🌿 Baixa</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-48 p-2.5 rounded-lg border border-gray-300 text-gray-800 focus:ring-2 focus:ring-sky-300 focus:outline-none transition"
        />
      </div>

      <button
        type="submit"
        className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-6 rounded-lg shadow transition w-full md:w-fit"
      >
        Adicionar Tarefa
      </button>
    </form>
  );
}
