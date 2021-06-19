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
        /** jika sudah login di arahkan ke index */
        res.redirect('/');
    } else {
        /** jika belum login di arahkan ke page login */
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
            /** login page di arahkan ke page user */
            res.render("indexmahasiswa",{
                username, nama, idu
            });
        } else if(tipe === 'psikolog'){
            /** login page di arahkan ke page psikolog */
            res.render("indexpsikolog",{
                username, nama, idu
            });
        } else if(tipe === 'admin'){
            /** login page di arahkan ke page admin */
            res.render("index",{
                username, nama, idu
            });
        }
    } else {
        /** di redirect ke login */
        res.redirect('/login');
    }
});

Router.get('/users', (req, res) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        if(tipe == 'admin'){
            let res1 = res;
            url =  MAIN_URL + '/userlist';
            axios.get(url)
            .then(function (res) {
                var users = res.data;
                /** render page users */
                res1.render('users', {
                    username, nama, idu,
                    data: users.data
                })
            })
            .catch(function (err) {
                // console.log(err);
                var message = err.response.data.message;
                req.session.sessionFlash = {
                    type: 'error',
                    message: message
                }
                res1.redirect("/users");
            })
        } else {
            /** di redirect ke login dengan status unauthorized */
            req.session.sessionFlash = {
                type: 'error',
                message: 'Un-Authorized'
            }
            res.redirect("/login");
        }
    } else {
        /** di redirect ke login */
        res.redirect("/login");
    }
});

/** Router for logout */
Router.get('/logout', (req, res) =>{
    req.session.destroy((err) => {
        res.redirect("/login");
    })
})

module.exports = Router;