'use client';
import Layout from '../../components/Layout';


export default function HomePage() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">Bem-vindo ao Kanbanize!</h1>
        <p className="text-gray-600 mb-6">Sistema pronto para organizar suas tarefas 🚀</p>
        <button
          onClick={() => {
            localStorage.removeItem('isAuthenticated');
            window.location.href = '/login';
          }}
          className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition"
        >
          Sair
        </button>
      </div>
    </Layout>
  );
}
