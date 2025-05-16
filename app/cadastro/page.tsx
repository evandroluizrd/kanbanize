'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CadastroPage() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState('');

  const handleCadastro = () => {
    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem');
      return;
    }

    if (senha.length < 8) {
      setError('A senha precisa ter pelo menos 8 caracteres');
      return;
    }

    // 👇 Quando integrarmos o backend, aqui chamaremos a API de cadastro
    console.log({
      nome,
      telefone,
      email,
      senha
    });

    router.push('/login');
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl px-8 py-10 shadow-md">
        <h2 className="text-2xl font-bold text-center text-textPrimary mb-8">Faça seu cadastro</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-textSecondary">Nome</label>
            <input
              type="text"
              placeholder="Insira seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary">Telefone celular</label>
            <input
              type="text"
              placeholder="(00) 0 0000-0000"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary">E-mail</label>
            <input
              type="email"
              placeholder="Ex: joao@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary">Senha</label>
            <input
              type="password"
              placeholder="Crie uma senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="mt-1"
            />
            <ul className="text-xs text-gray-500 mt-1 ml-2 list-disc">
              <li>Mínimo 8 caracteres</li>
              <li>Um caractere maiúsculo (A-Z)</li>
              <li>Um número (0-9)</li>
            </ul>
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary">Confirmar senha</label>
            <input
              type="password"
              placeholder="Repita a senha criada"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="mt-1"
            />
          </div>

          <button
            onClick={handleCadastro}
            className="w-full mt-2"
          >
            Continuar
          </button>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="mx-4 text-sm text-textSecondary">Já possui uma conta?</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <button
            onClick={() => router.push('/login')}
            className="w-full bg-white border border-primary text-primary hover:bg-primary hover:text-white"
          >
            Entrar
          </button>
        </div>
      </div>
    </main>
  );
}
