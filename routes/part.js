const Express = require("express");
const Router = Express.Router();
const partController = require("../controllers/part");

/** Router */
Router.post('/register', partController.register);
Router.post('/edit', partController.edit);
Router.post('/delete', partController.delete);

module.exports = Router;