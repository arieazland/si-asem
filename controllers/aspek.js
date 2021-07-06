const Mysql = require("mysql");
const Path = require("path");
const axios = require('axios');
const Dotenv = require("dotenv");
Dotenv.config({ path: './.env' });
// process.env.MAIN_URL

/** insert aspek process */
exports.register = async (req, res, dataputs) => {
    try{
        const { idpart, nama, status } = req.body;

        if(idpart && nama && status ){
            if(status === 'aktif' || status === 'nonaktif'){
                params = {
                    idpart: idpart,
                    nama : nama,
                    status: status
                    }
                var res1 = res;
                url =  process.env.MAIN_URL + '/aspek/regaspek';
                var dataputs = await axios.post(url, params)
                .then(function (res) {
                    var message = res.data.message;
                    req.session.idpart = res.data.idpart;
                    req.session.sessionFlash2 = {
                        type: 'success',
                        message: message
                    }
                    res1.redirect('/aspek');
                })
                .catch(function (err) {
                    /** get message from API */
                    var message = err.response.data.message;
                    req.session.sessionFlash = {
                        type: 'error',
                        message: message
                    }
                    res1.redirect("/aspek");
                })
            } else if(status === '-- Pilih Status Aspek --'){
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Harap pilih status aspek terlebih dahulu!'
                }
                res.redirect("/aspek");
            }else {
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Status acara tidak tepat!'
                }
                res.redirect("/aspek");
            }
        } else {
            req.session.sessionFlash = {
                type: 'error',
                message: 'Field tidak boleh kosong!'
            }
            res.redirect("/aspek");
        }
    } catch (error) {
        /** send error */
        req.session.sessionFlash = {
            type: 'error',
            message: error
        }
        res.redirect("/aspek");
    }
}

/** edit aspek process */
exports.edit = async (req, res, dataputs) => {
    try{

        const { modalidaspek, modalidpart, modalnamaaspek, modalstatusaspek } = req.body;

        if(modalidaspek && modalidpart && modalnamaaspek && modalstatusaspek ){
            if(modalstatusaspek === 'aktif' || modalstatusaspek === 'nonaktif'){
                params = {
                    idaspek: modalidaspek,
                    idpart: modalidpart,
                    nama : modalnamaaspek,
                    status: modalstatusaspek
                    }
                var res1 = res;
                url =  process.env.MAIN_URL + '/aspek/editaspek';
                var dataputs = await axios.put(url, params)
                .then(function (res) {
                    var message = res.data.message;
                    req.session.idpart = res.data.idpart;
                    req.session.sessionFlash2 = {
                        type: 'success',
                        message: message
                    }
                    res1.redirect('/aspek');
                })
                .catch(function (err) {
                    /** get message from API */
                    var message = err.response.data.message;
                    req.session.sessionFlash = {
                        type: 'error',
                        message: message
                    }
                    res1.redirect("/aspek");
                })
            } else if(status === '-- Pilih Status Aspek --'){
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Harap pilih status aspek terlebih dahulu!'
                }
                res.redirect("/aspek");
            }else {
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Status acara tidak tepat!'
                }
                res.redirect("/aspek");
            }
        } else {
            req.session.sessionFlash = {
                type: 'error',
                message: 'Field tidak boleh kosong!'
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
}

/** delete aspek process */
exports.delete = async (req, res, dataputs) => {
    try{
        const { modalidaspekhapus, modalidparthapus } = req.body;

        if(modalidaspekhapus && modalidparthapus ){
            params = {
                idaspek: modalidaspekhapus,
                idpart: modalidparthapus
            }
            var res1 = res;
            url =  process.env.MAIN_URL + '/aspek/deleteaspek';
            var dataputs = await axios.put(url, params)
            .then(function (res) {
                var message = res.data.message;
                req.session.idpart = res.data.idpart;
                req.session.sessionFlash2 = {
                    type: 'success',
                    message: message
                }
                res1.redirect('/aspek');
            })
            .catch(function (err) {
                /** get message from API */
                var message = err.response.data.message;
                req.session.sessionFlash = {
                    type: 'error',
                    message: message
                }
                res1.redirect("/aspek");
            })
        } else {
            req.session.sessionFlash = {
                type: 'error',
                message: 'Field tidak boleh kosong!'
            }
            res.redirect("/aspek");
        }
    } catch (error) {
        // console.log(error);
        /** catch */
        req.session.sessionFlash = {
            type: 'error',
            message: error
        }
        res.redirect("/aspek");
    }
}