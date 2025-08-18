"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserController = void 0;
const AuthUserServer_1 = require("../../services/user/AuthUserServer");
class AuthUserController {
    async handle(request, response) {
        const { email, password } = request.body;
        const authUserServer = new AuthUserServer_1.AuthUserServer();
        const auth = await authUserServer.execute({
            email,
            password
        });
        return response.json(auth);
    }
}
exports.AuthUserController = AuthUserController;
