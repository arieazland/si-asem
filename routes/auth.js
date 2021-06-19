const Express = require("express");
const Router = Express.Router();
const authController = require("../controllers/auth");

/** Router */
Router.post('/login', authController.login);
Router.post('/registermahasiswa', authController.regMahasiswa);
Router.post('/edit', authController.edit);
Router.post('/delete', authController.delete);

module.exports = Router;