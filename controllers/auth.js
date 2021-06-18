const Mysql = require("mysql");
const Path = require("path");
const Dotenv = require("dotenv");
const Bcrypt = require('bcrypt');
const axios = require('axios');
const MAIN_URL = require ("../urlconfig.js");

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
            url =  MAIN_URL + '/auth/login';
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
            message: 'Error please contact developer!!!'
        }
        res.redirect("/login");
    }        
};

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
                        url =  MAIN_URL + '/auth/regmahasiswa';
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
    } catch(err){
        console.log(err);
    }
}

/** Edit User */
exports.edit = async (req, res, dataputs) => {
    // try{
    //     const { modalid, modalnama, modalemail } = req.body;
    //     if(modalid && modalemail && modalnama){
    //         params = {
    //             id: modalid,
    //             nama: modalnama,
    //             email: modalemail
    //         }
    //         var res1 = res;
    //         url =  MAIN_URL + '/auth/edituser';
    //         var dataputs = await axios.put(url, params)
    //             .then(function (res) {
    //                 var message = res.data.message;
    //                 req.session.sessionFlash2 = {
    //                     type: 'success',
    //                     message: message
    //                 }
    //                 res1.redirect('/users');
    //             })
    //             .catch(function (err) {
    //                 var message = err.response.data.message;
    //                 req.session.sessionFlash = {
    //                     type: 'error',
    //                     message: message
    //                 }
    //                 res1.redirect("/users");
    //             })

    //     } else {
    //         req.session.sessionFlash = {
    //             type: 'error',
    //             message: 'Field tidak boleh kosong!'
    //         }
    //         res.redirect("/users");
    //     }

    // } catch(err){
    //     console.log(err);
    // }
}

/** Delete User */
exports.delete = async (req, res, dataputs) => {
    // try{
    //     const { modalidhapus } = req.body;
    //     if(modalidhapus){
    //         params = {
    //             id: modalidhapus
    //         }
    //         var res1 = res;
    //         url =  MAIN_URL + '/auth/deleteuser';
    //         var dataputs = await axios.put(url, params)
    //             .then(function (res) {
    //                 var message = res.data.message
    //                 req.session.sessionFlash2 = {
    //                     type: 'success',
    //                     message: message
    //                 }
    //                 res1.redirect('/users');
    //             })
    //             .catch(function (err) {
    //                 var message = err.response.data.message;
    //                 req.session.sessionFlash = {
    //                     type: 'error',
    //                     message: message
    //                 }
    //                 res1.redirect("/users");
    //             })
    //     } else {
    //         req.session.sessionFlash = {
    //             type: 'error',
    //             message: 'Field tidak boleh kosong!'
    //         }
    //         res.redirect("/users");
    //     }
    // } catch(err){
    //     console.log(err);
    // }
}