'use client';
import Sidebar from '../../components/Sidebar';
import useAuth from '../../hooks/useAuth';

export default function NotifPage() {
  useAuth();
  return (
    <main className="flex pl-64">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Página Notificação</h1>
      </div>
    </main>
  )
}
