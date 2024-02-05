import express from 'express';
import * as Admin from '../Controllers/Admin.js';
import { requireAuth } from '../Middlewares/Jwt.js'
import { verifyOwner } from '../Middlewares/Jwt.js';
import { verifyRegister } from '../Middlewares/Jwt.js';

const router = express.Router();

// Public routes
router.post('/register', Admin.register);
router.post('/login', Admin.login);

// Protected routes (require authentication)
// router.use(requireAuth);
router.get('/', Admin.getAdmins);
router.get('/:id', Admin.getAdmin);
router.put('/:id', Admin.updateAdmin);
router.delete('/:id', Admin.deleteAdmin);

export default router;