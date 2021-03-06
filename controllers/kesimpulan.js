const Mysql = require("mysql");
const Path = require("path");
const axios = require('axios');
const Dotenv = require("dotenv");
Dotenv.config({ path: './.env' });
// process.env.MAIN_URL

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
            url =  process.env.MAIN_URL + '/kesimpulan/regconc';
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
    try{
        const { modalidkesimpulan, idacara, idpsikolog, idmahasiswa, modalkesimpulan } = req.body

        if( modalidkesimpulan && idacara && idpsikolog && idmahasiswa && modalkesimpulan){
            params = {
                idkesimpulan: modalidkesimpulan,
                idacara: idacara,
                idpsikolog: idpsikolog,
                idmahasiswa: idmahasiswa,
                kesimpulan: modalkesimpulan
            }
            var res1 = res;
            url =  process.env.MAIN_URL + '/kesimpulan/editconc';
            var dataputs = await axios.put(url, params)
            .then(function (res) {
                var message = res.data.message;
                req.session.idacara = res.data.idacara;
                req.session.idmahasiswa = res.data.idmahasiswa;
                req.session.sessionFlash2 = {
                    type: 'success',
                    message: message
                }
                res1.redirect('/kesimpulanassessmentmahasiswa');
            })
            .catch(function (err) {
                /** get message from API */
                var message = err.response.data.message;
                req.session.sessionFlash = {
                    type: 'error',
                    message: message
                }
                res1.redirect("/kesimpulanassessment");
            })
        } else {
            req.session.sessionFlash = {
                type: 'error',
                message: 'Field tidak boleh kosong!'
            }
            res.redirect("/kesimpulanassessment");
        }

    } catch(error) {
        req.session.sessionFlash = {
            type: 'error',
            message: error
        }
        res.redirect("/kesimpulanassessment");
    }
}

exports.delete = async (req, res, dataputs) => {
    try{
        const { modalidkesimpulanhapus, idacara, idmahasiswa } = req.body

        if( modalidkesimpulanhapus && idacara  && idmahasiswa){
            params = {
                idkesimpulan: modalidkesimpulanhapus,
                idacara: idacara,
                idmahasiswa: idmahasiswa,
            }
            var res1 = res;
            url =  process.env.MAIN_URL + '/kesimpulan/deleteconc';
            var dataputs = await axios.put(url, params)
            .then(function (res) {
                var message = res.data.message;
                req.session.idacara = res.data.idacara
                req.session.sessionFlash2 = {
                    type: 'success',
                    message: message
                }
                res1.redirect('/kesimpulanassessment');
            })
            .catch(function (err) {
                /** get message from API */
                var message = err.response.data.message;
                req.session.sessionFlash = {
                    type: 'error',
                    message: message
                }
                res1.redirect("/kesimpulanassessment");
            })
        } else {
            req.session.sessionFlash = {
                type: 'error',
                message: 'Field tidak boleh kosong!'
            }
            res.redirect("/kesimpulanassessment");
        }

    } catch(error) {
        req.session.sessionFlash = {
            type: 'error',
            message: error
        }
        res.redirect("/kesimpulanassessment");
    }
}