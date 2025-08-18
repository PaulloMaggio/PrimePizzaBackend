"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderController = void 0;
const CreateOrderService_1 = require("../../services/orders/CreateOrderService");
class CreateOrderController {
    async handle(request, response) {
        const { table, name } = request.body;
        const createOrderService = new CreateOrderService_1.CreateOrderService();
        const order = await createOrderService.execute({
            table,
            name
        });
        return response.json(order);
    }
}
exports.CreateOrderController = CreateOrderController;
