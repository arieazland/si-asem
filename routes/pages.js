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
                username, nama, idu, tipe, fakultas, prodi
            });
        } else if(tipe === 'psikolog'){
            /** login page di arahkan ke page psikolog */
            res.render("indexpsikolog",{
                username, nama, idu, tipe
            });
        } else if(tipe === 'admin'){
            /** login page di arahkan ke page admin */
            res.render("index",{
                username, nama, idu, tipe
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
                    username, nama, idu, tipe,
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
                    username, nama, idu, tipe,
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
                        username, nama, idu, tipe,
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
                        username, nama, idu, tipe,
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
                            username, nama, idu, tipe,
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
        if(tipe == 'admin' || tipe == 'psikolog'){
            let res1 = res;
            url =  MAIN_URL + '/partlist';
            dataputs = await axios.get(url)
            .then(function (res) {
                var part = res.data;
                /** render page part */
                res1.render('part', {
                    username, nama, idu, tipe,
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
        if(tipe == 'admin' || tipe == 'psikolog'){
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
                        idu, username, nama, tipe,
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
                        username, nama, idu, tipe,
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
        if(tipe == 'admin' || tipe == 'psikolog'){
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
                                username, nama, idu, tipe,
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
        if(tipe == 'admin' || tipe == 'psikolog'){
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
                        idu, nama, username, tipe,
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
                        username, nama, idu, tipe,
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
        if(tipe == 'admin' || tipe == 'psikolog'){
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
                            var soal = res.data.results;
                            var dataaspek = res.data.resultaspek;
                            var pilihaspek = res.data.resultsidaspek;
                            var selectaspek = res.data.selectaspek;
                            var message = res.data.message;
                            req.session.sessionFlash2 = {
                                type: 'success',
                                message: message
                            }
                            res1.render('soal', {
                                idu, nama, username, tipe,
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
                    var message = res.data.message;
                    req.session.sessionFlash2 = {
                        type: 'success',
                        message: message
                    }
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
                    var message = res.data.message;
                    req.session.sessionFlash2 = {
                        type: 'success',
                        message: message
                    }
                    res1.render('assessmentmahasiswa', {
                        username, nama, idu, tipe, fakultas, prodi,
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
                        var message = res.data.message;
                        req.session.sessionFlash2 = {
                            type: 'success',
                            message: message
                        }
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

/** Route for hasil assessment */
Router.get('/hasilassessment', async (req, res, dataputs) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        if(tipe == 'admin' || tipe == 'psikolog'){
            if(req.session.idacara != null){
                params = {
                    selectacara: req.session.idacara,
                }
                let res1 = res;
                url =  MAIN_URL + '/hasilassessment';
                var dataputs = await axios.post(url, params)
                .then(function (res) {
                    var data = res.data.resultcekmahasiswa;
                    var selectacara = res.data.selectacara;
                    var dataacara = res.data.dataacara;
                    var message = res.data.message;
                    req.session.sessionFlash2 = {
                        type: 'success',
                        message: message
                    }
                    res1.render('hasilassessment', {
                        idu, username, nama, tipe,
                        data: data,
                        selectacara,
                        dataacara,
                    })
                    req.session.idacara = null
                })
                .catch(function (err) {
                    // console.log(err.response.data)
                    var message = err.response.data.message;
                    req.session.sessionFlash = {
                        type: 'error',
                        message: message
                    }
                    res1.redirect("/hasilassessment");
                    req.session.idacara = null
                })


            } else {
                let res1 = res;
                url =  MAIN_URL + '/acaralistassessment';
                dataputs = await axios.get(url)
                .then(function (res) {
                    var acara = res.data;
                    /** render page hasilassessment */
                    res1.render('hasilassessment', {
                        username, nama, idu, tipe,
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
                    res1.redirect("/hasilassessment");
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

Router.post('/hasilassessment', async (req, res, dataputs) => {
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
                        var data = res.data.resultcekmahasiswa;
                        var selectacara = res.data.selectacara;
                        var dataacara = res.data.dataacara;
                        var message = res.data.message;
                        req.session.sessionFlash2 = {
                            type: 'success',
                            message: message
                        }
                        res1.render('hasilassessment', {
                            idu, username, nama, tipe,
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

/** Route for hasil assessment mahasiswa*/
Router.post('/hasilassessmentmahasiswa', async (req, res, dataputs) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        fakultas = req.session.fakultas
        prodi = req.session.prodi
        if(tipe == 'admin' || tipe == 'psikolog'){
            const { selectmahasiswa, idacara } = req.body;
            if( selectmahasiswa && idacara ){
                if(selectmahasiswa == "-- Pilih Mahasiswa --"){
                    req.session.sessionFlash = {
                        type: 'error',
                        message: 'Harap pilih mahasiswa terlebih dahulu!'
                    }
                    res.redirect("/hasilassessment");
                } else {
                    /** get data acara berdasarkan id yang di pilih */
                    params = {
                        selectacara: idacara,
                        selectmahasiswa: selectmahasiswa
                    }
                    let res1 = res;
                    url =  MAIN_URL + '/hasilassessmentmahasiswa';
                    var dataputs = await axios.post(url, params)
                    .then(function (res) {
                        var part1 = res.data.part1;
                        var part2 = res.data.part2;
                        var part3 = res.data.part3;
                        var part4 = res.data.part4;
                        var part5 = res.data.part5;
                        var selectacara = res.data.selectacara;
                        var selectmahasiswa = res.data.selectmahasiswa;
                        var dataacara = res.data.dataacara;
                        var data = res.data.resultcekmahasiswa;
                        var datamahasiswa = res.data.datamahasiswa;
                        var message = res.data.message;
                        req.session.sessionFlash2 = {
                            type: 'success',
                            message: message
                        }
                        res1.render('hasilassessment', {
                            idu, username, nama, tipe,
                            part1, part2, part3, part4, part5, 
                            data: data,
                            selectmahasiswa,
                            selectacara,
                            dataacara,
                            datamahasiswa
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

/** Route for kesimpulan assessment mahasiswa */
Router.get('/kesimpulanassessment', async (req, res, dataputs) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        if(tipe == 'admin' || tipe == 'psikolog'){
            if(req.session.idacara != null){
                params = {
                    selectacara: req.session.idacara,
                }
                let res1 = res;
                url =  MAIN_URL + '/kesimpulanassessmenthapus';
                var dataputs = await axios.post(url, params)
                .then(function (res) {
                    var data = res.data.resultcekmahasiswa;
                    var selectacara = res.data.selectacara;
                    var dataacara = res.data.dataacara;
                    var message = res.data.message;
                    req.session.sessionFlash2 = {
                        type: 'success',
                        message: message
                    }
                    res1.render('kesimpulanassessment', {
                        idu, username, nama, tipe,
                        data: data,
                        selectacara,
                        dataacara,
                    })
                    req.session.idacara = null
                })
                .catch(function (err) {
                    // console.log(err.response.data)
                    var message = err.response.data.message;
                    req.session.sessionFlash = {
                        type: 'error',
                        message: message
                    }
                    res1.redirect("/kesimpulanassessment");
                    req.session.idacara = null
                })
            } else {
                let res1 = res;
                url =  MAIN_URL + '/acaralistassessment';
                dataputs = await axios.get(url)
                .then(function (res) {
                    var acara = res.data;
                    /** render page kesimpulanassessment */
                    res1.render('kesimpulanassessment', {
                        username, nama, idu, tipe,
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
                    res1.redirect("/kesimpulanassessment");
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

Router.post('/kesimpulanassessment', async (req, res, dataputs) => {
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
                    res.redirect("/kesimpulanassessment");
                } else {
                    /** get data acara berdasarkan id yang di pilih */
                    params = {
                        selectacara: selectacara,
                    }
                    let res1 = res;
                    url =  MAIN_URL + '/kesimpulanassessment';
                    var dataputs = await axios.post(url, params)
                    .then(function (res) {
                        var data = res.data.resultcekmahasiswa;
                        var selectacara = res.data.selectacara;
                        var dataacara = res.data.dataacara;
                        var message = res.data.message;
                        req.session.sessionFlash2 = {
                            type: 'success',
                            message: message
                        }
                        res1.render('kesimpulanassessment', {
                            idu, username, nama, tipe,
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
                        res1.redirect("/kesimpulanassessment");
                    })
                }
            } else {
                /** field id acara kosong */
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Field tidak boleh kosong'
                }
                res.redirect("/kesimpulanassessment");
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

/** Route for kesimpulan assessment mahasiswa*/
Router.get('/kesimpulanassessmentmahasiswa', async (req, res, dataputs) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        fakultas = req.session.fakultas
        prodi = req.session.prodi
        if(tipe == 'admin' || tipe == 'psikolog'){
            if(req.session.idacara != null && req.session.idmahasiswa != null) {
                /** get data acara berdasarkan id yang di pilih */
                params = {
                    selectacara: req.session.idacara,
                    selectmahasiswa: req.session.idmahasiswa
                }
                let res1 = res;
                url =  MAIN_URL + '/kesimpulanassessmentmahasiswa';
                var dataputs = await axios.post(url, params)
                .then(function (res) {
                    var part1 = res.data.part1;
                    var part2 = res.data.part2;
                    var part3 = res.data.part3;
                    var part4 = res.data.part4;
                    var part5 = res.data.part5;
                    var selectacara = res.data.selectacara;
                    var selectmahasiswa = res.data.selectmahasiswa;
                    var dataacara = res.data.dataacara;
                    var data = res.data.resultcekmahasiswa;
                    var datamahasiswa = res.data.datamahasiswa;
                    var datakesimpulan = res.data.datakesimpulan;
                    var message = res.data.message;
                    req.session.sessionFlash2 = {
                        type: 'success',
                        message: message
                    }
                    res1.render('kesimpulanassessment', {
                        idu, username, nama, tipe,
                        part1, part2, part3, part4, part5, 
                        data: data,
                        selectmahasiswa,
                        selectacara,
                        dataacara,
                        datamahasiswa,
                        datakesimpulan
                    })
                    req.session.idmahasiswa = null
                    req.session.idacara = null
                })
                .catch(function (err) {
                    // console.log(err.response.data)
                    var message = err.response.data.message;
                    req.session.sessionFlash = {
                        type: 'error',
                        message: message
                    }
                    res1.redirect("/kesimpulanassessment");
                    req.session.idmahasiswa = null
                    req.session.idacara = null
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

/** Route for kesimpulan assessment mahasiswa*/
Router.post('/kesimpulanassessmentmahasiswa', async (req, res, dataputs) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        fakultas = req.session.fakultas
        prodi = req.session.prodi
        if(tipe == 'admin' || tipe == 'psikolog'){
            const { selectmahasiswa, idacara } = req.body;
            if( selectmahasiswa && idacara ){
                if(selectmahasiswa == "-- Pilih Mahasiswa --"){
                    req.session.sessionFlash = {
                        type: 'error',
                        message: 'Harap pilih mahasiswa terlebih dahulu!'
                    }
                    res.redirect("/kesimpulanassessment");
                } else {
                    /** get data acara berdasarkan id yang di pilih */
                    params = {
                        selectacara: idacara,
                        selectmahasiswa: selectmahasiswa
                    }
                    let res1 = res;
                    url =  MAIN_URL + '/kesimpulanassessmentmahasiswa';
                    var dataputs = await axios.post(url, params)
                    .then(function (res) {
                        var part1 = res.data.part1;
                        var part2 = res.data.part2;
                        var part3 = res.data.part3;
                        var part4 = res.data.part4;
                        var part5 = res.data.part5;
                        var selectacara = res.data.selectacara;
                        var selectmahasiswa = res.data.selectmahasiswa;
                        var dataacara = res.data.dataacara;
                        var data = res.data.resultcekmahasiswa;
                        var datamahasiswa = res.data.datamahasiswa;
                        var datakesimpulan = res.data.datakesimpulan;
                        var message = res.data.message;
                        req.session.sessionFlash2 = {
                            type: 'success',
                            message: message
                        }
                        res1.render('kesimpulanassessment', {
                            idu, username, nama, tipe,
                            part1, part2, part3, part4, part5, 
                            data: data,
                            selectmahasiswa,
                            selectacara,
                            dataacara,
                            datamahasiswa,
                            datakesimpulan
                        })
                    })
                    .catch(function (err) {
                        // console.log(err.response.data)
                        var message = err.response.data.message;
                        req.session.sessionFlash = {
                            type: 'error',
                            message: message
                        }
                        res1.redirect("/kesimpulanassessment");
                    })
                }
            } else {
                /** field id acara kosong */
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Field tidak boleh kosong'
                }
                res.redirect("/kesimpulanassessment");
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

/** Route for hasil assessment prodi*/
Router.get('/hasilassessmentprodi', async (req, res, dataputs) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        if(tipe == 'admin' || tipe == 'psikolog'){
            if(req.session.idacara != null){
                params = {
                    selectacara: req.session.idacara,
                }
                let res1 = res;
                url =  MAIN_URL + '/hasilassessmentprodi';
                var dataputs = await axios.post(url, params)
                .then(function (res) {
                    var data = res.data.resultcekprodi;
                    var selectacara = res.data.selectacara;
                    var dataacara = res.data.dataacara;
                    var message = res.data.message;
                    req.session.sessionFlash2 = {
                        type: 'success',
                        message: message
                    }
                    res1.render('hasilassessmentprodi', {
                        idu, username, nama, tipe,
                        data: data,
                        selectacara,
                        dataacara,
                    })
                    req.session.idacara = null
                })
                .catch(function (err) {
                    // console.log(err.response.data)
                    var message = err.response.data.message;
                    req.session.sessionFlash = {
                        type: 'error',
                        message: message
                    }
                    res1.redirect("/hasilassessmentprodi");
                    req.session.idacara = null
                })
            } else {
                let res1 = res;
                url =  MAIN_URL + '/acaralistassessment';
                dataputs = await axios.get(url)
                .then(function (res) {
                    var acara = res.data;
                    /** render page hasilassessment */
                    res1.render('hasilassessmentprodi', {
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
                    res1.redirect("/hasilassessmentprodi");
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

Router.post('/hasilassessmentprodi', async (req, res, dataputs) => {
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
                    res.redirect("/hasilassessmentprodi");
                } else {
                    /** get data acara berdasarkan id yang di pilih */
                    params = {
                        selectacara: selectacara,
                    }
                    let res1 = res;
                    url =  MAIN_URL + '/hasilassessmentprodi';
                    var dataputs = await axios.post(url, params)
                    .then(function (res) {
                        var data = res.data.resultcekprodi;
                        var selectacara = res.data.selectacara;
                        var dataacara = res.data.dataacara;
                        var message = res.data.message;
                        req.session.sessionFlash2 = {
                            type: 'success',
                            message: message
                        }
                        res1.render('hasilassessmentprodi', {
                            idu, username, nama, tipe,
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
                        res1.redirect("/hasilassessmentprodi");
                    })
                }
            } else {
                /** field id acara kosong */
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Field tidak boleh kosong'
                }
                res.redirect("/hasilassessmentprodi");
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

/** Route for hasil assessment programstudi*/
Router.post('/hasilassessmentprogramstudi', async (req, res, dataputs) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        fakultas = req.session.fakultas
        prodi = req.session.prodi
        if(tipe == 'admin' || tipe == 'psikolog'){
            const { selectprodi, idacara } = req.body;
            if( selectprodi && idacara ){
                if(selectprodi == "-- Pilih Prodi --"){
                    req.session.sessionFlash = {
                        type: 'error',
                        message: 'Harap pilih program studi terlebih dahulu!'
                    }
                    res.redirect("/hasilassessmentprodi");
                } else {
                    /** get data acara berdasarkan id yang di pilih */
                    params = {
                        selectacara: idacara,
                        selectprodi: selectprodi
                    }
                    let res1 = res;
                    url =  MAIN_URL + '/hasilassessmentprogramstudi';
                    var dataputs = await axios.post(url, params)
                    .then(function (res) {
                        var part1 = res.data.part1;
                        var part2 = res.data.part2;
                        var part3 = res.data.part3;
                        var part4 = res.data.part4;
                        var part5 = res.data.part5;
                        var selectacara = res.data.selectacara;
                        var selectprodi = res.data.selectprodi;
                        var dataacara = res.data.dataacara;
                        var data = res.data.resultcekprodi;
                        var message = res.data.message;
                        var dataprodi = res.data.dataprodi
                        req.session.sessionFlash2 = {
                            type: 'success',
                            message: message
                        }
                        res1.render('hasilassessmentprodi', {
                            idu, username, nama, tipe,
                            part1, part2, part3, part4, part5, 
                            data: data,
                            selectprodi,
                            selectacara,
                            dataacara,
                            dataprodi
                        })
                    })
                    .catch(function (err) {
                        // console.log(err.response.data)
                        var message = err.response.data.message;
                        req.session.sessionFlash = {
                            type: 'error',
                            message: message
                        }
                        res1.redirect("/hasilassessmentprodi");
                    })
                }
            } else {
                /** field id acara kosong */
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Field tidak boleh kosong'
                }
                res.redirect("/hasilassessmentprodi");
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

/** Route for kesimpulan assessment prodi */
Router.get('/kesimpulanassessmentprodi', async (req, res, dataputs) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        if(tipe == 'admin' || tipe == 'psikolog'){
            if(req.session.idacara != null){
                params = {
                    selectacara: req.session.idacara,
                }
                let res1 = res;
                url =  MAIN_URL + '/kesimpulanassessmentprodihapus';
                var dataputs = await axios.post(url, params)
                .then(function (res) {
                    var data = res.data.resultcekprodi;
                    var selectacara = res.data.selectacara;
                    var dataacara = res.data.dataacara;
                    var message = res.data.message;
                    req.session.sessionFlash2 = {
                        type: 'success',
                        message: message
                    }
                    res1.render('kesimpulanassessmentprodi', {
                        idu, username, nama, tipe,
                        data: data,
                        selectacara,
                        dataacara,
                    })
                    req.session.idacara = null
                })
                .catch(function (err) {
                    // console.log(err.response.data)
                    var message = err.response.data.message;
                    req.session.sessionFlash = {
                        type: 'error',
                        message: message
                    }
                    res1.redirect("/kesimpulanassessmentprodi");
                    req.session.idacara = null
                })
            } else {
                let res1 = res;
                url =  MAIN_URL + '/acaralistassessment';
                dataputs = await axios.get(url)
                .then(function (res) {
                    var acara = res.data;
                    /** render page kesimpulanassessment */
                    res1.render('kesimpulanassessmentprodi', {
                        username, nama, idu, tipe,
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
                    res1.redirect("/kesimpulanassessmentprodi");
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

Router.post('/kesimpulanassessmentprodi', async (req, res, dataputs) => {
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
                    res.redirect("/kesimpulanassessmentprodi");
                } else {
                    /** get data acara berdasarkan id yang di pilih */
                    params = {
                        selectacara: selectacara,
                    }
                    let res1 = res;
                    url =  MAIN_URL + '/kesimpulanassessmentprodi';
                    var dataputs = await axios.post(url, params)
                    .then(function (res) {
                        var data = res.data.resultcekprodi;
                        var selectacara = res.data.selectacara;
                        var dataacara = res.data.dataacara;
                        var message = res.data.message;
                        req.session.sessionFlash2 = {
                            type: 'success',
                            message: message
                        }
                        res1.render('kesimpulanassessmentprodi', {
                            idu, username, nama, tipe,
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
                        res1.redirect("/kesimpulanassessmentprodi");
                    })
                }
            } else {
                /** field id acara kosong */
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Field tidak boleh kosong'
                }
                res.redirect("/kesimpulanassessmentprodi");
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

/** Route for kesimpulan assessment programstudi*/
Router.get('/kesimpulanassessmentprogramstudi', async (req, res, dataputs) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        fakultas = req.session.fakultas
        prodi = req.session.prodi
        if(tipe == 'admin' || tipe == 'psikolog'){
            if(req.session.idacara != null && req.session.idprodi != null) {
                /** get data acara berdasarkan id yang di pilih */
                params = {
                    selectacara: req.session.idacara,
                    selectprodi: req.session.idprodi
                }
                let res1 = res;
                url =  MAIN_URL + '/kesimpulanassessmentprogramstudi';
                var dataputs = await axios.post(url, params)
                .then(function (res) {
                    var part1 = res.data.part1;
                    var part2 = res.data.part2;
                    var part3 = res.data.part3;
                    var part4 = res.data.part4;
                    var part5 = res.data.part5;
                    var selectacara = res.data.selectacara;
                    var selectprodi = res.data.selectprodi;
                    var dataacara = res.data.dataacara;
                    var data = res.data.resultcekprodi;
                    var dataprodi = res.data.dataprodi;
                    var datakesimpulan = res.data.datakesimpulan;
                    var message = res.data.message;
                    req.session.sessionFlash2 = {
                        type: 'success',
                        message: message
                    }
                    res1.render('kesimpulanassessmentprodi', {
                        idu, username, nama, tipe,
                        part1, part2, part3, part4, part5, 
                        data: data,
                        selectprodi,
                        selectacara,
                        dataacara,
                        dataprodi,
                        datakesimpulan
                    })
                    req.session.idprodi = null
                    req.session.idacara = null
                })
                .catch(function (err) {
                    // console.log(err.response.data)
                    var message = err.response.data.message;
                    req.session.sessionFlash = {
                        type: 'error',
                        message: message
                    }
                    res1.redirect("/kesimpulanassessmentprodi");
                    req.session.idprodi = null
                    req.session.idacara = null
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

/** Route for kesimpulan assessment prodi*/
Router.post('/kesimpulanassessmentprogramstudi', async (req, res, dataputs) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        fakultas = req.session.fakultas
        prodi = req.session.prodi
        if(tipe == 'admin' || tipe == 'psikolog'){
            const { selectprodi, idacara } = req.body;
            if( selectprodi && idacara ){
                if(selectprodi == "-- Pilih Prodi --"){
                    req.session.sessionFlash = {
                        type: 'error',
                        message: 'Harap pilih prodi terlebih dahulu!'
                    }
                    res.redirect("/kesimpulanassessmentprodi");
                } else {
                    /** get data acara berdasarkan id yang di pilih */
                    params = {
                        selectacara: idacara,
                        selectprodi: selectprodi
                    }
                    let res1 = res;
                    url =  MAIN_URL + '/kesimpulanassessmentprogramstudi';
                    var dataputs = await axios.post(url, params)
                    .then(function (res) {
                        var part1 = res.data.part1;
                        var part2 = res.data.part2;
                        var part3 = res.data.part3;
                        var part4 = res.data.part4;
                        var part5 = res.data.part5;
                        var selectacara = res.data.selectacara;
                        var selectprodi = res.data.selectprodi;
                        var dataacara = res.data.dataacara;
                        var data = res.data.resultcekprodi;
                        var dataprodi = res.data.dataprodi;
                        var datakesimpulan = res.data.datakesimpulan;
                        var message = res.data.message;
                        req.session.sessionFlash2 = {
                            type: 'success',
                            message: message
                        }
                        res1.render('kesimpulanassessmentprodi', {
                            idu, username, nama, tipe,
                            part1, part2, part3, part4, part5, 
                            data: data,
                            selectprodi,
                            selectacara,
                            dataacara,
                            dataprodi,
                            datakesimpulan
                        })
                        
                    })
                    .catch(function (err) {
                        // console.log(err.response.data)
                        var message = err.response.data.message;
                        req.session.sessionFlash = {
                            type: 'error',
                            message: message
                        }
                        res1.redirect("/kesimpulanassessmentprodi");
                    })
                }
            } else {
                /** field id acara kosong */
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Field tidak boleh kosong'
                }
                res.redirect("/kesimpulanassessmentprodi");
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