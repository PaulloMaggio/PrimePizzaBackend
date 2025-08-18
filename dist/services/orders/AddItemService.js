"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddItemService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class AddItemService {
    async execute({ orderId, productId, amount }) {
        const order = await prisma_1.default.item.create({
            data: {
                order_Id: orderId,
                product_Id: productId,
                amount: amount
            }
        });
        return order; // Retorna o item adicionado ao pedido
    }
}
exports.AddItemService = AddItemService;
