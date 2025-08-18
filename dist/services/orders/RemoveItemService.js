"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveItemService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class RemoveItemService {
    async execute(productId) {
        const order = await prisma_1.default.item.delete({
            where: {
                id: productId
            }
        });
        return { productId: order.product_Id }; // Retorna o productId do item removido do pedido
    }
}
exports.RemoveItemService = RemoveItemService;
