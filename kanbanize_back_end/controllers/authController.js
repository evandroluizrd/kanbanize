const pool = require('../models/db');
const bcrypt = require('bcrypt');

exports.cadastrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Preencha todos os campos.' });
  }

  try {
    const resultado = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

    if (resultado.rows.length > 0) {
      return res.status(409).json({ erro: 'Este email já está cadastrado.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    await pool.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)',
      [nome, email, senhaHash]
    );

    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });

  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ erro: 'Erro no servidor ao cadastrar.' });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Preencha todos os campos.' });
  }

  try {
    const resultado = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

    if (resultado.rows.length === 0) {
      return res.status(401).json({ erro: 'Email ou senha incorretos.' });
    }

    const usuario = resultado.rows[0];

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'Email ou senha incorretos.' });
    }

    const { senha: _, ...usuarioSemSenha } = usuario;

    res.status(200).json(usuarioSemSenha);

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ erro: 'Erro no servidor ao fazer login.' });
  }
};

exports.redefinirSenha = async (req, res) => {
  const { email, novaSenha } = req.body;

  if (!email || !novaSenha) {
    return res.status(400).json({ erro: 'Email e nova senha são obrigatórios.' });
  }

  try {
    const resultado = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: 'E-mail não encontrado.' });
    }

    const senhaCriptografada = await bcrypt.hash(novaSenha, 10);

    await pool.query(
      'UPDATE usuarios SET senha = $1 WHERE email = $2',
      [senhaCriptografada, email]
    );

    res.status(200).json({ mensagem: 'Senha atualizada com sucesso!' });
  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    res.status(500).json({ erro: 'Erro no servidor.' });
  }
};
