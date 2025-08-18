import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';


import { CreateCategoryController } from './controllers/user/category/CreateCategoryController';
import { ListCategoryController } from './controllers/user/category/ListCategoryController';

import { CreateProductController } from './controllers/products/CreateProductController';
import { ListByCategoryController } from './controllers/products/ListByCategoryController';

import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';

import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';
import { SendOrderController } from './controllers/order/SendOrderController';
import {ListOrdersController} from './controllers/order/ListOrdersController';
import { DetailsOrdersController } from './controllers/order/DetailsOrdersController';
import { FinishOrderController } from './controllers/order/FinishOrderContoller';

import { isAuthenticated } from './midlewares/isAuthenticated';

import uploadConfig from './config/multer';

const router = Router();

// Configura o Multer para salvar arquivos temporariamente
const upload = multer(uploadConfig.upload("./tmp"));

//--Rotas User --
router.post('/users', new CreateUserController().handle);

router.post('/session', new AuthUserController().handle);

router.get('/me', isAuthenticated, new DetailUserController().handle);


//--Rotas Category--
router.post('/category', isAuthenticated, new CreateCategoryController().handle);

router.get('/category', isAuthenticated, new ListCategoryController().handle);


//--Rotas Product--
// AQUI ESTÁ A CORREÇÃO CRÍTICA: 'upload.single('banner')'
// O nome 'banner' agora corresponde ao nome do campo que o frontend envia para a imagem.

//router.post('/product', isAuthenticated, upload.single('banner'), new CreateProductController().handle);
router.post('/product', isAuthenticated, new CreateProductController().handle);
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle);


//--Rotas Order--
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.delete('/order', isAuthenticated, new RemoveOrderController().handle); // Assuming you have a RemoveOrderController

router.post('/order/add', isAuthenticated, new AddItemController().handle); // Adding item to order
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle); // Removing item from order
router.put('/order/send', isAuthenticated, new SendOrderController().handle); // Sending order
router.get('/orders', isAuthenticated, new ListOrdersController().handle); // Listing orders
router.get('/order/detail', isAuthenticated, new DetailsOrdersController().handle); // Order details
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle); // Finishing order

export { router };
