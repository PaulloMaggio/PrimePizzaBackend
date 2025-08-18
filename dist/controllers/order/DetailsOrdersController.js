"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailsOrdersController = void 0;
const DetailOrderService_1 = require("../../services/orders/DetailOrderService");
class DetailsOrdersController {
    async handle(request, response) {
        const order_id = request.query.order_id;
        const detailOrderService = new DetailOrderService_1.DetailOrderService();
        const orders = await detailOrderService.execute({
            orderId: order_id
        });
        return response.json(orders);
    }
}
exports.DetailsOrdersController = DetailsOrdersController;
