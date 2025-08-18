"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
function isAuthenticated(request, response, next) {
    const authtoken = request.headers.authorization;
    if (!authtoken) {
        return response.status(401).end();
    }
    const [, token] = authtoken.split(" ");
    try {
        // --- INÍCIO DA CORREÇÃO ---
        const secret = process.env.JWT_SECRET;
        // Adicione esta verificação para garantir que a chave secreta esteja definida
        if (!secret) {
            console.error("Erro: JWT_SECRET não está definido nas variáveis de ambiente.");
            return response.status(500).json({ error: "Erro interno no servidor: chave de autenticação ausente." });
        }
        // --- FIM DA CORREÇÃO ---
        const { sub } = (0, jsonwebtoken_1.verify)(token, secret // Use 'secret' que agora é garantido como string
        );
        // Opcional: Anexar o user_id ao objeto request para uso em rotas posteriores
        request.user_id = sub; // Certifique-se de que sua declaração de tipo Express está correta para 'user_id'
        return next();
    }
    catch (err) {
        console.error("Erro na validação do token:", err);
        return response.status(401).end(); // Retorne 401 para token inválido
    }
}
