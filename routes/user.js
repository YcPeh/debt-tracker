const express = require('express');
const router = express.Router();
const {getUser, addUser, deleteUser} = require('../controller/userController');

// router.get('/',(req,res) => res.send('hahahaaa'));

router.route('/').get(getUser).post(addUser);
router.route('/:id').delete(deleteUser);

module.exports = router;