'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '../../components/Input';
import FormButton from '../../components/FormButton';
import ErrorMessage from '../../components/ErrorMessage';
import PasswordStrengthBar from '../../components/PasswordStrengthBar';


export default function CadastroPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  
  const senhaForte = (senha: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(senha);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || !email || !senha || !confirmarSenha) {
      setErro('Preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    if (!senhaForte(senha)) {
      setErro('A senha deve conter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial.');
      return;
    }

    try {
      const checkEmail = await fetch(`http://localhost:3001/usuarios?email=${email}`);
      const existingEmail = await checkEmail.json();

      if (existingEmail.length > 0) {
        setErro('Este email já está cadastrado.');
        return;
      }

      const checkNome = await fetch(`http://localhost:3001/usuarios?nome=${encodeURIComponent(nome)}`);
      const existingNome = await checkNome.json();

      if (existingNome.length > 0) {
        setErro('Este nome de usuário já está em uso.');
        return;
      }

      const res = await fetch('http://localhost:3001/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha })
      });

      if (res.ok) {
        setErro('');
        router.push('/login');
      } else {
        setErro('Erro ao cadastrar. Tente novamente.');
      }
    } catch (error) {
      setErro('Erro na comunicação com o servidor.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-6 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Cadastro</h1>
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold shadow">
            {nome
            ? nome
            .trim()
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            : <i className="fas fa-user" />}
      </div>
      </div>
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

        <PasswordStrengthBar senha={senha} />

        <Input
          type="password"
          placeholder="Confirmar senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          showToggle={true}
        />

        <FormButton label="Cadastrar" />

        <p className="text-sm text-center mt-4 text-blue-600">
          Já tem conta?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Faça login
          </Link>
        </p>
      </form>
    </div>
  );
}
