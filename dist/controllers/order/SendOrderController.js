"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendOrderController = void 0;
const SendOrderService_1 = require("../../services/orders/SendOrderService");
class SendOrderController {
    async handle(request, response) {
        const { orderId } = request.body;
        const sendOrder = new SendOrderService_1.SendOrderService();
        const order = await sendOrder.execute({
            orderId
        });
        return response.json(order);
    }
}
exports.SendOrderController = SendOrderController;
