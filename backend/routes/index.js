/* === IMPORT === */
import express from "express";
import {getUsers, Register, Login, Logout} from "../controllers/Users.js" ;
import {getProducts, getProductById, createProduct, updateProduct, deleteProduct} from "../controllers/ProductController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router(); // express router

router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', createProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;