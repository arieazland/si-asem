const Express = require("express");
const Router = Express.Router();
const kesimpulanController = require("../controllers/kesimpulan");

/** Router */
Router.post('/register', kesimpulanController.register);
Router.post('/edit', kesimpulanController.edit);
Router.post('/delete', kesimpulanController.delete);

module.exports = Router;