const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');
const response = require('../tools/response');

router.get('/', (req, res) => response(res, async () => await new TaskController().findAll(req.query)));
router.get('/:id', (req, res) => response(res, async () => await new TaskController().find(req.params?.id)));
router.post('/', (req, res) => response(res, async () => await new TaskController().create(req.body)));
router.put('/:id', (req, res) => response(res, async () => await new TaskController().update(req.params?.id, req.body)));
router.delete('/:id', (req, res) => response(res, async () => await new TaskController().delete(req.params?.id)));

module.exports = router;
