
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
      router.push('/login');
    }
  }, [router]);
  
  const handleLogout = () => {
    router.push('/login'); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="bg-white shadow-md rounded p-6 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Bem-vindo(a)!
        </h1>
        <p className="text-gray-700 mb-6">
          Que bom ter você por aqui. Esperamos que sua experiência seja incrível!
        </p>

        <button
          onClick={handleLogout}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Sair
        </button>
      </div>
    </div>
  );
}
