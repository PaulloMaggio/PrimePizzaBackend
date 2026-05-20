"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductController = void 0;
const CreateProductService_1 = require("../../services/product/CreateProductService");
const cloudinary_1 = require("cloudinary");

cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

class CreateProductController {
    async handle(request, response) {
        const { name, price, description, category_id } = request.body;

        if (!request.files || Array.isArray(request.files)) {
            throw new Error("Erro: nenhuma imagem enviada ou formato de arquivo inválido");
        }

        const fileField = request.files.banner;
        if (!fileField) {
            throw new Error("Erro: campo 'banner' não encontrado no upload");
        }

        const file = Array.isArray(fileField) ? fileField[0] : fileField;

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

        const createProductService = new CreateProductService_1.CreateProductService();
        const product = await createProductService.execute({
            name,
            price,
            description,
            banner: resultFile.secure_url,
            category_Id: category_id
        });

        return response.json(product);
    }
}
exports.CreateProductController = CreateProductController;