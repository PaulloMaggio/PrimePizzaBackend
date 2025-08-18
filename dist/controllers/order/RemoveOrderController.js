"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveOrderController = void 0;
const RemoveOrderService_1 = require("../../services/orders/RemoveOrderService");
class RemoveOrderController {
    async handle(req, res) {
        const orderId = req.query.orderId;
        const removeOrderService = new RemoveOrderService_1.RemoveOrderService();
        const order = await removeOrderService.execute({
            orderId
        });
        return res.json(order); // Retorna o pedido removido}
    }
}
exports.RemoveOrderController = RemoveOrderController;
