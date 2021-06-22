const Express = require("express");
const Router = Express.Router();
const assessmentController = require("../controllers/assessment");

/** Router */
Router.post('/register1', assessmentController.registerSatu);
Router.post('/register2', assessmentController.registerDua);
Router.post('/register3', assessmentController.registerTiga);
Router.post('/register4', assessmentController.registerEmpat);
Router.post('/register5', assessmentController.registerLima);
// Router.post('/edit', assessmentController.edit);
// Router.post('/delete', assessmentController.delete);

module.exports = Router;