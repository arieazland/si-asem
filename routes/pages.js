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

/** Route for Register Mahasiswa */
Router.get('/registermahasiswa', (req, res) => {
    res.render("registerMahasiswa");
});

/** Route for Home */
Router.get('/', (req, res) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        if(tipe === 'mahasiswa'){
            /** login page di arhkan ke page user */
            res.render("indexmahasiswa",{
                username, nama, idu
            });
        } else if(tipe === 'psikolog'){
            /** login page di arhkan ke page psikolog */
            res.render("indexpsikolog",{
                username, nama, idu
            });
        } else if(tipe === 'admin'){
            /** login page di arhkan ke page admin */
            res.render("index",{
                username, nama, idu
            });
        }
    } else {
        res.redirect('/login');
    }
});

Router.get('/users', (req, res) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        if(tipe === 'admin'){
            /** render page users */
            res.render("users",{
                username, nama, idu
            });
        } else {
            /** di redirect ke login dengan status unauthorized */
            req.session.sessionFlash = {
                type: 'error',
                message: 'Un-Authorized'
            }
            res.redirect('/login');
        }
    }
});


/** Router for logout */
Router.get('/logout', (req, res) =>{
    req.session.destroy((err) => {
        res.redirect("/login");
    })
})

module.exports = Router;