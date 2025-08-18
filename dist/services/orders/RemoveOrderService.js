"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveOrderService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class RemoveOrderService {
    async execute({ orderId }) {
        const order = await prisma_1.default.order.delete({
            where: {
                id: orderId
            }
        });
        return order; // Retorna o pedido removido
    }
}
exports.RemoveOrderService = RemoveOrderService;
