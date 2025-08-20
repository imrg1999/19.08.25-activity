import express from 'express';
import { showAllUsers, createNewUser, findUserById } from '../Controller/userController.js';

const router = express.Router();

router.get('/users',showAllUsers);
router.post('/new-entry',createNewUser);
router.get('/users/:id',findUserById);




export default router;