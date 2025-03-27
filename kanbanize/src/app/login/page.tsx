'use client';

import Link from 'next/link';
import { useState } from 'react';
import Input from '../../components/Input';
import FormButton from '../../components/FormButton';
import ErrorMessage from '../../components/ErrorMessage';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !senha) {
      setErro('Preencha todos os campos.');
      return;
    }

    setErro('');
    alert('Login enviado!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-6 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <ErrorMessage message={erro} />

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
        />

        <FormButton label="Entrar" />

        <p className="text-sm text-center mt-4">
          Não tem conta?{' '}
          <Link href="/cadastro" className="text-blue-600 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  );
}
