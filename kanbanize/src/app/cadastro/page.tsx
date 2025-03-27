'use client';

import Link from 'next/link';
import { useState } from 'react';
import Input from '../../components/Input';
import FormButton from '../../components/FormButton';
import ErrorMessage from '../../components/ErrorMessage';

export default function CadastroPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !email || !senha || !confirmarSenha) {
      setErro('Preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    setErro('');
    alert('Cadastro enviado!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-6 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Cadastro</h1>

        <ErrorMessage message={erro} />

        <Input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          showToggle={true}
        />

        <Input
          type="password"
          placeholder="Confirmar senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          showToggle={true}
        />

        <FormButton label="Cadastrar" />

        <p className="text-sm text-center mt-4">
          Já tem conta?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Faça login
          </Link>
        </p>
      </form>
    </div>
  );
}
