const Mysql = require("mysql");
const Path = require("path");
const Dotenv = require("dotenv");
const Bcrypt = require('bcrypt');
const axios = require('axios');
const MAIN_URL = require ("../urlconfig.js");

/** insert acara process */
exports.register = async (req, res, dataputs) => {
    try{
        const { nama, tanggalmulai, tanggalakhir, status } = req.body;

        if(nama && tanggalmulai && tanggalakhir && status ){
            if(status === 'aktif' || status === 'nonaktif'){
                params = {
                    namaacara: nama,
                    tanggalmulai: tanggalmulai,
                    tanggalakhir: tanggalakhir,
                    statusacara: status
                    }
                var res1 = res;
                url =  MAIN_URL + '/acara/regAcara';
                var dataputs = await axios.post(url, params)
                .then(function (res) {
                    var message = res.data.message;
                    req.session.sessionFlash2 = {
                        type: 'success',
                        message: message
                    }
                    res1.redirect('/acara');
                })
                .catch(function (err) {
                    /** get message from API */
                    var message = err.response.data.message;
                    req.session.sessionFlash = {
                        type: 'error',
                        message: message
                    }
                    res1.redirect("/acara");
                })
            } else if(status === '-- Pilih Status Acara --'){
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Harap pilih status acara terlebih dahulu!'
                }
                res.redirect("/acara");
            }else {
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Status acara tidak tepat!'
                }
                res.redirect("/acara");
            }
        } else {
            req.session.sessionFlash = {
                type: 'error',
                message: 'Field tidak boleh kosong!'
            }
            res.redirect("/acara");
        }
    } catch (error) {
        // console.log(error);
        /** catch */
        req.session.sessionFlash = {
            type: 'error',
            message: error
        }
        res.redirect("/acara");
    }
}

/** edit acara process */
exports.edit = async (req, res, dataputs) => {
    try{
        const { modalidacara, modalnamaacara, modaltanggalmulaiacara, modaltanggalberakhiracara, modalstatusacara } = req.body;

        if(modalidacara && modalnamaacara && modaltanggalmulaiacara && modaltanggalberakhiracara && modalstatusacara ){
            if(modalstatusacara === 'aktif' || modalstatusacara === 'nonaktif'){
                params = {
                    id: modalidacara,
                    namaacara: modalnamaacara,
                    tanggalmulai: modaltanggalmulaiacara,
                    tanggalakhir: modaltanggalberakhiracara,
                    statusacara: modalstatusacara
                    }
                var res1 = res;
                url =  MAIN_URL + '/acara/editacara';
                var dataputs = await axios.put(url, params)
                .then(function (res) {
                    var message = res.data.message;
                    req.session.sessionFlash2 = {
                        type: 'success',
                        message: message
                    }
                    res1.redirect('/acara');
                })
                .catch(function (err) {
                    /** get message from API */
                    var message = err.response.data.message;
                    req.session.sessionFlash = {
                        type: 'error',
                        message: message
                    }
                    res1.redirect("/acara");
                })
            } else if(modalstatusacara === '-- Pilih Status Acara --'){
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Harap pilih status acara terlebih dahulu!'
                }
                res.redirect("/acara");
            }else {
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Status acara tidak tepat!'
                }
                res.redirect("/acara");
            }
        } else {
            req.session.sessionFlash = {
                type: 'error',
                message: 'Field tidak boleh kosong!'
            }
            res.redirect("/acara");
        }
    } catch (error) {
        // console.log(error);
        /** catch */
        req.session.sessionFlash = {
            type: 'error',
            message: error
        }
        res.redirect("/acara");
    }
}

/** delete acara process */
exports.delete = async (req, res, dataputs) => {
    try{
        const { modalidacarahapus } = req.body;

        if(modalidacarahapus ){
            params = {
                id: modalidacarahapus
                }
            var res1 = res;
            url =  MAIN_URL + '/acara/deleteacara';
            var dataputs = await axios.put(url, params)
            .then(function (res) {
                var message = res.data.message;
                req.session.sessionFlash2 = {
                    type: 'success',
                    message: message
                }
                res1.redirect('/acara');
            })
            .catch(function (err) {
                /** get message from API */
                var message = err.response.data.message;
                req.session.sessionFlash = {
                    type: 'error',
                    message: message
                }
                res1.redirect("/acara");
            })
        } else {
            req.session.sessionFlash = {
                type: 'error',
                message: 'Field tidak boleh kosong!'
            }
            res.redirect("/acara");
        }
    } catch (error) {
        // console.log(error);
        /** catch */
        req.session.sessionFlash = {
            type: 'error',
            message: error
        }
        res.redirect("/acara");
    }
}