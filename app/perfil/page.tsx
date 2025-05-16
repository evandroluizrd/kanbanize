'use client';

import Layout from '@/components/Layout';
import useAuth from '@/hooks/useAuth';

export default function PerfilPage() {
  useAuth();

  return (
    <Layout>
      <div className="flex flex-1 flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold">Página Perfil</h1>
      </div>
    </Layout>
  );
}
