'use client'

import { FiBell, FiClock } from 'react-icons/fi'

const notificacoes = [
  {
    id: 1,
    titulo: 'Tarefa atribuída',
    descricao: 'Você foi adicionado à tarefa "Revisar design do protótipo".',
    horario: 'Há 2 horas',
  },
  {
    id: 2,
    titulo: 'Comentário novo',
    descricao: 'João comentou na tarefa "Integração com API".',
    horario: 'Há 5 horas',
  },
  {
    id: 3,
    titulo: 'Tarefa concluída',
    descricao: 'Maria concluiu a tarefa "Atualizar documentação".',
    horario: 'Ontem',
  },
]

export default function NotificacoesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-purple-800">Notificações</h1>
        <p className="text-gray-600">Veja atualizações e alertas recentes.</p>
      </div>

      <div className="space-y-3">
        {notificacoes.map((notificacao) => (
          <div
            key={notificacao.id}
            className="flex items-start gap-4 bg-white border border-purple-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="text-purple-700 mt-1">
              <FiBell size={20} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">{notificacao.titulo}</p>
              <p className="text-sm text-gray-600">{notificacao.descricao}</p>
              <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                <FiClock size={12} />
                <span>{notificacao.horario}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
