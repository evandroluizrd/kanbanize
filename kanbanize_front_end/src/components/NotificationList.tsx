'use client'

import React, { useEffect, useState } from 'react'

interface Notificacao {
  id: number
  titulo: string
  mensagem: string
  data_hora: string
  enviada: boolean
}

interface Props {
  usuarioId: number
}

const NotificationList: React.FC<Props> = ({ usuarioId }) => {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([])

  useEffect(() => {
    const fetchNotificacoes = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/notificacoes/${usuarioId}`)
        const data = await res.json()
        setNotificacoes(data)
      } catch (error) {
        console.error('Erro ao buscar notificações:', error)
      }
    }

    fetchNotificacoes()
  }, [usuarioId])

  return (
    <div className="p-4 bg-white rounded shadow max-w-2xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Notificações</h2>
      {notificacoes.length === 0 ? (
        <p className="text-gray-600">Nenhuma notificação futura encontrada.</p>
      ) : (
        <ul className="space-y-4">
          {notificacoes.map((notificacao) => (
            <li key={notificacao.id} className="border-b pb-2">
              <p className="font-semibold">{notificacao.titulo}</p>
              {notificacao.mensagem && <p>{notificacao.mensagem}</p>}
              <small className="text-gray-500">
                {new Date(notificacao.data_hora).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default NotificationList
