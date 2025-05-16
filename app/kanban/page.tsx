'use client';

import Layout from '@/components/Layout';
import useAuth from '@/hooks/useAuth';

import { useState } from 'react';
import { v4 as uuid } from 'uuid';

type Status = 'Backlog' | 'A Fazer' | 'Em Progresso' | 'Concluído';

interface Task {
  id: string;
  title: string;
  status: Status;
}

const STATUSES: Status[] = ['Backlog', 'A Fazer', 'Em Progresso', 'Concluído'];

export default function KanbanPage() {
  useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (status: Status) => {
    const newTask: Task = {
      id: uuid(),
      title: 'Nova Tarefa',
      status,
    };
    setTasks(prev => [...prev, newTask]);
  };

  const tasksByStatus = (status: Status) =>
    tasks.filter(task => task.status === status);

  return (
    <Layout>
      <div className="flex flex-col min-h-screen bg-background px-4">
        <h1 className="text-3xl font-bold text-primary mt-8 mb-6 text-center">Kanban Board</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATUSES.map(status => (
            <div key={status} className="bg-white rounded-2xl shadow-md p-4">
              <h2 className="text-lg font-semibold text-primary mb-2">{status}</h2>

              {tasksByStatus(status).length === 0 ? (
                <p className="text-sm text-muted">Nenhuma tarefa</p>
              ) : (
                <ul className="space-y-2">
                  {tasksByStatus(status).map(task => (
                    <li key={task.id} className="p-2 bg-gray-100 rounded-md">
                      {task.title}
                    </li>
                  ))}
                </ul>
              )}

              <button
                className="mt-4 bg-primary text-white rounded-full px-4 py-2 text-sm hover:bg-primary-dark transition"
                onClick={() => handleAddTask(status)}
              >
                + Adicionar Tarefa
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
