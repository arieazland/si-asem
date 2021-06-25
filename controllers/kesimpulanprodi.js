const Mysql = require("mysql");
const Path = require("path");
const Dotenv = require("dotenv");
const Bcrypt = require('bcrypt');
const axios = require('axios');
const MAIN_URL = require ("../urlconfig.js");

/** insert kesimpulan process */
exports.register = async (req, res, dataputs) => {
    try{
        const { idacara, namaprodi, namafakultas, idpsikolog, kesimpulanprodi } = req.body

        if(idacara && namaprodi && namafakultas && idpsikolog, kesimpulanprodi){
            params = {
                idacara: idacara,
                namaprodi: namaprodi,
                namafakultas: namafakultas,
                idpsikolog: idpsikolog,
                kesimpulanprodi: kesimpulanprodi
            }
            var res1 = res;
            url =  MAIN_URL + '/kesimpulanprodi/regconc';
            var dataputs = await axios.post(url, params)
            .then(function (res) {
                var message = res.data.message;
                req.session.idacara = res.data.idacara
                req.session.sessionFlash2 = {
                    type: 'success',
                    message: message
                }
                res1.redirect('/hasilassessmentprodi');
            })
            .catch(function (err) {
                /** get message from API */
                var message = err.response.data.message;
                req.session.sessionFlash = {
                    type: 'error',
                    message: message
                }
                res1.redirect("/hasilassessmentprodi");
            })
        } else {
            req.session.sessionFlash = {
                type: 'error',
                message: 'Field tidak boleh kosong!'
            }
            res.redirect("/hasilassessmentprodi");
        }

    } catch(error) {
        req.session.sessionFlash = {
            type: 'error',
            message: error
        }
        res.redirect("/hasilassessmentprodi");
    }
}

exports.edit = async (req, res, dataputs) => {
    try{
        const { modalidkesimpulan, idprodi, idacara, idpsikolog, modalkesimpulan } = req.body

        if( modalidkesimpulan && idprodi && idacara && idpsikolog && modalkesimpulan){
            params = {
                idkesimpulan: modalidkesimpulan,
                idprodi: idprodi,
                idacara: idacara,
                idpsikolog: idpsikolog,
                kesimpulan: modalkesimpulan
            }
            var res1 = res;
            url =  MAIN_URL + '/kesimpulanprodi/editconc';
            var dataputs = await axios.put(url, params)
            .then(function (res) {
                var message = res.data.message;
                req.session.idacara = res.data.idacara;
                req.session.idprodi = res.data.idprodi;
                req.session.sessionFlash2 = {
                    type: 'success',
                    message: message
                }
                res1.redirect('/kesimpulanassessmentprogramstudi');
            })
            .catch(function (err) {
                /** get message from API */
                var message = err.response.data.message;
                req.session.sessionFlash = {
                    type: 'error',
                    message: message
                }
                res1.redirect("/kesimpulanassessmentprodi");
            })
        } else {
            req.session.sessionFlash = {
                type: 'error',
                message: 'Field tidak boleh kosong!'
            }
            res.redirect("/kesimpulanassessmentprodi");
        }

    } catch(error) {
        req.session.sessionFlash = {
            type: 'error',
            message: error
        }
        res.redirect("/kesimpulanassessmentprodi");
    }
}

exports.delete = async (req, res, dataputs) => {
    try{
        const { modalidkesimpulanhapus, idacara, idprodi } = req.body

        if( modalidkesimpulanhapus && idacara  && idprodi){
            params = {
                idkesimpulan: modalidkesimpulanhapus,
                idacara: idacara,
                idprodi: idprodi,
            }
            var res1 = res;
            url =  MAIN_URL + '/kesimpulanprodi/deleteconc';
            var dataputs = await axios.put(url, params)
            .then(function (res) {
                var message = res.data.message;
                req.session.idacara = res.data.idacara
                req.session.sessionFlash2 = {
                    type: 'success',
                    message: message
                }
                res1.redirect('/kesimpulanassessmentprodi');
            })
            .catch(function (err) {
                /** get message from API */
                var message = err.response.data.message;
                req.session.sessionFlash = {
                    type: 'error',
                    message: message
                }
                res1.redirect("/kesimpulanassessmentprodi");
            })
        } else {
            req.session.sessionFlash = {
                type: 'error',
                message: 'Field tidak boleh kosong!'
            }
            res.redirect("/kesimpulanassessmentprodi");
        }

    } catch(error) {
        req.session.sessionFlash = {
            type: 'error',
            message: error
        }
        res.redirect("/kesimpulanassessmentprodi");
    }
}