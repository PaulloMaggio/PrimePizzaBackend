import { Request, Response } from "express";  
import { AuthUserServer } from "../../services/user/AuthUserServer";

class AuthUserController {
    async handle(request: Request, response: Response) {
        const { email, password } = request.body;

        const authUserServer = new AuthUserServer();

        const auth = await authUserServer.execute({
            email,
            password
        })

        return response.json(auth);
    }
}

export { AuthUserController };