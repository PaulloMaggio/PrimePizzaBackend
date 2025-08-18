import prismaClient from "../../prisma";    

interface ItemRequest {
    productId: string;
}

class RemoveItemService {
    async execute(productId: string): Promise<ItemRequest>{

        const order = await prismaClient.item.delete({
            where: {
                id: productId
            }
        })
        return { productId: order.product_Id }; // Retorna o productId do item removido do pedido
    }
}

export { RemoveItemService };