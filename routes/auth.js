const Express = require("express");
const Router = Express.Router();
const authController = require("../controllers/auth");

/** Router */
Router.post('/login', authController.login);
Router.post('/register', authController.register);
Router.post('/registermahasiswa', authController.regMahasiswa);
Router.post('/edit', authController.edit);
Router.post('/delete', authController.delete);
Router.post('/resetpassword', authController.resetPass);
Router.post('/adminresetpassword', authController.adminresetPass);

module.exports = Router;