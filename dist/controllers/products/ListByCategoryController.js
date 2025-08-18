"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListByCategoryController = void 0;
const ListByCategoryService_1 = require("../../services/product/ListByCategoryService");
class ListByCategoryController {
    async handle(request, response) {
        const category_Id = request.query.category_Id;
        const listByCategoryService = new ListByCategoryService_1.ListByCategoryService();
        const products = await listByCategoryService.execute({
            category_Id
        });
        return response.json(products);
    }
}
exports.ListByCategoryController = ListByCategoryController;
