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

/** Route for dashboard */
Router.get('/', async (req, res) => {
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

/** Route for users */
Router.get('/users', async (req, res, dataputs) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        if(tipe == 'admin'){
            let res1 = res;
            url =  MAIN_URL + '/userlist';
            dataputs = await axios.get(url)
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

/** Route for acara */
Router.get('/acara', async (req, res, dataputs) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        if(tipe == 'admin'){
            let res1 = res;
            url =  MAIN_URL + '/acaralist';
            dataputs = await axios.get(url)
            .then(function (res) {
                var acara = res.data;
                /** render page acara */
                res1.render('acara', {
                    username, nama, idu,
                    data: acara.data
                })
            })
            .catch(function (err) {
                // console.log(err);
                var message = err.response.data.message;
                req.session.sessionFlash = {
                    type: 'error',
                    message: message
                }
                res1.redirect("/acara");
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

/** Route for partisipan */
Router.get('/partisipan', async (req, res, dataputs) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        if(tipe == 'admin'){
            if(req.session.idacara != null){
                /** get data acara berdasarkan id yang di pilih */
                params = {
                    selectacara: req.session.idacara,
                }
                let res1 = res;
                url =  MAIN_URL + '/partisipant';
                var dataputs = await axios.post(url, params)
                .then(function (res) {
                    req.session.sessionFlash2 = {
                        type: 'success',
                        message: 'User berhasil didaftarkan'
                    }
                    var partisipant = res.data.results;
                    var dataacara = res.data.acara;
                    var pilihacara = res.data.pilihacara;
                    var psikolog = res.data.psikolog;
                    var selectacara = res.data.selectacara;
                    res1.render('partisipant', {
                        partisipant: partisipant,
                        dataacara: dataacara,
                        pilihacara: pilihacara,
                        psikolog: psikolog,
                        selectacara: selectacara
                    })
                    req.session.idacara = null
                })
                .catch(function (err) {
                    // console.log(err.response.data)
                    // var message = err.response.data.message;
                    req.session.sessionFlash = {
                        type: 'error',
                        message: 'Error, please contact developer'
                    }
                    res1.redirect("/partisipant");
                    req.session.idkonsul = null
                })
            } else {
                let res1 = res;
                url =  MAIN_URL + '/acaralist';
                dataputs = await axios.get(url)
                .then(function (res) {
                    var acara = res.data;
                    /** render page partisipan */
                    res1.render('partisipan', {
                        username, nama, idu,
                        dataacara: acara.data
                    })
                })
                .catch(function (err) {
                    // console.log(err);
                    var message = err.response.data.message;
                    req.session.sessionFlash = {
                        type: 'error',
                        message: message
                    }
                    res1.redirect("/partisipan");
                })
            }
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

Router.post('/partisipan', async (req, res, dataputs) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        if(tipe == 'admin'){
            const { selectacara } = req.body;

            if( selectacara ){
                if(selectacara == "-- Pilih Acara --"){
                    req.session.sessionFlash = {
                        type: 'error',
                        message: 'Harap pilih acara terlebih dahulu!'
                    }
                    res.redirect("/partisipan");
                } else {
                    /** get data acara berdasarkan id yang di pilih */
                    params = {
                        selectacara: selectacara,
                    }
                    let res1 = res;
                    url =  MAIN_URL + '/partisipant';
                    var dataputs = await axios.post(url, params)
                    .then(function (res) {
                        var partisipant = res.data.results;
                        var dataacara = res.data.acara;
                        var pilihacara = res.data.pilihacara;
                        var psikolog = res.data.psikolog;
                        var selectacara = res.data.selectacara;
                        res1.render('partisipan', {
                            partisipant: partisipant,
                            dataacara: dataacara,
                            pilihacara: pilihacara,
                            psikolog: psikolog,
                            selectacara: selectacara
                        })
                    })
                    .catch(function (err) {
                        // console.log(err.response.data)
                        var message = err.response.data.message;
                        req.session.sessionFlash = {
                            type: 'error',
                            message: message
                        }
                        res1.redirect("/partisipan");
                    })
                }
            } else {
                /** field id acara kosong */
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Field tidak boleh kosong'
                }
                res.redirect("/partisipan");
            }
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