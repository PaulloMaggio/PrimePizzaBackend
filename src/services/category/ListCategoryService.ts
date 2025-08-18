import prismaClient from "../../prisma";

class ListCategoryService {
    async execute() {

        const category = await prismaClient.category.findMany({
            select: {
                id: true,
                name: true
            }
        });

        return category; // Retorna a lista de categorias
      
    }
}

export { ListCategoryService };