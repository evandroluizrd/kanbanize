'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../../services/auth';
import SocialLoginButtons from '../../components/SocialLoginButtons';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const result = await login(email, password);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('role', result.role);
      router.push('/home');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl px-8 py-10 shadow-md">
        <h2 className="text-2xl font-bold text-center text-textPrimary mb-8">Faça seu login</h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-textSecondary">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-textSecondary">Senha</label>
            <input
    id="password"
    type="password"
    placeholder="Insira sua senha"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
    className="mt-1"
/>

            <div className="text-right mt-1">
              <a href="#" className="text-sm text-primary hover:underline">Esqueci minha senha</a>
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full"
          >
            Entrar
          </button>

          {error && <p className="text-red-500 text-center">{error}</p>}
          
          <SocialLoginButtons />

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="mx-4 text-sm text-textSecondary">Não possui cadastro?</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <button
    onClick={() => router.push('/cadastro')}
    className="w-full bg-white border border-primary text-primary hover:bg-primary hover:text-white"
>
    Criar uma conta
</button>

        </div>
      </div>
    </main>
  );
}
