const express = require('express');
const router = express.Router();
const {getUser, addUser, deleteUser, updateUserName, updateUserPhoto} = require('../controller/userController');
const { addTransaction, deleteTransaction, getTransaction } = require('../controller/transactionController');

// router.get('/',(req,res) => res.send('hahahaaa'));

router.route('/').get(getUser).post(addUser);
// router.route('/').get(getUser);
router.route('/:idFromFrontEnd').delete(deleteUser).put(updateUserName);
router.route('/:idFromFrontEnd/userPhoto').put(updateUserPhoto);

router.route('/userTransaction').get(getTransaction).post(addTransaction);
router.route('/userTransaction/:idFromFrontEnd').delete(deleteTransaction);

module.exports = router;