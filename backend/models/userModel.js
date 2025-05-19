// Simulação de "banco de dados"
const users = [
    {
        email: 'admin@kanbanize.com',
        password: '123456',
        role: 'admin'
    }
];

exports.findUser = (email, password) => {
    return users.find(
        (u) => u.email === email && u.password === password
    );
};
