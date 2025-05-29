export default function Modal(props: any) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/75 transition-opacity">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative animate-fadeIn">
                <button
                    className="absolute top-3 right-4 text-gray-500 hover:text-gray-700"
                    // onClick={onClose}
                >
                    &times;
                </button>

                <h2 className="text-xl font-semibold mb-4 text-gray-500">Nova Tarefa</h2>

                <form 
                    // onSubmit={handleSubmit} 
                    className="space-y-4"
                >
                    <div className="text-gray-400">
                        <label className="block text-sm font-medium text-gray-700">Título</label>
                        <input
                            name="title"
                            type="text"
                            required
                            // value={form.title}
                            // onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="text-gray-400">
                        <label className="block text-sm font-medium text-gray-700">Descrição</label>
                        <textarea
                            name="description"
                            rows={3}
                            // value={form.description}
                            // onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="text-gray-400">
                        <label className="block text-sm font-medium text-gray-700">Data</label>
                        <input
                            name="date"
                            type="date"
                            required
                            // value={form.date}
                            // onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="text-gray-400">
                        <label className="block text-sm font-medium text-gray-700">Prioridade</label>
                        <select
                            name="priority"
                            // value={form.priority}
                            // onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="baixa">Baixa</option>
                            <option value="média">Média</option>
                            <option value="alta">Alta</option>
                        </select>
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition"
                        >
                            Adicionar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}