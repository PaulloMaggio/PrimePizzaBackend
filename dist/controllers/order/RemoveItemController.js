"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveItemController = void 0;
const RemoveItemService_1 = require("../../services/orders/RemoveItemService");
class RemoveItemController {
    async handle(req, res) {
        const productId = req.query.productId;
        const removeItemservice = new RemoveItemService_1.RemoveItemService();
        const order = await removeItemservice.execute(productId);
        return res.json(order); 
    }
}
exports.RemoveItemController = RemoveItemController;
