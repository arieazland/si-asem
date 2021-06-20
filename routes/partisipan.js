const Express = require("express");
const Router = Express.Router();
const partisipanController = require("../controllers/partisipan");

/** Router */
Router.post('/register', partisipanController.register);
Router.post('/delete', partisipanController.delete);

module.exports = Router;