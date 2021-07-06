const Mysql = require("mysql");
const Path = require("path");
const axios = require('axios');
const Dotenv = require("dotenv");
Dotenv.config({ path: './.env' });
// process.env.MAIN_URL

/** insert partisipan process */
exports.register = async (req, res, dataputs) => {
    try{
        const { selectpartisipan, selectacara } = req.body;

        if(selectpartisipan && selectacara){
            params = {
                iduser: selectpartisipan,
                idacara: selectacara
            }
            var res1 = res;
            url = process.env.MAIN_URL + '/partisipant/regpartisipant';
            var dataputs = await axios.post(url, params)
            .then(function(res) {
                var message = res.data.message;
                req.session.idacara = res.data.idacara
                req.session.sessionFlash2 = {
                    type: 'success',
                    message: message
                }
                res1.redirect('/partisipan');
            })
            .catch(function(errorr) {
                /** get message from API */
                var message = err.response.data.message;
                req.session.idacara = err.response.data.idacara
                req.session.sessionFlash = {
                    type: 'error',
                    message: message
                }
                res1.redirect("/partisipan");
            })
        } else if(!selectpartisipan) {
            /** Field kosong */
            req.session.idacara = selectacara
            req.session.sessionFlash = {
                type: 'error',
                message: 'harap pilih psikolog terlebih dahulu!'
            }
            res.redirect("/partisipan");
        } else {
            /** Field kosong */
            req.session.sessionFlash = {
                type: 'error',
                message: 'Field tidak boleh kosong!'
            }
            res.redirect("/partisipan");
        }
    } catch(error) {
        /** send error */
        req.session.sessionFlash = {
            type: 'error',
            message: error
        }
        res.redirect("/partisipan");
    }
}

/** delete partisipan process */
exports.delete = async (req, res, dataputs) => {
    try{
        const{ selectacara, modalidpartisipanhapus, selectuser } = req.body;

        if(selectacara && modalidpartisipanhapus && selectuser){
            params = {
                idpartisipant: modalidpartisipanhapus,
                iduser: selectuser,
                idacara: selectacara
            }
            var res1 = res;
            url = process.env.MAIN_URL + '/partisipant/deletepartisipant';
            var dataputs = await axios.put(url, params)
            .then(function(res) {
                var message = res.data.message;
                req.session.idacara = res.data.idacara
                req.session.sessionFlash2 = {
                    type: 'success',
                    message: message
                }
                res1.redirect('/partisipan');
            })
            .catch(function(errorr) {
                /** get message from API */
                var message = err.response.data.message;
                req.session.idacara = err.response.data.idacara
                req.session.sessionFlash = {
                    type: 'error',
                    message: message
                }
                res1.redirect("/partisipan");
            })
        } else {
            /** field kosong */
            req.session.sessionFlash = {
                type: 'error',
                message: "Field tidak boleh kosong!"
            }
            res.redirect("/partisipan");
        }

    } catch(error) {
        /** send error */
        req.session.sessionFlash = {
            type: 'error',
            message: error
        }
        res.redirect("/partisipan");
    }
}