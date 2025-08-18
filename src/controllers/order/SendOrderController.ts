import {Request, Response} from 'express';

import { SendOrderService } from '../../services/orders/SendOrderService';

class SendOrderController {
    async handle(request: Request, response: Response) {
        const { orderId } = request.body;

        const sendOrder = new SendOrderService();

        const order = await sendOrder.execute({ 
            orderId
         });

        return response.json(order);
    }
}

export { SendOrderController };