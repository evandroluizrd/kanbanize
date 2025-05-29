import React from "react";

interface TaskProps {
  id: string;
  title: string;
  description: string;
  date: string;
  priority: "baixa" | "média" | "alta" | "urgente";
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string) => void;
}

const priorityColorMap = {
  baixa: "bg-gray-300 text-gray-700",
  média: "bg-blue-200 text-blue-800",
  alta: "bg-orange-300 text-orange-900",
  urgente: "bg-red-400 text-white",
};

export const TaskCard: React.FC<TaskProps> = ({
  id,
  title,
  description,
  date,
  priority,
  onDelete,
  onEdit,
}) => {
  return (
    <div
      draggable
      onDragStart={(e) => e.dataTransfer.setData("text/plain", id)}
      className="relative bg-white p-4 mb-2 rounded shadow cursor-move break-words whitespace-normal"
    >
      <h3 className="font-bold">{title}</h3>
      <p className="text-sm">{description}</p>
      <small className="text-xs text-gray-500">
        {(() => {
            const [year, month, day] = date.split("-");
            return `${day}/${month}/${year}`;
        })()}
      </small>
      <span
        className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${priorityColorMap[priority]}`}
      >
        {priority}
      </span>

      <div className="absolute bottom-2 right-2 flex gap-2">
        <button
          onClick={() => onEdit(id)}
          className="text-blue-600 hover:text-blue-800"
        >
          ✎
        </button>
        <button
          onClick={() => onDelete(id)}
          className="text-red-600 hover:text-red-800"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
