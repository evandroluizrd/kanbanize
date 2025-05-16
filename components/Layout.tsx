'use client';

import { useState, ReactNode } from 'react';
import Sidebar from './Sidebar';
import clsx from 'clsx';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <main
        className={clsx(
          'transition-all duration-300 p-6 w-full',
          isSidebarOpen ? 'pl-64' : 'pl-16'
        )}
      >
        {children}
      </main>
    </div>
  );
}
