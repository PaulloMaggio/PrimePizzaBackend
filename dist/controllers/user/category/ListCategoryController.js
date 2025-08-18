"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCategoryController = void 0;
const ListCategoryService_1 = require("../../../services/category/ListCategoryService");
class ListCategoryController {
    async handle(request, response) {
        const listCategoryService = new ListCategoryService_1.ListCategoryService();
        const category = await listCategoryService.execute();
        return response.json(category);
    }
}
exports.ListCategoryController = ListCategoryController;
