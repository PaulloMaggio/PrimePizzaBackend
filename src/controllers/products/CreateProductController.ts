import { Request, Response } from 'express';
import { CreateProductService } from '../../services/product/CreateProductService';
import { UploadedFile } from 'express-fileupload';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

class CreateProductController {
    async handle(request: Request, response: Response) {
        const { name, price, description, category_id } = request.body;

        if (!request.files || Array.isArray(request.files)) {
            throw new Error("Erro: nenhuma imagem enviada ou formato de arquivo inválido");
        }

        const fileField = request.files.banner;

        if (!fileField) {
            throw new Error("Erro: campo 'banner' não encontrado no upload");
        }

        const file: UploadedFile = Array.isArray(fileField)
            ? (fileField[0] as unknown as UploadedFile)
            : (fileField as unknown as UploadedFile);

        const resultFile: UploadApiResponse = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({}, (error, result) => {
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

        const createProductService = new CreateProductService();

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

export { CreateProductController };