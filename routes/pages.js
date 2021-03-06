const Express = require("express");
const axios = require('axios');
const Router = Express.Router();
const Moment = require("moment");
const nodemailer = require('nodemailer');
const Dotenv = require("dotenv");
Dotenv.config({ path: './.env' });
// process.env.MAIN_URL

require("moment/locale/id");  // without this line it didn't work
Moment.locale('id');

/** set up mail sender */
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
});

/** Route for Login */
Router.get('/login', (req, res) => {
    if(process.env.ERROR == 'true'){
        /** maintenance server */
        res.redirect('/errorpage');
    } else if(process.env.ERROR == 'false') {
        if(req.session.loggedIn){
            /** jika sudah login di arahkan ke index */
            res.redirect('/');
        } else {
            /** jika belum login di arahkan ke page login */
            res.render("login");
        }
    }
});

/** Route for errorpage */
Router.get('/errorpage', (req, res) =>{
    res.render("pageerror");
})

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
        //ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
        // ipadd = ip.substr(7)
        if(tipe === 'mahasiswa'){
            /** login page di arahkan ke page user */
            // res.render("indexmahasiswa",{
            //     username, nama, idu, tipe, fakultas, prodi
            // });
            res.redirect('/assessmentmahasiswa')
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
            url =  process.env.MAIN_URL + '/userlist';
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
            url =  process.env.MAIN_URL + '/acaralist';
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
                url =  process.env.MAIN_URL + '/partisipant';
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
                url =  process.env.MAIN_URL + '/acaralist';
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
                    url =  process.env.MAIN_URL + '/partisipant';
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
            url =  process.env.MAIN_URL + '/partlist';
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
                url =  process.env.MAIN_URL + '/listaspek';
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
                url =  process.env.MAIN_URL + '/partlist';
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
                        url =  process.env.MAIN_URL + '/listaspek';
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
                url =  process.env.MAIN_URL + '/listsoal';
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
                url =  process.env.MAIN_URL + '/listaspekall';
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
                        url =  process.env.MAIN_URL + '/listsoal';
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
                url =  process.env.MAIN_URL + '/listpertanyaan2';
                var dataputs = await axios.post(url, params)
                .then(function (res) {
                    var selectacara = res.data.selectacara;
                    var dataacara = res.data.dataacara;
                    var partpertanyaan = res.data.partpertanyaan;
                    if(partpertanyaan === '1'){
                        var data = res.data.pertanyaan_part1;
                    } else if(partpertanyaan === '2'){
                        var data = res.data.pertanyaan_part2;
                    } else if(partpertanyaan === '3'){
                        var data = res.data.pertanyaan_part3;
                    } else if(partpertanyaan === '4'){
                        var data = res.data.pertanyaan_part4;
                    } else if(partpertanyaan === '5'){
                        var data = res.data.pertanyaan_part5;
                    }
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
                url =  process.env.MAIN_URL + '/acaralistmahasiswa';
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
                    url =  process.env.MAIN_URL + '/listpertanyaan2';
                    var dataputs = await axios.post(url, params)
                    .then(function (res) {
                        var selectacara = res.data.selectacara;
                        var dataacara = res.data.dataacara;
                        var partpertanyaan = res.data.partpertanyaan;
                        if(partpertanyaan === '1'){
                            var data = res.data.pertanyaan_part1;
                        } else if(partpertanyaan === '2'){
                            var data = res.data.pertanyaan_part2;
                        } else if(partpertanyaan === '3'){
                            var data = res.data.pertanyaan_part3;
                        } else if(partpertanyaan === '4'){
                            var data = res.data.pertanyaan_part4;
                        } else if(partpertanyaan === '5'){
                            var data = res.data.pertanyaan_part5;
                        }
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
                url =  process.env.MAIN_URL + '/hasilassessment';
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
                url =  process.env.MAIN_URL + '/acaralistassessment';
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
                    url =  process.env.MAIN_URL + '/hasilassessment';
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
                    url =  process.env.MAIN_URL + '/hasilassessmentmahasiswa';
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
                url =  process.env.MAIN_URL + '/kesimpulanassessmenthapus';
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
                url =  process.env.MAIN_URL + '/acaralistassessment';
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
                    url =  process.env.MAIN_URL + '/kesimpulanassessment';
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
                url =  process.env.MAIN_URL + '/kesimpulanassessmentmahasiswa';
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
                    url =  process.env.MAIN_URL + '/kesimpulanassessmentmahasiswa';
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
                url =  process.env.MAIN_URL + '/hasilassessmentprodi';
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
                url =  process.env.MAIN_URL + '/acaralistassessment';
                dataputs = await axios.get(url)
                .then(function (res) {
                    var acara = res.data;
                    /** render page hasilassessment */
                    res1.render('hasilassessmentprodi', {
                        username, nama, idu, tipe,
                        dataacara: acara.data
                    })
                })
                .catch(function (err) {
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
                    url =  process.env.MAIN_URL + '/hasilassessmentprodi';
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
                    url =  process.env.MAIN_URL + '/hasilassessmentprogramstudi';
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
                url =  process.env.MAIN_URL + '/kesimpulanassessmentprodihapus';
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
                url =  process.env.MAIN_URL + '/acaralistassessment';
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
                    url =  process.env.MAIN_URL + '/kesimpulanassessmentprodi';
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
                url =  process.env.MAIN_URL + '/kesimpulanassessmentprogramstudi';
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
                    url =  process.env.MAIN_URL + '/kesimpulanassessmentprogramstudi';
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

/** Route for cetak kesimpulan assessment mahasiswa*/
Router.get('/cetakkesimpulanassessment/:acara/:mahasiswa/', async (req, res, dataputs) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        fakultas = req.session.fakultas
        prodi = req.session.prodi
        if(tipe == 'admin' || tipe == 'psikolog'){
            if(req.params.acara != null && req.params.mahasiswa != null) {
                /** get data acara berdasarkan id yang di pilih */
                params = {
                    selectacara: req.params.acara,
                    selectmahasiswa: req.params.mahasiswa
                }
                let res1 = res;
                url =  process.env.MAIN_URL + '/kesimpulanassessmentmahasiswa';
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
                    res1.render('cetakkesimpulanassessment', {
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
                    var message = err.response.data.message;
                    req.session.sessionFlash = {
                        type: 'error',
                        message: message
                    }
                    res1.redirect("/kesimpulanassessment");
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

/** Route for hasil assessment */
Router.get('/skorassessment', async (req, res, dataputs) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        if(tipe == 'admin' || tipe == 'psikolog'){
            let res1 = res;
            url =  process.env.MAIN_URL + '/acarapartskorassessment';
            dataputs = await axios.get(url)
            .then(function (res) {
                var acara = res.data.getacara;
                var part = res.data.getpart;
                /** render page hasilassessment */
                res1.render('skorassessment', {
                    username, nama, idu, tipe,
                    dataacara: acara,
                    datapart: part
                })
            })
            .catch(function (err) {
                var message = err.response.data.message;
                req.session.sessionFlash = {
                    type: 'error',
                    message: message
                }
                res1.redirect("/skorassessment");
            })
        }
    } else {
        /** di redirect ke login */
        res.redirect("/login");
    }
});

Router.post('/skorassessment', async (req, res, dataputs) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        fakultas = req.session.fakultas
        prodi = req.session.prodi
        if(tipe == 'admin' || tipe == 'psikolog'){
            const { selectacara } = req.body;
            const { selectpart } = req.body;
            if( selectacara && selectpart ){
                if(selectacara == "-- Pilih Acara --"){
                    req.session.sessionFlash = {
                        type: 'error',
                        message: 'Harap pilih acara terlebih dahulu!'
                    }
                    res.redirect("/skorassessment");
                } else {
                    /** get data acara berdasarkan id yang di pilih */
                    params = {
                        selectacara: selectacara,
                        selectpart: selectpart,
                    }
                    let res1 = res;
                    url =  process.env.MAIN_URL + '/skorassessment2';
                    var dataputs = await axios.post(url, params)
                    .then(function (res) {
                        var selectacara = res.data.selectacara;
                        var selectpart = res.data.selectpart;
                        var dataacara = res.data.getacara;
                        var datapart = res.data.getpart;
                        var part = res.data.part;
                        res1.render('skorassessment', {
                            idu, username, nama, tipe,
                            selectacara, selectpart, dataacara, datapart, part
                        })
                    })
                    .catch(function (err) {
                        var message = err.response.data.message;
                        req.session.sessionFlash = {
                            type: 'error',
                            message: message
                        }
                        res1.redirect("/skorassessment");
                    })
                }
            } else {
                /** field id acara kosong */
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Field tidak boleh kosong'
                }
                res.redirect("/skorassessment");
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

/** Route for lupa password */
Router.post('/lupapassword', async (req, res) => {
    const { emailfrgtpass } = req.body;

    if(emailfrgtpass){
        /** get data user berdasarkan email yang di input */
        params = {
            email: emailfrgtpass,
        }
        let res1 = res;
        url =  process.env.MAIN_URL + '/lupapassword';
        var dataputs = await axios.post(url, params)
        .then(function (res) {
            email = res.data.results[0].email;
            peserta = res.data.results[0].id;
            /** sent email ke peserta */
            let mailOptions = {
                from: 'sapa@unsri.ac.id',
                to: email,
                subject: 'Sapa reset Password',
                html: '<p>Hi, untuk mereset password anda, silahkan klik <a href="'+process.env.URL+'/resetpassword/'+peserta+'">disni</a> </p>'
            };
            
            transporter.sendMail(mailOptions, function(err, data) {
                if (err) {
                    console.log("Error " + err);
                } else {
                    console.log("Email sent successfully");
                }
            });
            /** end sent email ke peserta */


            req.session.sessionFlash2 = {
                type: 'success',
                message: 'Jika email yang digunakan terdaftar, silahkan cek email anda dan ikuti instruksinya'
            }
            res1.redirect("/login");
        })
        .catch(function (err) {
            console.log(err.response)
            var message = err.response.data.message;
            req.session.sessionFlash = {
                type: 'error',
                message: message
            }
            res1.redirect("/login");
        })
    } else {
        /** Field kosong */
        req.session.sessionFlash = {
            type: 'error',
            message: 'Email tidak boleh kosong'
        }
        res.redirect("/login");
    }
})

/** Route for jawab tercepat */
Router.get('/tercepat', async (req, res, dataputs) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        if(tipe == 'admin'){
            /** get data acara */
            let res1 = res;
            url =  process.env.MAIN_URL + '/acaralist';
            dataputs = await axios.get(url)
            .then(function (res) {
                var acara = res.data;
                /** render page tercepat */
                res1.render('tercepat', {
                    username, nama, idu, tipe,
                    dataacara: acara.data
                })
            })
            .catch(function (err) {
                var message = err.response.data.message;
                req.session.sessionFlash = {
                    type: 'error',
                    message: message
                }
                res1.redirect("/tercepat");
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
})

Router.post('/tercepat', async (req, res, dataputs) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        if(tipe == 'admin'){
            const {selectacara} = req.body;
            if(selectacara){
                /** get data grandprize */
                /** get parameter */
                params = {
                    selectacara: selectacara,
                }
                let res1 = res;
                url =  process.env.MAIN_URL + '/gptercepat';
                dataputs = await axios.post(url, params)
                .then(function (res) {
                    var dataacara = res.data.dataacara;
                    var gptercepat = res.data.get_gptercepat
                    var selectacara = res.data.selectacara
                    /** render page tercepat */
                    res1.render('tercepat', {
                        username, nama, idu, tipe,
                        gptercepat, selectacara,
                        dataacara
                    })
                })
                .catch(function (err) {
                    var message = err.response.data.message;
                    req.session.sessionFlash = {
                        type: 'error',
                        message: message
                    }
                    res1.redirect("/tercepat");
                })
            } else {
                /** Field kosong */
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Field tidak boleh kosong'
                }
                res.redirect("/tercepat");
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

/** Route for rekap per fakultas */
Router.get('/rekapfakultas', async (req, res) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        if(tipe == 'admin'){
            /** get data acara */
            let res1 = res;
            url =  process.env.MAIN_URL + '/acaralist';
            dataputs = await axios.get(url)
            .then(function (res) {
                var acara = res.data;
                /** render page tercepat */
                res1.render('rekapfakultas', {
                    username, nama, idu, tipe,
                    dataacara: acara.data
                })
            })
            .catch(function (err) {
                var message = err.response.data.message;
                req.session.sessionFlash = {
                    type: 'error',
                    message: message
                }
                res1.redirect("/rekapfakultas");
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
})

Router.post('/rekapfakultas', async (req, res) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        if(tipe == 'admin'){
            const {selectacara} = req.body;
            if(selectacara){
                /** get data grandprize */
                /** get parameter */
                params = {
                    selectacara: selectacara,
                }
                let res1 = res;
                url =  process.env.MAIN_URL + '/rekapperfakultas';
                dataputs = await axios.post(url, params)
                .then(function (res) {
                    var dataacara = res.data.dataacara;
                    var rekapfakultas = res.data.get_rekapperfakultas
                    var selectacara = res.data.selectacara
                    /** render page tercepat */
                    res1.render('rekapfakultas', {
                        username, nama, idu, tipe,
                        rekapfakultas, selectacara,
                        dataacara
                    })
                })
                .catch(function (err) {
                    var message = err.response.data.message;
                    req.session.sessionFlash = {
                        type: 'error',
                        message: message
                    }
                    res1.redirect("/rekapfakultas");
                })
            } else {
                /** Field kosong */
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Field tidak boleh kosong'
                }
                res.redirect("/rekapfakultas");
            }


            /** get data acara */
            // let res1 = res;
            // url =  process.env.MAIN_URL + '/acaralist';
            // dataputs = await axios.get(url)
            // .then(function (res) {
            //     var acara = res.data;
            //     /** render page tercepat */
            //     res1.render('rekapfakultas', {
            //         username, nama, idu, tipe,
            //         dataacara: acara.data
            //     })
            // })
            // .catch(function (err) {
            //     var message = err.response.data.message;
            //     req.session.sessionFlash = {
            //         type: 'error',
            //         message: message
            //     }
            //     res1.redirect("/rekapfakultas");
            // })



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

/** Route for rekap per fakultas */
Router.get('/rekapskor', async (req, res) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        if(tipe == 'admin'){
            /** get data acara */
            let res1 = res;
            url =  process.env.MAIN_URL + '/acarapartskorassessment';
            dataputs = await axios.get(url)
            .then(function (res) {
                var acara = res.data.getacara;
                var part = res.data.getpart;
                /** render page hasilassessment */
                res1.render('rekapskor', {
                    username, nama, idu, tipe,
                    dataacara: acara,
                    datapart: part
                })
            })
            .catch(function (err) {
                var message = err.response.data.message;
                req.session.sessionFlash = {
                    type: 'error',
                    message: message
                }
                res1.redirect("/");
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
})

/** Route for rekap per fakultas */
Router.post('/rekapskor', async (req, res) => {
    if(req.session.loggedIn){
        idu = req.session.iduser
        username = req.session.username
        nama = req.session.nama
        tipe = req.session.type
        if(tipe == 'admin'){
            /** get parameter */
            const {selectacara,selectpart} = req.body;
            
            if(selectacara && selectpart){
                /** get parameter */
                params = {
                    selectacara: selectacara,
                    selectpart: selectpart,
                }
                let res1 = res;
                url =  process.env.MAIN_URL + '/rekapskor';
                dataputs = await axios.post(url, params)
                .then(function (res) {
                    var acara = res.data.getacara;
                    var part = res.data.getpart;
                    var selectacara = res.data.selectacara;
                    var selectpart = res.data.selectpart;
                    var rekappart = res.data.rekappart;
                    /** render page hasilassessment */
                    res1.render('rekapskor', {
                        username, nama, idu, tipe,
                        dataacara: acara,
                        datapart: part,
                        selectacara,
                        selectpart,
                        rekappart
                    })
                })
                .catch(function (err) {
                    var message = err.response.data.message;
                    req.session.sessionFlash = {
                        type: 'error',
                        message: message
                    }
                    res1.redirect("/rekapskor");
                })
            } else {
                /** Field kosong */
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Field tidak boleh kosong'
                }
                res.redirect("/rekapskor");
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

/** Route for reset password */
Router.get('/resetpassword/:id', async (req, res) => {
    var idpeserta = req.params.id;

    if(idpeserta){
        res.render('resetpass', {
            idpeserta
        })
    } else {
        /** Field kosong */
        req.session.sessionFlash = {
            type: 'error',
            message: 'id peserta tidak boleh kosong'
        }
        res.redirect("/login");
    }
})

/** Route for manual book mahasiswa */
Router.get('/manualbookmhs', function(req, res){
    const file = `${__dirname}/../public/panduan/manualbookmahasiswa.pdf`;
    res.download(file); // Set disposition and send it.
});

/** Route for logout */
Router.get('/logout', (req, res) =>{
    req.session.destroy((err) => {
        res.redirect("/login");
    })
})

module.exports = Router;