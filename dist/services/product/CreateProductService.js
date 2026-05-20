"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));

class CreateProductService {
    async execute({ name, price, description, banner, category_Id }) {
        if (!name || name.trim() === "") {
            throw new Error("O campo 'name' é obrigatório e não pode estar vazio");
        }
        if (!price || price.trim() === "") {
            throw new Error("O campo 'price' é obrigatório e não pode estar vazio");
        }
        if (!description || description.trim() === "") {
            throw new Error("O campo 'description' é obrigatório e não pode estar vazio");
        }
        if (!banner || banner.trim() === "") {
            throw new Error("O campo 'banner' é obrigatório e não pode estar vazio");
        }
        if (!category_Id || category_Id.trim() === "") {
            throw new Error("O campo 'category_Id' é obrigatório e não pode estar vazio");
        }

        const priceAsNumber = parseFloat(price);
        if (isNaN(priceAsNumber)) {
            throw new Error("O campo 'price' deve ser um número válido");
        }

        const product = await prisma_1.default.product.create({
            data: {
                name,
                price: String(priceAsNumber),
                description,
                banner,
                category_Id,
            }
        });

        return product;
    }
}
exports.CreateProductService = CreateProductService;