import { Request, Response } from "express";
import { ListByCategoryService } from "../../services/product/ListByCategoryService";

class ListByCategoryController {
    async handle(request: Request, response: Response) {
        const  category_Id  = request.query.category_Id as string;

        const listByCategoryService = new ListByCategoryService();

        const products = await listByCategoryService.execute({
            category_Id
        });

        return response.json(products);
    }
}

export { ListByCategoryController };