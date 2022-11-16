const router = require('express').Router();

const authController = require('../controllers/authControllers');
const tryCatch = require('../middlewares/tryCatch');
const errorHandller = require('../middlewares/errorHandller');
const permission = require('../middlewares/Permission');


router.post('/login', permission.authPermission, tryCatch(authController.login));
router.post('/register', permission.authPermission, tryCatch(authController.register));
router.post('/add-Livreur', permission.userPermission, tryCatch(authController.addLivreur));
router.get('/verify-email/:token', tryCatch(authController.verifyEmail));
router.post('/reset-password', permission.userPermission, tryCatch(authController.resetPassword));
router.post('/forget-password', permission.authPermission, tryCatch(authController.forgetPassword));
router.get('/verify-forget-password/:token', permission.authPermission, tryCatch(authController.verifyForgetPassword));
router.post('/form-forget-password', permission.authPermission, tryCatch(authController.formForgetPassword));
router.get('/logout',permission.userPermission, tryCatch(authController.logout));

router.use(errorHandller);


module.exports = router;