const Express = require("express");
const axios = require('axios');
const Router = Express.Router();
const MAIN_URL = require ("../urlconfig.js");
const Moment = require("moment");

require("moment/locale/id");  // without this line it didn't work
Moment.locale('id');

/** Route for Login */
Router.get('/login', (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/');
    } else {
        res.render("login");
    }
});

/** Route for Home */
Router.get('/', (req, res) => {
    if(req.session.loggedIn){
        // idu = req.session.iduser
        // username = req.session.username
        // nama = req.session.nama
        // tipe = req.session.type
        // if(tipe === 'peserta' || tipe === 'peserta_event'){
        //     /** login page di arhkan ke page user */
        //     res.render("indexuser",{
        //         username, nama, idu
        //     });
        // } else if(tipe === 'psikologis'){
        //     /** login page di arhkan ke page psikolog */
        //     res.render("listsoalpsikolog",{
        //         username, nama, idu
        //     });
        // } else if(tipe === 'admin'){
        //     /** login page di arhkan ke page admin */
        //     res.render("index",{
        //         username, nama, idu
        //     });
        // }

        
    } else {
        res.redirect('/login');
    }
});



module.exports = Router;