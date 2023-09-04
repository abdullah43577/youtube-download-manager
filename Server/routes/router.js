const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.get('/', authController.welcome_get);

model.exports = router;
