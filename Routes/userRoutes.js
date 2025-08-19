import express from 'express';
import { showAllUsers } from '../Controller/userController.js';

const router = express.Router();

router.get('/users',showAllUsers);



export default router;