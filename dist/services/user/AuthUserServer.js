"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserServer = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");

class AuthUserServer {
    async execute({ email, password }) {
        const user = await prisma_1.default.user.findFirst({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new Error("User or password incorrect");
        }

        const passwordMatch = await (0, bcryptjs_1.compare)(password, user.password);

        if (!passwordMatch) {
            throw new Error("User or password incorrect");
        }

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("JWT_SECRET não está definido nas variáveis de ambiente.");
        }

        const token = (0, jsonwebtoken_1.sign)({
            name: user.name,
            email: user.email
        }, secret, {
            subject: user.id,
            expiresIn: "1d"
        });

        return { token };
    }
}
exports.AuthUserServer = AuthUserServer;