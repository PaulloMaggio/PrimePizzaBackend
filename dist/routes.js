"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const CreateCategoryController_1 = require("./controllers/user/category/CreateCategoryController");
const ListCategoryController_1 = require("./controllers/user/category/ListCategoryController");
const CreateProductController_1 = require("./controllers/products/CreateProductController");
const ListByCategoryController_1 = require("./controllers/products/ListByCategoryController");
const CreateOrderController_1 = require("./controllers/order/CreateOrderController");
const RemoveOrderController_1 = require("./controllers/order/RemoveOrderController");
const AddItemController_1 = require("./controllers/order/AddItemController");
const RemoveItemController_1 = require("./controllers/order/RemoveItemController");
const SendOrderController_1 = require("./controllers/order/SendOrderController");
const ListOrdersController_1 = require("./controllers/order/ListOrdersController");
const DetailsOrdersController_1 = require("./controllers/order/DetailsOrdersController");
const FinishOrderContoller_1 = require("./controllers/order/FinishOrderContoller");
const isAuthenticated_1 = require("./midlewares/isAuthenticated");
const multer_2 = __importDefault(require("./config/multer"));
const router = (0, express_1.Router)();
exports.router = router;
// Configura o Multer para salvar arquivos temporariamente
const upload = (0, multer_1.default)(multer_2.default.upload("./tmp"));
//--Rotas User --
router.post('/users', new CreateUserController_1.CreateUserController().handle);
router.post('/session', new AuthUserController_1.AuthUserController().handle);
router.get('/me', isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle);
//--Rotas Category--
router.post('/category', isAuthenticated_1.isAuthenticated, new CreateCategoryController_1.CreateCategoryController().handle);
router.get('/category', isAuthenticated_1.isAuthenticated, new ListCategoryController_1.ListCategoryController().handle);
//--Rotas Product--
// AQUI ESTÁ A CORREÇÃO CRÍTICA: 'upload.single('banner')'
// O nome 'banner' agora corresponde ao nome do campo que o frontend envia para a imagem.
//router.post('/product', isAuthenticated, upload.single('banner'), new CreateProductController().handle);
router.post('/product', isAuthenticated_1.isAuthenticated, new CreateProductController_1.CreateProductController().handle);
router.get('/category/product', isAuthenticated_1.isAuthenticated, new ListByCategoryController_1.ListByCategoryController().handle);
//--Rotas Order--
router.post('/order', isAuthenticated_1.isAuthenticated, new CreateOrderController_1.CreateOrderController().handle);
router.delete('/order', isAuthenticated_1.isAuthenticated, new RemoveOrderController_1.RemoveOrderController().handle); // Assuming you have a RemoveOrderController
router.post('/order/add', isAuthenticated_1.isAuthenticated, new AddItemController_1.AddItemController().handle); // Adding item to order
router.delete('/order/remove', isAuthenticated_1.isAuthenticated, new RemoveItemController_1.RemoveItemController().handle); // Removing item from order
router.put('/order/send', isAuthenticated_1.isAuthenticated, new SendOrderController_1.SendOrderController().handle); // Sending order
router.get('/orders', isAuthenticated_1.isAuthenticated, new ListOrdersController_1.ListOrdersController().handle); // Listing orders
router.get('/order/detail', isAuthenticated_1.isAuthenticated, new DetailsOrdersController_1.DetailsOrdersController().handle); // Order details
router.put('/order/finish', isAuthenticated_1.isAuthenticated, new FinishOrderContoller_1.FinishOrderController().handle); // Finishing order
