import prismaClient from "../../prisma";

// Define a interface para os dados esperados na requisição de criação de produto.
interface ProductRequest {
    name: string;
    price: string; // Mantido como string aqui, pois é como chega da requisição.
    description: string;
    banner: string;
    category_Id: string; // 'category_Id' (MAIÚSCULO) para consistência com o Prisma
}

class CreateProductService {
    async execute({ name, price, description, banner, category_Id }: ProductRequest) {
        // Validação dos campos obrigatórios. Lança um erro se algum campo estiver ausente ou vazio.
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
        // Valida o campo 'category_Id'.
        if (!category_Id || category_Id.trim() === "") {
            throw new Error("O campo 'category_Id' é obrigatório e não pode estar vazio");
        }

        // Converte o preço de string para número (float) e valida se a conversão foi bem-sucedida.
        const priceAsNumber = parseFloat(price);
        if (isNaN(priceAsNumber)) {
            throw new Error("O campo 'price' deve ser um número válido");
        }

        // Loga os dados que serão enviados ao Prisma para depuração.
        console.log("Dados enviados ao Prisma:", { name, price: priceAsNumber, description, banner, category_Id });

        // Cria o produto no banco de dados usando o Prisma.
        const product = await prismaClient.product.create({
            data: {
                name,
                price: String(priceAsNumber), // <-- CORREÇÃO: Converte o número de volta para string
                description,
                banner,
                category_Id, // 'category_Id' (MAIÚSCULO) para corresponder ao schema do Prisma
            }
        });

        // Retorna o produto criado.
        return product;
    }
}

export { CreateProductService };