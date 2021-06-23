const Mysql = require("mysql");
const Path = require("path");
const Dotenv = require("dotenv");
const Bcrypt = require('bcrypt');
const axios = require('axios');
const MAIN_URL = require ("../urlconfig.js");

/** insert kesimpulan process */
exports.register = async (req, res, dataputs) => {
    try{
        const { idacara, idpsikolog, idmahasiswa, kesimpulanmahasiswa } = req.body

        if(idacara && idpsikolog && idmahasiswa && kesimpulanmahasiswa){
            params = {
                idacara: idacara,
                idpsikolog: idpsikolog,
                idmahasiswa: idmahasiswa,
                kesimpulan: kesimpulanmahasiswa
            }
            var res1 = res;
            url =  MAIN_URL + '/kesimpulan/regconc';
            var dataputs = await axios.post(url, params)
            .then(function (res) {
                var message = res.data.message;
                req.session.idacara = res.data.idacara
                req.session.sessionFlash2 = {
                    type: 'success',
                    message: message
                }
                res1.redirect('/hasilassessment');
            })
            .catch(function (err) {
                /** get message from API */
                var message = err.response.data.message;
                req.session.sessionFlash = {
                    type: 'error',
                    message: message
                }
                res1.redirect("/hasilassessment");
            })
        } else {
            req.session.sessionFlash = {
                type: 'error',
                message: 'Field tidak boleh kosong!'
            }
            res.redirect("/hasilassessment");
        }

    } catch(error) {
        req.session.sessionFlash = {
            type: 'error',
            message: error
        }
        res.redirect("/hasilassessment");
    }
}

exports.edit = async (req, res, dataputs) => {

}

exports.delete = async (req, res, dataputs) => {

}