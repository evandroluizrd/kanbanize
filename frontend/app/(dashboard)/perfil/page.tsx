'use client';

import { useEffect, useState } from 'react';
import {
  User,
  EnvelopeSimple,
  PencilSimple,
  X
} from 'phosphor-react';

export default function PerfilPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const savedNome = localStorage.getItem('perfil_nome');
    const savedEmail = localStorage.getItem('perfil_email');
    setNome(savedNome || 'Evandro Luiz');
    setEmail(savedEmail || 'evandro@email.com');
  }, []);

  const salvarAlteracoes = () => {
    localStorage.setItem('perfil_nome', nome);
    localStorage.setItem('perfil_email', email);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-purple-800">Meu Perfil</h1>
        <p className="text-gray-600">Veja e atualize suas informações pessoais.</p>
      </div>

      <div className="bg-white border border-purple-200 rounded-2xl p-6 shadow-sm space-y-4 max-w-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-purple-300 rounded-full flex items-center justify-center text-white text-xl font-bold">
            {nome.charAt(0)}
          </div>
          <div>
            <p className="text-lg font-semibold text-purple-800">{nome}</p>
            <p className="text-sm text-gray-600">Usuário padrão</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-2 text-gray-700">
            <User size={20} weight="bold" />
            <span className="font-medium">{nome}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <EnvelopeSimple size={20} weight="bold" />
            <span className="font-medium">{email}</span>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="mt-4 inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          <PencilSimple size={18} weight="bold" />
          Editar Perfil
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md space-y-4 relative">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={22} weight="bold" />
            </button>
            <h2 className="text-lg font-bold text-purple-800">Editar Perfil</h2>

            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Nome</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                onClick={salvarAlteracoes}
                className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition"
              >
                Salvar alterações
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
