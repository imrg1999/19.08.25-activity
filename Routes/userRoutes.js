import express from 'express';
import { showAllUsers, createNewUser } from '../Controller/userController.js';

const router = express.Router();

router.get('/users',showAllUsers);
router.post('/new-entry',createNewUser);




export default router;