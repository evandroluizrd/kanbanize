import React, { useState } from "react";
import { Task } from "./Board";

interface Props {
  task?: Task;
  onClose: () => void;
  onSave: (task: Task) => void;
}

const TaskModal: React.FC<Props> = ({ task, onClose, onSave }) => {
  const [form, setForm] = useState<Task>({
    id: task?.id ?? "",
    title: task?.title ?? "",
    description: task?.description ?? "",
    date: task?.date ?? "",
    status: task?.status ?? "todo",
    priority: task?.priority ?? "baixa",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const taskToSave = task ? { ...task, ...form } : { ...form, id: generateId() };

    onSave(taskToSave); // O fechamento é controlado no Board
  };

  const generateId = (): string => {
    return Math.random().toString(36).substr(2, 9);
  };

  return (
    <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg z-50 w-80">
      <form onSubmit={handleSubmit}>
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">
          {task?.id ? "Editar Tarefa" : "Nova Tarefa"}
        </h2>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Título"
          required
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descrição"
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full p-2 mb-3 border rounded"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        >
          <option value="todo">A Fazer</option>
          <option value="in-progress">Em Progresso</option>
          <option value="done">Concluído</option>
        </select>
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="baixa">Baixa</option>
          <option value="média">Média</option>
          <option value="alta">Alta</option>
          <option value="urgente">Urgente</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Salvar
        </button>
      </form>
    </div>
  );
};

export default TaskModal;
