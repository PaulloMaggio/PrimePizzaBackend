import { Request, Response } from "express";    
import { DetailOrderService } from "../../services/orders/DetailOrderService";

class DetailsOrdersController {
    async handle(request: Request, response: Response) {

        const order_id = request.query.order_id as string;

        const detailOrderService: DetailOrderService = new DetailOrderService();

        const orders = await detailOrderService.execute({
            orderId: order_id

        });

        return response.json(orders);

    }    
}

export { DetailsOrdersController };