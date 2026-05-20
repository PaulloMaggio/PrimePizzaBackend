import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
    sub: string;
}

export function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authtoken = request.headers.authorization;

    if (!authtoken) {
        return response.status(401).end();
    }

    const [, token] = authtoken.split(" ");

    try {
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            console.error("Erro: JWT_SECRET não está definido nas variáveis de ambiente.");
            return response.status(500).json({ error: "Erro interno no servidor: chave de autenticação ausente." });
        }

        const { sub } = verify(
            token,
            secret
        ) as Payload;

        request.user_id = sub;

        return next();

    } catch (err) {
        console.error("Erro na validação do token:", err);
        return response.status(401).end();
    }
}