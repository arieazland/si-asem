const Express = require("express");
const Router = Express.Router();
const soalController = require("../controllers/soal");

/** Router */
Router.post('/register', soalController.register);
Router.post('/edit', soalController.edit);
Router.post('/delete', soalController.delete);

module.exports = Router;