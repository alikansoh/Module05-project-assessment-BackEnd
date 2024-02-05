// orderRoutes.js
import express from 'express';
import { createOrder, getOrderByUser } from '../Controllers/Order.js';

const router = express.Router();


router.post('/order', createOrder);

router.get('/order', getOrderByUser);

export default router;