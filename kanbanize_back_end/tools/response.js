const pool = require('../models/db');

module.exports = async (res, service) => {
    try {
        const response = await service()

        return res.status(response?.status || 200).json(response?.message || response)
    } catch (e) {
        return res.status(e.status || 422).json(e)
    }
}