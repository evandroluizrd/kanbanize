"use client";

import { Board } from "../../components/Board";

export default function KanbanPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Kanban</h1>
      <Board />
    </div>
  );
}
