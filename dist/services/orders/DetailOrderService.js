"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailOrderService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class DetailOrderService {
    async execute({ orderId }) {
        const orders = await prisma_1.default.item.findMany({
            where: {
                order_Id: orderId, // <-- CORRIGIDO AQUI!
            },
            include: {
                product: true,
                order: true,
            }
        });
        return orders;
    }
}
exports.DetailOrderService = DetailOrderService;
