'use client';

import { useRouter } from 'next/navigation';
import { Home, LayoutGrid, LogOut, Menu } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/login');
  };

  return (
    <div className={clsx(
      'h-screen bg-primary text-white transition-all duration-300 flex flex-col items-center py-6',
      isOpen ? 'w-64' : 'w-16'
    )}>
      {/* Botão menu */}
      <button onClick={() => setIsOpen(!isOpen)} className="mb-8 text-white">
        <Menu size={24} />
      </button>

      {/* Navegação */}
      <nav className="flex flex-col gap-6 w-full px-2">
        <Link
          href="/home"
          className="flex items-center gap-3 hover:bg-primary-dark p-2 rounded-md transition text-white"
        >
          <Home size={20} />
          {isOpen && <span className="text-sm text-white/90">Início</span>}
        </Link>

        <Link
          href="/kanban"
          className="flex items-center gap-3 hover:bg-primary-dark p-2 rounded-md transition text-white"
        >
          <LayoutGrid size={20} />
          {isOpen && <span className="text-sm text-white/90">Kanban</span>}
        </Link>
      </nav>

      {/* Sair */}
      <div className="mt-auto w-full px-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 hover:bg-red-600 p-2 rounded-md w-full transition text-white"
        >
          <LogOut size={20} />
          {isOpen && <span className="text-sm text-white/90">Sair</span>}
        </button>
      </div>
    </div>
  );
}
