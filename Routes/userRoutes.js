import express from 'express';
import { showAllUsers, 
    createNewUser, 
    findUserById, 
    updateUsers,
 deleteUser } from '../Controller/userController.js';

const router = express.Router();

router.get('/users',showAllUsers);
router.post('/new-entry',createNewUser);
router.get('/users/:id',findUserById);
router.put('/update/:id',updateUsers);
router.delete('/remove/:id',deleteUser);




export default router;