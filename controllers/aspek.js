const Mysql = require("mysql");
const Path = require("path");
const Dotenv = require("dotenv");
const Bcrypt = require('bcrypt');
const axios = require('axios');
const MAIN_URL = require ("../urlconfig.js");

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
                url =  MAIN_URL + '/aspek/regaspek';
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
        // console.log(error);
        /** catch */
        req.session.sessionFlash = {
            type: 'error',
            message: error
        }
        res.redirect("/aspek");
    }
}

/** edit aspek process */
exports.edit = async (req, res, dataputs) => {

}

/** delete aspek process */
exports.delete = async (req, res, dataputs) => {

}