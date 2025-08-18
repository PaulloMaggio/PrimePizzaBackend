"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinishOrderController = void 0;
const FinishOrderService_1 = require("../../services/orders/FinishOrderService");
class FinishOrderController {
    async handle(request, response) {
        const { orderId } = request.body;
        const finishOrderService = new FinishOrderService_1.FinishOrderService();
        const order = await finishOrderService.execute({
            orderId
        });
        return response.json(order);
    }
}
exports.FinishOrderController = FinishOrderController;
