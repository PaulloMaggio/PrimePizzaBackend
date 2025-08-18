import prismaClient from "../../prisma";

interface OrderRequest {
    orderId: string;
    }

class FinishOrderService {
  async execute({orderId}: OrderRequest) {
    
    const order = await prismaClient.order.update({
      where: {
        id: orderId,
      },
      data: {
        status: true, // Assuming 'status' true means finished
      },
    });

    return order;
  }
}

export { FinishOrderService };