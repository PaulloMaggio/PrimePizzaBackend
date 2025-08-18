import prismaClient from "../../prisma"

interface ItemRequest {
    orderId: string;
    productId: string;
    amount: number;
}

class AddItemService {
    async execute({ orderId, productId, amount }: ItemRequest) {

        const order = await prismaClient.item.create({
            data: {
                order_Id: orderId,
                product_Id: productId,
                amount: amount
            }
        });

        return order; // Retorna o item adicionado ao pedido

    }
}

export { AddItemService };