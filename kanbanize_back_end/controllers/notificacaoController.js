const pool = require('../models/db');

exports.criarNotificacao = async (req, res) => {
  const { usuario_id, titulo, mensagem, data_hora } = req.body;

  if (!usuario_id || !titulo || !data_hora) {
    return res.status(400).json({ erro: 'Campos obrigatórios: usuario_id, titulo, data_hora.' });
  }

  try {
    await pool.query(
      'INSERT INTO notificacoes (usuario_id, titulo, mensagem, data_hora) VALUES ($1, $2, $3, $4)',
      [usuario_id, titulo, mensagem, data_hora]
    );
    res.status(201).json({ mensagem: 'Notificação criada com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar notificação:', error);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
};

exports.listarNotificacoes = async (req, res) => {
  const { usuario_id } = req.params;

  try {
    const resultado = await pool.query(
      'SELECT * FROM notificacoes WHERE usuario_id = $1 AND data_hora >= NOW() ORDER BY data_hora ASC',
      [usuario_id]
    );
    res.status(200).json(resultado.rows);
  } catch (error) {
    console.error('Erro ao buscar notificações:', error);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
};

exports.marcarComoEnviada = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('UPDATE notificacoes SET enviada = TRUE WHERE id = $1', [id]);
    res.status(200).json({ mensagem: 'Notificação marcada como enviada.' });
  } catch (error) {
    console.error('Erro ao atualizar notificação:', error);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
};