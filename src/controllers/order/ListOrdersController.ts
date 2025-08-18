import {Request, Response} from 'express';
import { ListOrdersService } from '../../services/orders/ListOrdersService';

class ListOrdersController {
  async handle(req: Request, res: Response) {
    const listOrdersService = new ListOrdersService();

    try {
      const orders = await listOrdersService.execute();
      return res.json(orders);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Unknown error' });
    }
  }
}

export { ListOrdersController };