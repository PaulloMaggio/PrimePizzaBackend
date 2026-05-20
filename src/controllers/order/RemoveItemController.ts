import { Request, Response } from "express";
import { RemoveItemService } from "../../services/orders/RemoveItemService";

class RemoveItemController {
    async handle(req: Request, res: Response) {
        const  productId  = req.query.productId as string;

        const removeItemservice = new RemoveItemService();

        const order = await removeItemservice.execute(productId);

        return res.json(order); 
    }
}

export { RemoveItemController };