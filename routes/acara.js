const Express = require("express");
const Router = Express.Router();
const acaraController = require("../controllers/acara");

/** Router */
Router.post('/register', acaraController.register);
Router.post('/edit', acaraController.edit);
Router.post('/delete', acaraController.delete);

module.exports = Router;