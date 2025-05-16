'use client';

export default function Card({ title }: { title: string }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4 border border-gray-200">
      <h3 className="text-md font-semibold text-textPrimary">{title}</h3>
      <p className="text-sm text-textSecondary mt-2">Descrição breve da tarefa.</p>
    </div>
  );
}
