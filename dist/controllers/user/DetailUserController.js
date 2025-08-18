"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailUserController = void 0;
const DetailUserService_1 = require("../../services/user/DetailUserService");
class DetailUserController {
    async handle(request, response) {
        const user_id = request.user_id;
        const detailUserService = new DetailUserService_1.DetailUserService();
        const user = await detailUserService.execute(user_id);
        return response.json(user);
    }
}
exports.DetailUserController = DetailUserController;
