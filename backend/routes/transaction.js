
import express from 'express';
const router = express.Router();
import {addTransaction, deleteTransaction, getTransaction, updateTransaction} from '../controller/transactionController.js';


router.route('/userTransaction').get(getTransaction).post(addTransaction);
router.route('/userTransaction/:idFromFrontEnd').delete(deleteTransaction).put(updateTransaction);

export default router;