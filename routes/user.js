const express = require('express');
const router = express.Router();
const {getUser, addUser, deleteUser, updateUserName, updateUserPhoto} = require('../controller/userController');

// router.get('/',(req,res) => res.send('hahahaaa'));

router.route('/').get(getUser).post(addUser);
router.route('/:idFromFrontEnd').delete(deleteUser).put(updateUserName);
router.route('/:idFromFrontEnd/userPhoto').put(updateUserPhoto);


module.exports = router;