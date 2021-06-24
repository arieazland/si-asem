const Express = require("express");
const Router = Express.Router();
const kesimpulanprodiController = require("../controllers/kesimpulanprodi");

/** Router */
Router.post('/register', kesimpulanprodiController.register);
Router.post('/edit', kesimpulanprodiController.edit);
Router.post('/delete', kesimpulanprodiController.delete);

module.exports = Router;