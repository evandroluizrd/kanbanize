const pool = require('../models/db');

export class Task {
    constructor() {}

    async find(id) {
        if (!id) throw new Error("ID da tarefa não foi informado")

        const response = await pool.query('SELECT * FROM tarefas WHERE id = $1', [id]);

        return response?.rows?.[0]
    }

    async findAll(params) {

        let query = "SELECT * FROM tarefas t"

        if (Number(params.page) && Number(params.page) > 0) query += ` OFFSET ${(Number(params.page) - 1) * Number(params.perPage || 10)}`
        if (Number(params.perPage)) query += ` LIMIT ${Number(params.perPage)}`

        const { rows: [total] } = await pool.query(query.replace("*", "count(1) as value")) || { rows: [] };
        const { rows: content } = await pool.query(query) || { rows: [] };

        return { content, total: Number(total?.value || 0) }
    }

    async create(body) {

    }

    async update(id, body) {

    }

    async delete(id) {
        if (!id) throw new Error("ID da tarefa não foi informado")
            
        return await pool.query('DELETE FROM tarefas WHERE id = $1', [id])
    }
}