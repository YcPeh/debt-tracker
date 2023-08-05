// const express = require('express');
// const router = express.Router();
// const {getUser, addUser, deleteUser, updateUserName, updateUserPhoto} = require('../controller/userController');
// const { addTransaction, deleteTransaction, getTransaction, updateTransaction } = require('../controller/transactionController');

import express from 'express';
const router = express.Router();
import {getUser, addUser, deleteUser, updateUserName, updateUserPhoto} from '../controller/userController.js';
import {addTransaction, deleteTransaction, getTransaction, updateTransaction} from '../controller/transactionController.js';

// router.get('/',(req,res) => res.send('hahahaaa'));

router.route('/').get(getUser).post(addUser);
// router.route('/').get(getUser);
router.route('/:idFromFrontEnd').delete(deleteUser).put(updateUserName);
router.route('/:idFromFrontEnd/userPhoto').put(updateUserPhoto);

router.route('/userTransaction').get(getTransaction).post(addTransaction);
router.route('/userTransaction/:idFromFrontEnd').delete(deleteTransaction).put(updateTransaction);

// module.exports = router;
export default router;