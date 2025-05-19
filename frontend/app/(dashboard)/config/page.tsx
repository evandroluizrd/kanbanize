'use client';

import { useEffect, useState } from 'react';
import {
  Moon,
  Bell,
  Palette,
  CheckCircle
} from 'phosphor-react';

interface Configuracoes {
  modoEscuro: boolean;
  notificacoesEmail: boolean;
  sidebarColor: string;
}

export default function ConfigPage() {
  const [config, setConfig] = useState<Configuracoes>({
    modoEscuro: false,
    notificacoesEmail: true,
    sidebarColor: '#4F46E5',
  });

  const [salvo, setSalvo] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('config');
    if (saved) {
      setConfig(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('config', JSON.stringify(config));
    localStorage.setItem('sidebarColor', config.sidebarColor);
    setSalvo(true);
    setTimeout(() => setSalvo(false), 3000);
  };

  return (
    <div className="p-6 bg-background min-h-screen text-textPrimary">
      <h1 className="text-3xl font-bold text-primary mb-4">Configurações</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md max-w-xl space-y-5 border"
      >
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Moon size={18} weight="bold" />
            Modo escuro
          </label>
          <input
            type="checkbox"
            name="modoEscuro"
            checked={config.modoEscuro}
            onChange={handleChange}
            className="w-5 h-5"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Bell size={18} weight="bold" />
            Notificações por e-mail
          </label>
          <input
            type="checkbox"
            name="notificacoesEmail"
            checked={config.notificacoesEmail}
            onChange={handleChange}
            className="w-5 h-5"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Palette size={18} weight="bold" />
            Cor da Sidebar
          </label>
          <input
            type="color"
            name="sidebarColor"
            value={config.sidebarColor}
            onChange={handleChange}
            className="w-10 h-10 border-none cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-full inline-flex items-center gap-2"
        >
          <CheckCircle size={18} weight="bold" />
          Salvar configurações
        </button>

        {salvo && (
          <p className="text-green-600 text-sm mt-2">
            Configurações salvas com sucesso!
          </p>
        )}
      </form>
    </div>
  );
}
