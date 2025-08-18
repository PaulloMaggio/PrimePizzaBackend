"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOrdersController = void 0;
const ListOrdersService_1 = require("../../services/orders/ListOrdersService");
class ListOrdersController {
    async handle(req, res) {
        const listOrdersService = new ListOrdersService_1.ListOrdersService();
        try {
            const orders = await listOrdersService.execute();
            return res.json(orders);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Unknown error' });
        }
    }
}
exports.ListOrdersController = ListOrdersController;
