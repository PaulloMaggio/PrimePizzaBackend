import prismaClient from "../../prisma";
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

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("JWT_SECRET não está definido nas variáveis de ambiente.");
        }

        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            secret,
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );

        return { token };
    }
}

export { AuthUserServer };