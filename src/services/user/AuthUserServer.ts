import prismaClient from "../../prisma"; // Importação do Prisma (assumindo que '../../prisma' exporta o client)
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
    email: string;
    password: string;
}

class AuthUserServer {
    async execute({ email, password }: AuthRequest) {
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new Error("User or password incorrect");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("User or password incorrect");
        }

        // --- INÍCIO DA CORREÇÃO ---
        const secret = process.env.JWT_SECRET;

        // Adicione esta verificação para garantir que a chave secreta esteja definida
        if (!secret) {
            throw new Error("JWT_SECRET não está definido nas variáveis de ambiente.");
        }
        // --- FIM DA CORREÇÃO ---

        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            secret, // Use 'secret' que agora é garantido como string
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );

        return { token }; // Adicione um retorno para que a função seja útil
    }
}

export { AuthUserServer };