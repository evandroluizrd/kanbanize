"use client"

import React, { useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
    getDay,
    locales: { 'pt-BR': ptBR },
})

const initialEvents = [
    {
        title: 'Reunião de Equipe',
        start: new Date(2025, 4, 7, 10, 0),
        end: new Date(2025, 4, 7, 11, 0),
    },
    {
        title: 'Apresentação do Projeto',
        start: new Date(2025, 4, 9, 14, 0),
        end: new Date(2025, 4, 9, 15, 0),
    },
]

export default function App() {
    const [events, setEvents] = useState(initialEvents)

    const handleSelectSlot = ({ start, end }: any) => {
        const title = window.prompt('Título do novo evento:')
        if (title) {
            setEvents([...events, { start, end, title }])
        }
    }

    return (
        <div 
            style={{ 
                height: '100vh', 
                padding: '20px', 
                background: "#fff" 
            }}
        >
            <Calendar
                selectable
                onSelectSlot={handleSelectSlot}
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                culture="pt-BR"
                style={{ height: '100%', color: "#333" }}
                messages={{
                    next: 'Próximo',
                    previous: 'Anterior',
                    today: 'Hoje',
                    month: 'Mês',
                    week: 'Semana',
                    day: 'Dia',
                    agenda: 'Agenda',
                    date: 'Data',
                    time: 'Hora',
                    event: 'Evento',
                    noEventsInRange: 'Nenhum evento neste período.',
                }}
            />
        </div>
    )
}
