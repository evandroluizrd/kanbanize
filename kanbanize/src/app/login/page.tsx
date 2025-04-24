'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import Input from '../../components/Input';
import FormButton from '../../components/FormButton';
import ErrorMessage from '../../components/ErrorMessage';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!email || !senha) {
      setErro('Preencha todos os campos.');
      return;
    }
  
    try {
      const res = await fetch(`http://localhost:3001/usuarios?email=${email}&senha=${senha}`);
      const data = await res.json();
  
      if (data.length > 0) {
        // Simula persistência com localStorage
        localStorage.setItem('usuario', JSON.stringify(data[0]));
        router.push('/home');
      } else {
        setErro('Email ou senha incorretos.');
      }
    } catch (error) {
      setErro('Erro ao conectar com o servidor.');
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-6 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Login</h1>

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
        showToggle={true}
        />

        <FormButton label="Entrar" />

        <p className="text-sm text-center mt-4 text-blue-600">
          Não tem conta?{' '}
          <Link href="/cadastro" className="text-blue-600 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  );
}
