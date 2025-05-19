'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Layout,
  Bell,
  User,
  GearSix,
  PlusCircle,
} from 'phosphor-react';

interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'baixa' | 'média' | 'alta' | 'urgente';
}

export default function HomePage() {
  const [nome, setNome] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const nomeSalvo = localStorage.getItem('perfil_nome');
    setNome(nomeSalvo || 'Evandro');

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

  const contagem = (status: Task['status']) =>
    tasks.filter((t) => t.status === status).length;

  return (
    <div className="p-6 min-h-screen bg-background text-textPrimary">
      <h1 className="text-3xl font-bold text-primary mb-1">
        Olá, {nome}! 👋
      </h1>
      <p className="text-gray-600 mb-6">
        Aqui está um resumo rápido das suas tarefas hoje:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl shadow border-l-4 border-orange-400">
          <p className="text-sm text-gray-500">A Fazer</p>
          <p className="text-2xl font-bold text-orange-600">{contagem('todo')}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow border-l-4 border-yellow-400">
          <p className="text-sm text-gray-500">Em Progresso</p>
          <p className="text-2xl font-bold text-yellow-600">{contagem('in-progress')}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow border-l-4 border-green-400">
          <p className="text-sm text-gray-500">Concluídas</p>
          <p className="text-2xl font-bold text-green-600">{contagem('done')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          href="/kanban"
          className="flex flex-col items-center justify-center bg-white rounded-2xl p-6 shadow hover:shadow-md transition text-indigo-600"
        >
          <Layout size={32} weight="bold" />
          <span className="mt-2 font-medium">Kanban</span>
        </Link>

        <Link
          href="/notificacoes"
          className="flex flex-col items-center justify-center bg-white rounded-2xl p-6 shadow hover:shadow-md transition text-yellow-500"
        >
          <Bell size={32} weight="bold" />
          <span className="mt-2 font-medium">Notificações</span>
        </Link>

        <Link
          href="/perfil"
          className="flex flex-col items-center justify-center bg-white rounded-2xl p-6 shadow hover:shadow-md transition text-purple-500"
        >
          <User size={32} weight="bold" />
          <span className="mt-2 font-medium">Perfil</span>
        </Link>

        <Link
          href="/config"
          className="flex flex-col items-center justify-center bg-white rounded-2xl p-6 shadow hover:shadow-md transition text-gray-600"
        >
          <GearSix size={32} weight="bold" />
          <span className="mt-2 font-medium">Configurações</span>
        </Link>
      </div>

      <div className="mt-10">
        <Link
          href="/kanban"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full transition"
        >
          <PlusCircle size={20} weight="bold" />
          Nova Tarefa
        </Link>
      </div>
    </div>
  );
}
