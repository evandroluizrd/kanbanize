const userModel = require('../models/userModel');

exports.login = (req, res) => {
    const { email, password } = req.body;

    const user = userModel.findUser(email, password);

    if (user) {
        res.json({ success: true, role: user.role });
    } else {
        res.status(401).json({ success: false, message: 'Login ou senha inválidos' });
    }
};
