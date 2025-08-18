import prismaClient from "../../prisma";

interface DetailRequest {
    orderId: string;
}

class DetailOrderService {
    async execute({ orderId }: DetailRequest) {

        const orders = await prismaClient.item.findMany({
            where: {
                order_Id: orderId, // <-- CORRIGIDO AQUI!
            },
            include: { 
                product: true,
                order: true,
            }
        });

        return orders;
    }
}

export { DetailOrderService };