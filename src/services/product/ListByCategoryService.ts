import prismaClient from "../../prisma";    

interface ProductRequest{
    category_Id: string;
}

class ListByCategoryService {
    async execute({category_Id}: ProductRequest) {

        const findByCategory = await prismaClient.product.findMany({
            where: {
                category_Id: category_Id
            },
            orderBy: {
                created_at: 'desc'
            }
        });

        return findByCategory;

    }
}
          
export { ListByCategoryService };