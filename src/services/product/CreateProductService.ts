import prismaClient from "../../prisma";

interface ProductRequest {
    name: string;
    price: string;
    description: string;
    banner: string;
    category_Id: string;
}

class CreateProductService {
    async execute({ name, price, description, banner, category_Id }: ProductRequest) {
        if (!name || name.trim() === "") {
            throw new Error("O campo 'name' é obrigatório e não pode estar vazio");
        }
        if (!price || price.trim() === "") {
            throw new Error("O campo 'price' é obrigatório e não pode estar vazio");
        }
        if (!description || description.trim() === "") {
            throw new Error("O campo 'description' é obrigatório e não pode estar vazio");
        }
        if (!banner || banner.trim() === "") {
            throw new Error("O campo 'banner' é obrigatório e não pode estar vazio");
        }
        if (!category_Id || category_Id.trim() === "") {
            throw new Error("O campo 'category_Id' é obrigatório e não pode estar vazio");
        }

        const priceAsNumber = parseFloat(price);
        if (isNaN(priceAsNumber)) {
            throw new Error("O campo 'price' deve ser um número válido");
        }

        const product = await prismaClient.product.create({
            data: {
                name,
                price: String(priceAsNumber),
                description,
                banner,
                category_Id,
            }
        });

        return product;
    }
}

export { CreateProductService };