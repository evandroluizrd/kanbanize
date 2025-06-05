import { api } from "../config"

export async function getTasks(params: any) {
    const { data } = await api.get("task", { params })
    return data
}

export async function crateTask(body: any) {
    const { data } = await api.post("task", body)
    return data
}