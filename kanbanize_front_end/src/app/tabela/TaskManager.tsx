'use client';

import React, { useState } from 'react';
import TaskForm from '../../components/TaskForm';
import TaskColumn from '../../components/TaskColumn';

interface Task {
  id: number;
  title: string;
  status: 'Backlog' | 'A Fazer' | 'Em Progresso' | 'Concluído';
  priority: 'Alta' | 'Média' | 'Baixa';
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string, priority: 'Alta' | 'Média' | 'Baixa', dueDate: string) => {
    const novaTarefa: Task = {
      id: tasks.length + 1,
      title,
      status: 'Backlog',
      priority,
    };
    setTasks([novaTarefa, ...tasks]);
  };

  const moveTask = (id: number, direction: 'forward' | 'backward') => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        const statusList = ['Backlog', 'A Fazer', 'Em Progresso', 'Concluído'];
        const currentIndex = statusList.indexOf(task.status);
        const newIndex =
          direction === 'forward'
            ? Math.min(currentIndex + 1, statusList.length - 1)
            : Math.max(currentIndex - 1, 0);

        if (task.id === id && currentIndex !== newIndex) {
          return { ...task, status: statusList[newIndex] as Task['status'] };
        }

        return task;
      })
    );
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const columns: Task['status'][] = ['Backlog', 'A Fazer', 'Em Progresso', 'Concluído'];

  return (
    <div className="p-4 space-y-4 bg-gray-100 min-h-screen flex justify-center">
      <div className="w-full max-w-7xl">
        <TaskForm onAdd={addTask} />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {columns.map((col) => (
            <TaskColumn
              key={col}
              title={col}
              tasks={tasks.filter((task) => task.status === col)}
              onMove={moveTask}
              onDelete={removeTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
