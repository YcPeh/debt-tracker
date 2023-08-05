import express from 'express';
import { authRegistrant, registerRegistrant, logOutRegistrant, getRegistrantProfile, updateRegistrantProfile } from '../controller/registrantController.js';
const router = express.Router();

router.route('/registrant').post(registerRegistrant);
router.route('/registrant/auth').post(authRegistrant);
router.route('/registrant/logout').post(logOutRegistrant);
router.route('/registrant/profile').get(getRegistrantProfile).put(updateRegistrantProfile);

export default router;