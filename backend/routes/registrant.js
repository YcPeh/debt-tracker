import express from 'express';
import { authRegistrant, registerRegistrant, logOutRegistrant, getRegistrantProfile, updateRegistrantProfile } from '../controller/registrantController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/registrant').post(registerRegistrant);
router.route('/registrant/auth').post(authRegistrant);
router.route('/registrant/logout').post(logOutRegistrant);
router.route('/registrant/profile').get(protect, getRegistrantProfile).put(protect, updateRegistrantProfile);

export default router;