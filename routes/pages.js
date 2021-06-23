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
        fakultas = req.session.fakultas
        prodi = req.session.prodi
        if(tipe === 'mahasiswa'){
            /** login page di arahkan ke page user */
            res.render("indexmahasiswa",{
                username, nama, idu, fakultas, prodi
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
                    var message = res.data.message;
                    req.session.sessionFlash2 = {
                        type: 'success',
                        message: message
                    }
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
                    req.session.idacara = null
                })
                .catch(function (err) {
                    // console.log(err.response.data)
                    // var message = err.response.data.message;
                    req.session.sessionFlash = {
                        type: 'error',
                        message: 'Error, please contact developer'
                    }
                    res1.redirect("/partisipan");
                    req.session.idacara = null
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

/** Route for part */
Router.get('/part', async (req, res, dataputs) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        if(tipe == 'admin'){
            let res1 = res;
            url =  MAIN_URL + '/partlist';
            dataputs = await axios.get(url)
            .then(function (res) {
                var part = res.data;
                /** render page part */
                res1.render('part', {
                    username, nama, idu,
                    data: part.data
                })
            })
            .catch(function (err) {
                // console.log(err);
                var message = err.response.data.message;
                req.session.sessionFlash = {
                    type: 'error',
                    message: message
                }
                res1.redirect("/part");
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

/** Route for aspek */
Router.get('/aspek', async (req, res) =>{
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        if(tipe == 'admin'){
            if(req.session.idpart != null){
                /** get data aspek berdasarkan idpart yang di pilih */
                params = {
                    selectpart: req.session.idpart,
                }
                let res1 = res;
                url =  MAIN_URL + '/listaspek';
                var dataputs = await axios.post(url, params)
                .then(function (res) {
                    var message = res.data.message;
                    var aspek = res.data.results;
                    var datapart = res.data.resultpart;
                    var pilihpart = res.data.resultsidpart;
                    var selectpart = res.data.selectpart;
                    req.session.sessionFlash2 = {
                        type: 'success',
                        message: message
                    }
                    res1.render('aspek', {
                        aspek: aspek,
                        datapart: datapart,
                        pilihpart: pilihpart,
                        selectpart: selectpart
                    })
                    req.session.idpart = null
                })
                .catch(function (err) {
                    // console.log(err.response.data)
                    // var message = err.response.data.message;
                    req.session.sessionFlash = {
                        type: 'error',
                        message: 'Error, please contact developer'
                    }
                    res1.redirect("/aspek");
                    req.session.idpart = null
                })
            } else {
                let res1 = res;
                url =  MAIN_URL + '/partlist';
                dataputs = await axios.get(url)
                .then(function (res) {
                    var part = res.data;
                    /** render page part */
                    res1.render('aspek', {
                        username, nama, idu,
                        datapart: part.data
                    })
                })
                .catch(function (err) {
                    // console.log(err);
                    var message = err.response.data.message;
                    req.session.sessionFlash = {
                        type: 'error',
                        message: message
                    }
                    res1.redirect("/aspek");
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
})

Router.post('/aspek', async (req, res) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        if(tipe == 'admin'){
            try{
                const {selectpart} = req.body;

                if(selectpart){
                    if(selectpart == "-- Pilih Part --"){
                        req.session.sessionFlash = {
                            type: 'error',
                            message: 'Harap pilih part terlebih dahulu!'
                        }
                        res.redirect("/aspek");
                    } else {
                        /** get data acara berdasarkan id yang di pilih */
                        params = {
                            selectpart: selectpart,
                        }
                        let res1 = res;
                        url =  MAIN_URL + '/listaspek';
                        var dataputs = await axios.post(url, params)
                        .then(function (res) {
                            var aspek = res.data.results;
                            var datapart = res.data.resultpart;
                            var pilihpart = res.data.resultsidpart;
                            var selectpart = res.data.selectpart;
                            res1.render('aspek', {
                                aspek: aspek,
                                datapart: datapart,
                                pilihpart: pilihpart,
                                selectpart: selectpart
                            })
                        })
                        .catch(function (err) {
                            // console.log(err.response.data)
                            var message = err.response.data.message;
                            req.session.sessionFlash = {
                                type: 'error',
                                message: message
                            }
                            res1.redirect("/aspek");
                        })
                    }
                } else {
                    /** field kosong */
                    req.session.sessionFlash = {
                        type: 'error',
                        message: 'Field tidak boleh kosong'
                    }
                    res.redirect("/aspek");
                }
            } catch(error) {
                /** send error */
                req.session.sessionFlash = {
                    type: 'error',
                    message: error
                }
                res.redirect("/aspek");
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
})

/** Route for soal */
Router.get('/soal', async (req, res) =>{
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        if(tipe == 'admin'){
            if(req.session.idaspek != null){
                /** get data soal berdasarkan idaspek yang di pilih */
                params = {
                    selectaspek: req.session.idaspek,
                }
                let res1 = res;
                url =  MAIN_URL + '/listsoal';
                var dataputs = await axios.post(url, params)
                .then(function (res) {
                    var message = res.data.message;
                    var soal = res.data.results;
                    var dataaspek = res.data.resultaspek;
                    var pilihaspek = res.data.resultsidaspek;
                    var selectaspek = res.data.selectaspek;
                    req.session.sessionFlash2 = {
                        type: 'success',
                        message: message
                    }
                    res1.render('soal', {
                        idu, nama, username,
                        soal: soal,
                        dataaspek: dataaspek,
                        pilihaspek: pilihaspek,
                        selectaspek: selectaspek
                    })
                    req.session.idaspek = null
                })
                .catch(function (err) {
                    // console.log(err.response.data)
                    // var message = err.response.data.message;
                    req.session.sessionFlash = {
                        type: 'error',
                        message: 'Error, please contact developer'
                    }
                    res1.redirect("/soal");
                    req.session.idpart = null
                })
            } else {
                let res1 = res;
                url =  MAIN_URL + '/listaspekall';
                dataputs = await axios.get(url)
                .then(function (res) {
                    var aspek = res.data;
                    /** render page part */
                    res1.render('soal', {
                        username, nama, idu,
                        dataaspek: aspek.data
                    })
                })
                .catch(function (err) {
                    // console.log(err);
                    var message = err.response.data.message;
                    req.session.sessionFlash = {
                        type: 'error',
                        message: message
                    }
                    res1.redirect("/soal");
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
})

Router.post('/soal', async (req, res) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        if(tipe == 'admin'){
            try{
                const {selectaspek} = req.body;

                if(selectaspek){
                    if(selectaspek == "-- Pilih Aspek --"){
                        req.session.sessionFlash = {
                            type: 'error',
                            message: 'Harap pilih aspek terlebih dahulu!'
                        }
                        res.redirect("/soal");
                    } else {
                        /** get data acara berdasarkan id yang di pilih */
                        params = {
                            selectaspek: selectaspek,
                        }
                        let res1 = res;
                        url =  MAIN_URL + '/listsoal';
                        var dataputs = await axios.post(url, params)
                        .then(function (res) {
                            var message = res.data.message;
                            var soal = res.data.results;
                            var dataaspek = res.data.resultaspek;
                            var pilihaspek = res.data.resultsidaspek;
                            var selectaspek = res.data.selectaspek;
                            req.session.sessionFlash2 = {
                                type: 'success',
                                message: message
                            }
                            res1.render('soal', {
                                idu, nama, username,
                                soal: soal,
                                dataaspek: dataaspek,
                                pilihaspek: pilihaspek,
                                selectaspek: selectaspek
                            })
                        })
                        .catch(function (err) {
                            // console.log(err.response.data)
                            var message = err.response.data.message;
                            req.session.sessionFlash = {
                                type: 'error',
                                message: message
                            }
                            res1.redirect("/soal");
                        })
                    }
                } else {
                    /** field kosong */
                    req.session.sessionFlash = {
                        type: 'error',
                        message: 'Field tidak boleh kosong'
                    }
                    res.redirect("/soal");
                }
            } catch(error) {
                /** send error */
                req.session.sessionFlash = {
                    type: 'error',
                    message: error
                }
                res.redirect("/soal");
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
})

/** Route for assessment mahasiswa */
Router.get('/assessmentmahasiswa', async (req, res, dataputs) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        fakultas = req.session.fakultas
        prodi = req.session.prodi
        if(tipe == 'mahasiswa'){
            if(req.session.idacara != null){
                /** get data acara berdasarkan id yang di pilih */
                params = {
                    selectacara: req.session.idacara,
                    idu: idu,
                }
                let res1 = res;
                url =  MAIN_URL + '/listpertanyaan';
                var dataputs = await axios.post(url, params)
                .then(function (res) {
                    var data = res.data.results;
                    var selectacara = res.data.selectacara;
                    var dataacara = res.data.dataacara;
                    var partpertanyaan = res.data.partpertanyaan;
                    res1.render('assessmentmahasiswa', {
                        idu, username, nama, tipe, fakultas, prodi,
                        data: data,
                        selectacara,
                        dataacara,
                        partpertanyaan
                    })
                })
                .catch(function (err) {
                    // console.log(err.response.data)
                    var message = err.response.data.message;
                    req.session.sessionFlash = {
                        type: 'error',
                        message: message
                    }
                    res1.redirect("/assessmentmahasiswa");
                    req.session.idacara = null
                })
            } else {
                let res1 = res;
                url =  MAIN_URL + '/acaralistmahasiswa';
                dataputs = await axios.get(url)
                .then(function (res) {
                    var acara = res.data;
                    /** render page partisipan */
                    res1.render('assessmentmahasiswa', {
                        username, nama, idu, fakultas, prodi,
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
                    res1.redirect("/assessmentmahasiswa");
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

Router.post('/assessmentmahasiswa', async (req, res, dataputs) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        fakultas = req.session.fakultas
        prodi = req.session.prodi
        if(tipe == 'mahasiswa'){
            const { selectacara } = req.body;
            if( selectacara ){
                if(selectacara == "-- Pilih Acara --"){
                    req.session.sessionFlash = {
                        type: 'error',
                        message: 'Harap pilih acara terlebih dahulu!'
                    }
                    res.redirect("/assessmentmahasiswa");
                } else {
                    /** get data acara berdasarkan id yang di pilih */
                    params = {
                        selectacara: selectacara,
                        idu: idu,
                    }
                    let res1 = res;
                    url =  MAIN_URL + '/listpertanyaan';
                    var dataputs = await axios.post(url, params)
                    .then(function (res) {
                        var data = res.data.results;
                        var selectacara = res.data.selectacara;
                        var dataacara = res.data.dataacara;
                        var partpertanyaan = res.data.partpertanyaan;
                        res1.render('assessmentmahasiswa', {
                            idu, username, nama, tipe, fakultas, prodi,
                            data: data,
                            selectacara,
                            dataacara,
                            partpertanyaan
                        })
                    })
                    .catch(function (err) {
                        // console.log(err.response.data)
                        var message = err.response.data.message;
                        req.session.sessionFlash = {
                            type: 'error',
                            message: message
                        }
                        res1.redirect("/assessmentmahasiswa");
                    })
                }
            } else {
                /** field id acara kosong */
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Field tidak boleh kosong'
                }
                res.redirect("/assessmentmahasiswa");
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

/** Route for hasil assessment mahasiswa */
Router.get('/hasilassessment', async (req, res, dataputs) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        fakultas = req.session.fakultas
        prodi = req.session.prodi
        if(tipe == 'admin' || tipe == 'psikolog'){


            const { selectacara } = req.body;
            if( selectacara ){
                if(selectacara == "-- Pilih Acara --"){
                    req.session.sessionFlash = {
                        type: 'error',
                        message: 'Harap pilih acara terlebih dahulu!'
                    }
                    res.redirect("/hasilassessment");
                } else {
                    /** get data acara berdasarkan id yang di pilih */
                    params = {
                        selectacara: selectacara,
                    }
                    let res1 = res;
                    url =  MAIN_URL + '/hasilassessment';
                    var dataputs = await axios.post(url, params)
                    .then(function (res) {
                        var data = res.data.results;
                        var selectacara = res.data.selectacara;
                        var dataacara = res.data.dataacara;
                        res1.render('hasilassessment', {
                            idu, username, nama, tipe, fakultas, prodi,
                            data: data,
                            selectacara,
                            dataacara,
                        })
                    })
                    .catch(function (err) {
                        // console.log(err.response.data)
                        var message = err.response.data.message;
                        req.session.sessionFlash = {
                            type: 'error',
                            message: message
                        }
                        res1.redirect("/hasilassessment");
                    })
                }
            } else {
                /** field id acara kosong */
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Field tidak boleh kosong'
                }
                res.redirect("/hasilassessment");
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
})

/** Route for logout */
Router.get('/logout', (req, res) =>{
    req.session.destroy((err) => {
        res.redirect("/login");
    })
})

module.exports = Router;