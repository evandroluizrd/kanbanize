'use client';

import Board from '@/components/Board';

export default function KanbanPage() {
  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-3xl font-bold text-primary mb-6">Kanban Board</h1>
      <Board />
    </div>
  );
}
