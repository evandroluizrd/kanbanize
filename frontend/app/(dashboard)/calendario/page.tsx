'use client';
import Sidebar from '../../components/Sidebar';
import useAuth from '../../hooks/useAuth';

export default function CalendarioPage() {
  useAuth();

  return (
     <main className="flex pl-64">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Página Calendario</h1>
      </div>

    </main>
  )
}
