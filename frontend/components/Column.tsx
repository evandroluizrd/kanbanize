'use client';

import Card from './Card';
import { Task, Status } from './Board';

interface ColumnProps {
  title: string;
  status: Status;
  tasks: Task[];
  color: string;
  cardColor: string;
  onDrop: (taskId: string, newStatus: Status) => void;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string) => void;
}

export const Column = ({
  title,
  status,
  tasks,
  color,
  cardColor,
  onDrop,
  onDelete,
  onEdit,
}: ColumnProps) => {
  const handleDragStart = (event: React.DragEvent, taskId: string) => {
    event.dataTransfer.setData('text/plain', taskId);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('text/plain');
    onDrop(taskId, status);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <div
      className={`flex-1 min-w-[300px] rounded-xl p-4 ${color}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      {tasks.map((task) => (
        <div key={task.id} draggable onDragStart={(e) => handleDragStart(e, task.id)}>
          <Card
            id={task.id}
            title={task.title}
            description={task.description}
            priority={task.priority}
            cardColor={cardColor}
            onDelete={() => onDelete(task.id)}
            onEdit={() => onEdit(task.id)}
          />
        </div>
      ))}
    </div>
  );
};
