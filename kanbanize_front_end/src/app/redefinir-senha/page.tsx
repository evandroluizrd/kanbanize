'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PasswordStrengthBar from '../../components/PasswordStrengthBar'; 

export default function RedefinirSenhaPage() {
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  const senhaForte = (senha: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(senha);
  };

  const handleSubmit = async (e: React.FormEvent) => {
<<<<<<<< HEAD:src/app/redefinir-senha/page.tsx
    e.preventDefault();

    if (!email || !novaSenha || !confirmarSenha) {
      setErro('Preencha todos os campos.');
      return;
    }

    if (!senhaForte(novaSenha)) {
      setErro('A senha deve conter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial.');
      return;
    }

    if (novaSenha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/usuarios?email=${email}`);
      const data = await res.json();

      if (data.length === 0) {
        setErro('E-mail não encontrado.');
        return;
      }

      const usuario = data[0];

      const patch = await fetch(`http://localhost:3001/usuarios/${usuario.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senha: novaSenha })
      });

      if (patch.ok) {
        setErro('');
        setMensagem('Senha redefinida com sucesso!');
        setEmail('');
        setNovaSenha('');
        setConfirmarSenha('');
      } else {
        setErro('Erro ao atualizar a senha.');
      }
    } catch (err) {
      console.error(err);
      setErro('Erro na comunicação com o servidor.');
    }
  };
========
  e.preventDefault();

  const emailLimpo = email.trim().toLowerCase();
  const senhaLimpa = novaSenha.trim();

  if (!emailLimpo || !senhaLimpa || !confirmarSenha.trim()) {
    setErro('Preencha todos os campos.');
    return;
  }

  if (!senhaForte(senhaLimpa)) {
    setErro('A senha deve conter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial.');
    return;
  }

  if (senhaLimpa !== confirmarSenha.trim()) {
    setErro('As senhas não coincidem.');
    return;
  }

  try {
    const res = await fetch('http://localhost:3001/api/redefinir-senha', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailLimpo, novaSenha: senhaLimpa })
    });

    const data = await res.json();

    if (res.ok) {
      setErro('');
      setMensagem('Senha redefinida com sucesso!');
      setEmail('');
      setNovaSenha('');
      setConfirmarSenha('');
    } else {
      setErro(data.erro || 'Erro ao atualizar a senha.');
    }
  } catch (err) {
    console.error('Erro detalhado:', err);
    setErro('Erro na comunicação com o servidor.');
  }
};

>>>>>>>> origin/teste_back:kanbanize_front_end/src/app/redefinir-senha/page.tsx

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-6 w-full max-w-md text-center"
      >
        <h1 className="text-2xl font-bold text-blue-600 mb-4">Redefinir Senha</h1>

        {erro && <p className="text-red-500 text-sm mb-4 animate-pulse">{erro}</p>}
        {mensagem && <p className="text-green-600 text-sm mb-4">{mensagem}</p>}

        <input
          type="email"
          className="w-full border px-3 py-2 rounded mb-3"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border px-3 py-2 rounded mb-1"
          placeholder="Nova senha"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
        />

        <PasswordStrengthBar senha={novaSenha} />

        <input
          type="password"
          className="w-full border px-3 py-2 rounded mb-4"
          placeholder="Confirmar nova senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Redefinir Senha
        </button>

        <p className="text-sm text-blue-600 mt-4">
          <span onClick={() => router.push('/login')} className="cursor-pointer hover:underline">
            Voltar ao login
          </span>
        </p>
      </form>
    </div>
  );
}
