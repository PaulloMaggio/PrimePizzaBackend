"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinishOrderService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class FinishOrderService {
    async execute({ orderId }) {
        const order = await prisma_1.default.order.update({
            where: {
                id: orderId,
            },
            data: {
                status: true, 
            },
        });
        return order;
    }
}
exports.FinishOrderService = FinishOrderService;
