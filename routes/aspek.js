const Express = require("express");
const Router = Express.Router();
const aspekController = require("../controllers/aspek");

/** Router */
Router.post('/register', aspekController.register);
Router.post('/edit', aspekController.edit);
Router.post('/delete', aspekController.delete);

module.exports = Router;