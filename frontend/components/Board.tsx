// components/Board.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Column } from './Column';
import TaskModal from './TaskModal';
import { Plus } from 'phosphor-react';

export type Status = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  status: Status;
  priority: 'baixa' | 'média' | 'alta' | 'urgente';
}

export const Board: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    status: 'todo' as Status,
    priority: 'baixa' as Task['priority'],
  });
  const [isFormVisible, setFormVisible] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [modalTask, setModalTask] = useState<Task | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('kanban-tasks');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTasks(parsed);
      } catch {
        setTasks([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingTaskId) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTaskId ? { ...task, ...form } : task
        )
      );
    } else {
      const newTask: Task = {
        id: crypto.randomUUID(),
        ...form,
      };
      setTasks([...tasks, newTask]);
    }

    setForm({ title: '', description: '', date: '', status: 'todo', priority: 'baixa' });
    setFormVisible(false);
    setEditingTaskId(null);
  };

  const handleDrop = (taskId: string, newStatus: Status) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleToggleForm = () => {
    setFormVisible(!isFormVisible);
    setEditingTaskId(null);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEditTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setModalTask(task);
    }
  };

  const handleSaveTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
    setModalTask(null);
  };

  const columnConfig: { title: string; status: Status; color: string }[] = [
    { title: 'A Fazer', status: 'todo', color: 'bg-orange-100' },
    { title: 'Em Progresso', status: 'in-progress', color: 'bg-yellow-100' },
    { title: 'Concluído', status: 'done', color: 'bg-green-100' },
  ];

  return (
    <>
      <button
        onClick={handleToggleForm}
        className="group fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg flex items-center justify-center transition z-50"
        title="Nova Tarefa"
      >
        <Plus
          size={24}
          weight="bold"
          className="transition-transform duration-300"
        />
      </button>

      {isFormVisible && (
        <form
          onSubmit={handleSubmit}
          className="absolute top-20 right-4 bg-white p-6 shadow-md rounded-lg w-80 z-50"
        >
          <h2 className="text-xl font-semibold mb-4">Nova Tarefa</h2>
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={form.title}
            onChange={handleInputChange}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <textarea
            name="description"
            placeholder="Descrição (opcional)"
            value={form.description}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleInputChange}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <select
            name="status"
            value={form.status}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          >
            <option value="todo">A Fazer</option>
            <option value="in-progress">Em Progresso</option>
            <option value="done">Concluído</option>
          </select>
          <select
            name="priority"
            value={form.priority}
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          >
            <option value="baixa">Baixa</option>
            <option value="média">Média</option>
            <option value="alta">Alta</option>
            <option value="urgente">Urgente</option>
          </select>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded"
          >
            {editingTaskId ? 'Salvar Alterações' : 'Adicionar'}
          </button>
        </form>
      )}

      {modalTask && (
        <TaskModal
          task={modalTask}
          onClose={() => setModalTask(null)}
          onSave={handleSaveTask}
        />
      )}

      <div className="flex flex-col md:flex-row gap-4 mt-6 px-4">
        {columnConfig.map(({ title, status, color }) => {
          const columnTasks = tasks
            .filter((task) => task.status === status)
            .sort((a, b) => {
              const priorities = { urgente: 1, alta: 2, média: 3, baixa: 4 };
              return priorities[a.priority] - priorities[b.priority];
            });

          return (
            <Column
              key={status}
              title={`${title} (${columnTasks.length})`}
              status={status}
              color={color}
              cardColor="bg-white"
              tasks={columnTasks}
              onDrop={handleDrop}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          );
        })}
      </div>
    </>
  );
};

export default Board;
