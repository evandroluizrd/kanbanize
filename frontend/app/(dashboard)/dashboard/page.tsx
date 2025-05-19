'use client';

import { useEffect, useState } from 'react';
import {
  ChartBar,
  ClipboardText,
  CheckSquareOffset,
  Clock,
  Plus,
} from 'phosphor-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'baixa' | 'média' | 'alta' | 'urgente';
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('kanban-tasks');
    if (stored) {
      try {
        const parsed: Task[] = JSON.parse(stored);
        setTasks(parsed);
      } catch {
        setTasks([]);
      }
    }
  }, []);

  const count = (status: Task['status']) =>
    tasks.filter((t) => t.status === status).length;

  const priorityData = [
    { name: 'Urgente', value: tasks.filter(t => t.priority === 'urgente').length },
    { name: 'Alta', value: tasks.filter(t => t.priority === 'alta').length },
    { name: 'Média', value: tasks.filter(t => t.priority === 'média').length },
    { name: 'Baixa', value: tasks.filter(t => t.priority === 'baixa').length },
  ];

  return (
    <div className="p-6 min-h-screen bg-background text-textPrimary">
      <h1 className="text-3xl font-bold text-primary mb-6">Painel de Controle</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-3">
          <ClipboardText size={28} weight="bold" className="text-indigo-600" />
          <div>
            <p className="text-sm text-gray-500">Tarefas a Fazer</p>
            <p className="text-lg font-bold">{count('todo')}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-3">
          <Clock size={28} weight="bold" className="text-yellow-500" />
          <div>
            <p className="text-sm text-gray-500">Em Progresso</p>
            <p className="text-lg font-bold">{count('in-progress')}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow flex items-center gap-3">
          <CheckSquareOffset size={28} weight="bold" className="text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Concluídas</p>
            <p className="text-lg font-bold">{count('done')}</p>
          </div>
        </div>
        <Link
          href="/kanban"
          className="bg-primary hover:bg-primary-dark text-white flex items-center justify-center gap-2 rounded-2xl p-4 shadow transition"
        >
          <Plus size={20} weight="bold" /> Nova Tarefa
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <ChartBar size={20} weight="bold" className="text-indigo-600" />
          <h2 className="text-lg font-semibold">Tarefas por Prioridade</h2>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={priorityData}>
            <XAxis dataKey="name" stroke="#888" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
