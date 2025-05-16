'use client';
import { useState, useEffect } from 'react';
import { DndContext, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import Column from './Column';

const columns = ['Backlog', 'A Fazer', 'Em Progresso', 'Concluído'];

export default function Board() {
  const [tasks, setTasks] = useState<{ id: string, title: string, status: string }[]>([]);

  // 🚀 Carrega do localStorage ao iniciar
  useEffect(() => {
    const savedTasks = localStorage.getItem('kanban-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Primeiro uso → inicia com mock
      setTasks([
        { id: '1', title: 'Tarefa 1', status: 'Backlog' },
        { id: '2', title: 'Tarefa 2', status: 'A Fazer' },
        { id: '3', title: 'Tarefa 3', status: 'Em Progresso' },
        { id: '4', title: 'Tarefa 4', status: 'Concluído' },
      ]);
    }
  }, []);

  // 🚀 Salva no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const addTask = (status: string, title: string) => {
    const newTask = {
      id: (tasks.length + 1).toString(),
      title,
      status
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 px-4 md:px-6 overflow-x-auto pt-6 pb-8 max-w-full">
        {columns.map((status) => (
          <Column
            key={status}
            status={status}
            tasks={tasks.filter(t => t.status === status)}
            addTask={addTask}
          />
        ))}
      </div>
    </DndContext>
  );
}
