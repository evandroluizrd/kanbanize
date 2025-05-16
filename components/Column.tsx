'use client';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableCard from './SortableCard';
import { useState } from 'react';

export default function Column({
  status,
  tasks,
  addTask
}: {
  status: string,
  tasks: any[],
  addTask: (status: string, title: string) => void
}) {
  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleAdd = () => {
    if (newTitle.trim() !== '') {
      addTask(status, newTitle);
      setNewTitle('');
      setAdding(false);
    }
  };

  return (
    <div
      id={status}
      className="flex flex-col bg-surface rounded-2xl shadow-lg w-72 min-w-72 h-[80vh] border border-gray-200"
    >
      <h2 className="text-lg font-bold text-primary p-4 border-b border-gray-100">{status}</h2>
      <div className="flex-1 p-4 overflow-y-auto">
        <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <SortableCard key={task.id} id={task.id} title={task.title} />
            ))
          ) : (
            <p className="text-sm text-textSecondary">Nenhuma tarefa</p>
          )}
        </SortableContext>

        {adding ? (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Título da tarefa"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="mb-2"
            />
            <div className="flex gap-2">
              <button onClick={handleAdd}>Adicionar</button>
              <button onClick={() => setAdding(false)} className="bg-red-500 hover:bg-red-600">Cancelar</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setAdding(true)} className="mt-4 w-full">
            + Adicionar Tarefa
          </button>
        )}
      </div>
    </div>
  );
}
