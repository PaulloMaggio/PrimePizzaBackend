"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddItemController = void 0;
const AddItemService_1 = require("../../services/orders/AddItemService");
class AddItemController {
    async handle(req, res) {
        const { orderId, productId, amount } = req.body;
        const addItem = new AddItemService_1.AddItemService();
        const order = await addItem.execute({
            orderId,
            productId,
            amount
        });
        return res.json(order); 
    }
}
exports.AddItemController = AddItemController;
