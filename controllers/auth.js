const Mysql = require("mysql");
const Path = require("path");
const axios = require('axios');
const Dotenv = require("dotenv");
Dotenv.config({ path: './.env' });
// process.env.MAIN_URL

/** Login Process */
exports.login = async (req, res, dataputs) => {
    try {
        const { emailnim, password } = req.body;

        if(emailnim && password){
            params = {
                emailnim: emailnim,
                password: password
              }
            var res1 = res;
            url =  process.env.MAIN_URL + '/auth/login';
            var dataputs = await axios.post(url, params)
            .then(function (res) {
                // var message = res.data.message;
                // console.log(message)
                req.session.loggedIn = true;
                req.session.userdata = res.data.data;
                req.session.iduser = res.data.data[0].id;
                req.session.nama = res.data.data[0].unama;
                req.session.username = res.data.data[0].uname;
                req.session.type = res.data.data[0].utipe;
                req.session.fakultas = res.data.data[0].ufakultas;
                req.session.prodi = res.data.data[0].uprodi;
                var users = res.data;
                res1.redirect('/');
            })
            .catch(function (err) {
                /** get message from API */
                var message = err.response.data.message;
                req.session.sessionFlash = {
                    type: 'error',
                    message: message
                }
                res1.redirect("/login");
                
            })
        } else {
            /** username dan password kosong */
            req.session.sessionFlash = {
                type: 'error',
                message: 'Email atau NIM atau password tidak boleh kosong!'
            }
            res.redirect("/login");
        }
    } catch (error) {
        // console.log(error);
        /** catch */
        req.session.sessionFlash = {
            type: 'error',
            message: error
        }
        res.redirect("/login");
    }        
};

/** Register Admin/Psikolog Process */
exports.register = async (req, res, dataputs) => {
    try{
        const { username, email, nama, telp, tempatlahir, tanggallahir, alamat, tipeakun, password, password2 } = req.body;

        if(email && nama && password && password2 && tipeakun ){
            if(tipeakun === 'admin' || tipeakun === 'psikolog'){
                if(password == password2){
                    if(tanggallahir){
                        var ulangtahun = tanggallahir
                    } else {
                        var ulangtahun = "0000-00-00"
                    }
                    params = {
                        username: username,
                        email: email,
                        nama: nama,
                        phone: telp,
                        tempat_lahir: tempatlahir,
                        tanggal_lahir: ulangtahun,
                        alamat: alamat,
                        password: password,
                        password2: password2,
                        tipeakun: tipeakun
                      }
                    var res1 = res;
                    url =  process.env.MAIN_URL + '/auth/reg'+tipeakun;
                    var dataputs = await axios.post(url, params)
                    .then(function (res) {
                        var message = res.data.message;
                        req.session.sessionFlash2 = {
                            type: 'success',
                            message: message
                        }
                        res1.redirect('/users');
                    })
                    .catch(function (err) {
                        /** get message from API */
                        var message = err.response.data.message;
                        req.session.sessionFlash = {
                            type: 'error',
                            message: message
                        }
                        res1.redirect("/users");
                    })
                } else {
                    req.session.sessionFlash = {
                        type: 'error',
                        message: 'Password dan konfirmasi password tidak sama'
                    }
                    res.redirect("/users");
                }
            } else if(tipeakun === '-- Pilih Tipe Akun --'){
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Harap pilih tipe akun terlebih dahulu!'
                }
                res.redirect("/users");
            }else {
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Tipe akun tidak tepat!'
                }
                res.redirect("/users");
            }
        } else {
            req.session.sessionFlash = {
                type: 'error',
                message: 'Field email, nama, tipe akun, paswword dan konfirmasi password tidak boleh kosong!'
            }
            res.redirect("/users");
        }

    } catch (error) {
        // console.log(error);
        /** catch */
        req.session.sessionFlash = {
            type: 'error',
            message: error
        }
        res.redirect("/users");
    }
};

/** Register Mahasiswa Process */
exports.regMahasiswa = async (req, res, dataputs) => {
    try{
        const { selectfakultas, nim, password, password2 } = req.body;

        if(selectfakultas && nim && password && password2 ){
            if(password == password2){
                var res1 = res;
                url =  'https://satudata.unsri.info/api/simak/mahasiswa?nim='+nim+'&fakultas='+selectfakultas;
                var dataputs = await axios.get(url)
                .then(function (res) {
                    if(res.data.data != null){
                        var message = res.data.message;
                        req.session.userdata = res.data.data;
                        req.session.nim = res.data.data.NIM;
                        req.session.nama = res.data.data.NAMA;
                        req.session.fakultas = res.data.data.FAKULTAS;
                        req.session.prodi = res.data.data.PRODI;
                        /** send to api register */
                        params = {
                            fakultas: req.session.fakultas,
                            prodi: req.session.prodi,
                            nim: req.session.nim,
                            nama: req.session.nama,
                            password: password,
                            password2: password2,
                        }
                        // var res2 = res;
                        url =  process.env.MAIN_URL + '/auth/regmahasiswa';
                        var dataputs = axios.post(url, params)
                        .then(function(res){
                            var message = res.data.message;
                            req.session.userdata = res.data.data;
                            req.session.sessionFlash2 = {
                                type: 'success',
                                message: message
                            }
                            res1.redirect('/login');
                        })
                        .catch(function(err){
                            var message = err.response.data.message
                            req.session.sessionFlash = {
                                type: 'error',
                                message: message
                            }
                            res1.redirect("/registermahasiswa");
                        })
                        /** end of send to api register */
                    } else {
                        req.session.sessionFlash = {
                            type: 'error',
                            message: 'NIM anda tidak terdaftar, silahkan di periksa kembali NIM dan Fakultas yang dipilih!'
                        }
                        res.redirect("/registermahasiswa");
                    }
                    
                })
                .catch(function (err) {
                    // var message = res.data.message;
                    req.session.sessionFlash = {
                        type: 'error',
                        message: 'NIM anda tidak terdaftar, silahkan di periksa kembali NIM dan Fakultas yang dipilih!'
                    }
                    res1.redirect("/registermahasiswa");
                })
            } else {
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Password dan konfirmasi password tidak sama'
                }
                res.redirect("/registermahasiswa");
            }
        } else {
            req.session.sessionFlash = {
                type: 'error',
                message: 'Field tidak boleh kosong!'
            }
            res.redirect("/registermahasiswa");
        }
    } catch(error){
        req.session.sessionFlash = {
            type: 'error',
            message: error
        }
        res.redirect("/registermahasiswa");
    }
}

/** Edit User */
exports.edit = async (req, res, dataputs) => {
    try{
        const { modalid, modalusername, modalemail, modalnama, modaltelepon, modaltempatlahir, modaltanggallahir, modalalamat, modaltipe} = req.body;
        if(modalid && modalemail && modalnama && modaltipe){
            if(modaltipe == "-- Pilih Tipe Akun --"){
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Harap Pilih Tipe Akun Terlebih Dahulu!'
                }
                res.redirect("/users");
            } else {
                if(modaltanggallahir){
                    var ulangtahun = modaltanggallahir
                } else {
                    var ulangtahun = "0000-00-00"
                }
                params = {
                    id: modalid,
                    username: modalusername,
                    email: modalemail,
                    nama: modalnama,
                    telepon: modaltelepon,
                    tempatlahir: modaltempatlahir,
                    tanggallahir: ulangtahun,
                    alamat: modalalamat,
                    tipe: modaltipe
                }
                var res1 = res;
                url =  process.env.MAIN_URL + '/auth/edituser';
                var dataputs = await axios.put(url, params)
                    .then(function (res) {
                        var message = res.data.message;
                        req.session.sessionFlash2 = {
                            type: 'success',
                            message: message
                        }
                        res1.redirect('/users');
                    })
                    .catch(function (err) {
                        var message = err.response.data.message;
                        req.session.sessionFlash = {
                            type: 'error',
                            message: message
                        }
                        res1.redirect("/users");
                    })
            }
        } else {
            req.session.sessionFlash = {
                type: 'error',
                message: 'Field email, nama dan tipe akun tidak boleh kosong!'
            }
            res.redirect("/users");
        }
    } catch(error){
        req.session.sessionFlash = {
            type: 'error',
            message: error
        }
        res.redirect("/users");
    }
}

/** Delete User */
exports.delete = async (req, res, dataputs) => {
    try{
        const { modalidhapus } = req.body;
        if(modalidhapus){
            params = {
                id: modalidhapus
            }
            var res1 = res;
            url =  process.env.MAIN_URL + '/auth/deleteuser';
            var dataputs = await axios.put(url, params)
                .then(function (res) {
                    var message = res.data.message
                    req.session.sessionFlash2 = {
                        type: 'success',
                        message: message
                    }
                    res1.redirect('/users');
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
            req.session.sessionFlash = {
                type: 'error',
                message: 'Field tidak boleh kosong!'
            }
            res.redirect("/users");
        }
    } catch(error){
        req.session.sessionFlash = {
            type: 'error',
            message: error
        }
        res.redirect("/users");
    }
}