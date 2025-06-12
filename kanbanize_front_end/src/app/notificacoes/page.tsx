import NotificationList from '@/components/NotificationList'

export default function NotificacoesPage() {
  // Substitua pelo ID real do usuário logado
  const usuarioId = 1

  return (
    <main className="bg-gray-100 min-h-screen p-6">
      <NotificationList usuarioId={usuarioId} />
    </main>
  )
}
