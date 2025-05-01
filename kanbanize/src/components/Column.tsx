import React from "react";
import { TaskCard } from "./Taskcard";

interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  priority: "baixa" | "média" | "alta" | "urgente";
}

interface ColumnProps {
  title: string;
  tasks: Task[];
  onDrop: (taskId: string, newStatus: string) => void;
  status: string;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string) => void;
  color: string;
}

export const Column: React.FC<ColumnProps> = ({
  title,
  tasks,
  onDrop,
  status,
  onDelete,
  onEdit,
  color,
}) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const taskId = e.dataTransfer.getData("text/plain");
    onDrop(taskId, status);
  };

  return (
    <div
      className={`${color} p-4 rounded w-full max-w-sm`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">Sem tarefas nesta coluna</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            {...task}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
};
