const { Router } = require('express');
const authController = require('../controller/authController');

const router = Router();

router.get('/', authController.welcome_get);
router.post('/register', authController.register_post);
router.post('/login', authController.login_post);
router.post('/download', authController.download_api_post);

module.exports = router;
