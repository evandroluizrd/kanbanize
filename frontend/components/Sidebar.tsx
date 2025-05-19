'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  House,
  Layout,
  Bell,
  User,
  GearSix,
  SignOut,
  List,
  Gauge,
} from 'phosphor-react';
import Link from 'next/link';
import clsx from 'clsx';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const router = useRouter();

  const [notificacoes, setNotificacoes] = useState<number>(0);

  useEffect(() => {
    const stored = localStorage.getItem('notificacoes');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setNotificacoes(Array.isArray(parsed) ? parsed.length : 0);
      } catch {
        setNotificacoes(0);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/login');
  };

  const iconSize = 22;
  const iconWeight = 'bold';

  return (
    <div
      className={clsx(
        'h-screen bg-primary text-white transition-all duration-300 flex flex-col items-center py-6',
        isOpen ? 'w-64' : 'w-16'
      )}
    >
      {/* Botão menu */}
      <button onClick={() => setIsOpen(!isOpen)} className="mb-8 text-white">
        <List size={iconSize} weight={iconWeight} />
      </button>

      {/* Navegação */}
      <nav className="flex flex-col gap-6 w-full px-2">
        <Link
          href="/home"
          className="flex items-center gap-3 hover:bg-primary-dark p-2 rounded-md transition text-white"
        >
          <House size={iconSize} weight={iconWeight} />
          {isOpen && <span className="text-sm text-white/90">Início</span>}
        </Link>

        <Link
          href="/kanban"
          className="flex items-center gap-3 hover:bg-primary-dark p-2 rounded-md transition text-white"
        >
          <Layout size={iconSize} weight={iconWeight} />
          {isOpen && <span className="text-sm text-white/90">Kanban</span>}
        </Link>

        <Link
          href="/dashboard"
          className="flex items-center gap-3 hover:bg-primary-dark p-2 rounded-md transition text-white"
        >
          <Gauge size={iconSize} weight={iconWeight} />
          {isOpen && <span className="text-sm text-white/90">Dashboard</span>}
        </Link>

        <Link
          href="/notificacoes"
          className="flex items-center gap-3 hover:bg-primary-dark p-2 rounded-md transition text-white relative"
        >
          <div className="relative">
            <Bell size={iconSize} weight={iconWeight} />
            {notificacoes === 1 && (
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full" />
            )}
            {notificacoes > 1 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {notificacoes}
              </span>
            )}
          </div>
          {isOpen && <span className="text-sm text-white/90">Notificações</span>}
        </Link>

        <Link
          href="/perfil"
          className="flex items-center gap-3 hover:bg-primary-dark p-2 rounded-md transition text-white"
        >
          <User size={iconSize} weight={iconWeight} />
          {isOpen && <span className="text-sm text-white/90">Perfil</span>}
        </Link>

        <Link
          href="/config"
          className="flex items-center gap-3 hover:bg-primary-dark p-2 rounded-md transition text-white"
        >
          <GearSix size={iconSize} weight={iconWeight} />
          {isOpen && <span className="text-sm text-white/90">Configurações</span>}
        </Link>
      </nav>

      {/* Sair */}
      <div className="mt-auto w-full px-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 hover:bg-red-600 p-2 rounded-md w-full transition text-white"
        >
          <SignOut size={iconSize} weight={iconWeight} />
          {isOpen && <span className="text-sm text-white/90">Sair</span>}
        </button>
      </div>
    </div>
  );
}
