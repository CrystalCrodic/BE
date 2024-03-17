const { create } = require('../services/bill.service');

class BillController {
    async create(req, res, next) {
        try {
            const json = await create(req);
            return res.status(json.status).json(json);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new BillController();
