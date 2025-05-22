"use client";

import React, { useState } from "react";
import { Column } from "./Column";
import TaskModal from "./TaskModal";

export interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  status: string;
  priority: "baixa" | "média" | "alta" | "urgente";
}

export const Board: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    status: "todo",
    priority: "baixa" as Task["priority"],
  });
  const [isFormVisible, setFormVisible] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [modalTask, setModalTask] = useState<Task | null>(null);

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

    setForm({ title: "", description: "", date: "", status: "todo", priority: "baixa" });
    setFormVisible(false);
    setEditingTaskId(null);
  };

  const handleDrop = (taskId: string, newStatus: string) => {
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
    setModalTask(null); // Fecha o modal
  };

  return (
    <>
      <button
        onClick={handleToggleForm}
        className="fixed top-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg"
      >
        {editingTaskId ? "Editar Tarefa" : isFormVisible ? "Fechar" : "Adicionar Tarefa"}
      </button>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="absolute top-20 right-4 bg-white p-6 shadow-md rounded-lg w-80 z-50">
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
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            {editingTaskId ? "Salvar Alterações" : "Adicionar"}
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

<div className="flex justify-center space-x-4 mt-4">
  <Column
    title="A Fazer"
    status="todo"
    color="bg-orange-100"
    tasks={tasks
      .filter((task) => task.status === "todo")
      .sort((a, b) => {
        const priorities = { urgente: 1, alta: 2, média: 3, baixa: 4 };
        return priorities[a.priority] - priorities[b.priority];
      })}
    onDrop={handleDrop}
    onDelete={handleDeleteTask}
    onEdit={handleEditTask}
  />
  <Column
    title="Em Progresso"
    status="in-progress"
    color="bg-yellow-100"
    tasks={tasks
      .filter((task) => task.status === "in-progress")
      .sort((a, b) => {
        const priorities = { urgente: 1, alta: 2, média: 3, baixa: 4 };
        return priorities[a.priority] - priorities[b.priority];
      })}
    onDrop={handleDrop}
    onDelete={handleDeleteTask}
    onEdit={handleEditTask}
  />
  <Column
    title="Concluído"
    status="done"
    color="bg-green-100"
    tasks={tasks
      .filter((task) => task.status === "done")
      .sort((a, b) => {
        const priorities = { urgente: 1, alta: 2, média: 3, baixa: 4 };
        return priorities[a.priority] - priorities[b.priority];
      })}
    onDrop={handleDrop}
    onDelete={handleDeleteTask}
    onEdit={handleEditTask}
  />
</div>

    </>
  );
};
