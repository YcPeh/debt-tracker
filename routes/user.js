const express = require('express');
const router = express.Router();
const {getUser, addUser, deleteUser, updateUser} = require('../controller/userController');

// router.get('/',(req,res) => res.send('hahahaaa'));

router.route('/').get(getUser).post(addUser);
router.route('/:customId').delete(deleteUser).put(updateUser);

module.exports = router;