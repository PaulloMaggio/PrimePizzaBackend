"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductController = void 0;
const CreateProductService_1 = require("../../services/product/CreateProductService");
const cloudinary_1 = require("cloudinary");
// Configuração do Cloudinary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
class CreateProductController {
    async handle(request, response) {
        // Desestrutura os campos de texto do corpo da requisição
        const { name, price, description, category_id } = request.body;
        // Loga os dados recebidos para depuração
        console.log("request.body:", request.body);
        console.log("request.files:", request.files);
        // Garante que request.files existe e que é um objeto de arquivos
        if (!request.files || Array.isArray(request.files)) {
            throw new Error("Erro: nenhuma imagem enviada ou formato de arquivo inválido");
        }
        // Acessa o arquivo 'banner' de forma segura
        const fileField = request.files.banner;
        if (!fileField) {
            throw new Error("Erro: campo 'banner' não encontrado no upload");
        }
        // Garante que fileField é um UploadedFile (e não um array, caso múltiplos arquivos tenham sido enviados)
        const file = Array.isArray(fileField)
            ? fileField[0] // Casting duplo para o primeiro item do array
            : fileField; // Casting duplo para o arquivo único
        // Faz o upload para o Cloudinary
        const resultFile = await new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader.upload_stream({}, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (!result) {
                    reject(new Error("Erro: resultado do Cloudinary não retornado"));
                    return;
                }
                resolve(result);
            }).end(file.data);
        });
        // Extrai a URL da imagem do Cloudinary
        const banner = resultFile.secure_url;
        // Loga os dados que serão passados para o serviço
        console.log("Dados para o serviço:", { name, price, description, banner, category_Id: category_id });
        // Instancia o serviço de criação de produto
        const createProductService = new CreateProductService_1.CreateProductService();
        // Executa o serviço com os dados, incluindo a URL do banner
        const product = await createProductService.execute({
            name,
            price,
            description,
            banner: resultFile.url,
            category_Id: category_id
        });
        // Retorna o produto criado
        return response.json(product);
    }
}
exports.CreateProductController = CreateProductController;
