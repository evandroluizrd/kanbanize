"use client"

import React, { useEffect, useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { getTasks, crateTask } from '@/api/task'
import TaskModal from '@/components/TaskModal'
import moment from 'moment'

import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
    getDay,
    locales: { 'pt-BR': ptBR },
})

export default function Calendario() {

    const [tasks, setTasks] = useState([])
    const [modal, setModal] = useState({ toggle: false, content: {} })

    const handleSelectSlot = ({ start }: any) => {
        setModal({ toggle: true, content: { date: moment(start).utc().format("YYYY-MM-DD") } })
    }

    const getTasksContent = async () => {
        const tasks = await getTasks({})
        setTasks(tasks.content)
    }

    useEffect(() => {
        getTasksContent()
    }, [getTasksContent])

    const createTask = async (data: any) => {
        await crateTask({
            title: data.title,
            description: data.description,
            date: data.date,
            idPriority: 1,
            idUser: 1,
        })
        await getTasksContent()
    }

    return (
        <div 
            style={{ 
                height: '100vh', 
                padding: '20px', 
                background: "#fff" 
            }}
        >
            {!!modal.toggle && 
                <TaskModal
                    task={modal.content}
                    onClose={() => setModal({ toggle: false, content: {} })}
                    onSave={createTask}
                />}
            <Calendar
                selectable
                onSelectSlot={handleSelectSlot}
                localizer={localizer}
                tasks={tasks}
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
