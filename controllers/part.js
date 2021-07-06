const Mysql = require("mysql");
const Path = require("path");
const axios = require('axios');
const Dotenv = require("dotenv");
Dotenv.config({ path: './.env' });
// process.env.MAIN_URL

/** insert part process */
exports.register = async (req, res, dataputs) => {
    try{
        const { nama, status } = req.body;

        if(nama && status ){
            if(status === 'aktif' || status === 'nonaktif'){
                params = {
                    namapart: nama,
                    statuspart: status
                    }
                var res1 = res;
                url =  process.env.MAIN_URL + '/part/regpart';
                var dataputs = await axios.post(url, params)
                .then(function (res) {
                    var message = res.data.message;
                    req.session.sessionFlash2 = {
                        type: 'success',
                        message: message
                    }
                    res1.redirect('/part');
                })
                .catch(function (err) {
                    /** get message from API */
                    var message = err.response.data.message;
                    req.session.sessionFlash = {
                        type: 'error',
                        message: message
                    }
                    res1.redirect("/part");
                })
            } else if(status === '-- Pilih Status Part --'){
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Harap pilih status part terlebih dahulu!'
                }
                res.redirect("/part");
            }else {
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Status part tidak tepat!'
                }
                res.redirect("/part");
            }
        } else {
            req.session.sessionFlash = {
                type: 'error',
                message: 'Field tidak boleh kosong!'
            }
            res.redirect("/part");
        }
    } catch (error) {
        // console.log(error);
        /** catch */
        req.session.sessionFlash = {
            type: 'error',
            message: error
        }
        res.redirect("/part");
    }
}

/** edit part process */
exports.edit = async (req, res, dataputs) => {
    try{
        const { modalidpart, modalnamapart, modalstatuspart } = req.body;

        if(modalidpart && modalnamapart && modalstatuspart ){
            if(modalstatuspart === 'aktif' || modalstatuspart === 'nonaktif'){
                params = {
                    id: modalidpart,
                    namapart: modalnamapart,
                    statuspart: modalstatuspart
                    }
                var res1 = res;
                url =  process.env.MAIN_URL + '/part/editpart';
                var dataputs = await axios.put(url, params)
                .then(function (res) {
                    var message = res.data.message;
                    req.session.sessionFlash2 = {
                        type: 'success',
                        message: message
                    }
                    res1.redirect('/part');
                })
                .catch(function (err) {
                    /** get message from API */
                    var message = err.response.data.message;
                    req.session.sessionFlash = {
                        type: 'error',
                        message: message
                    }
                    res1.redirect("/part");
                })
            } else if(modalstatuspart === '-- Pilih Status Part --'){
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Harap pilih status part terlebih dahulu!'
                }
                res.redirect("/part");
            }else {
                req.session.sessionFlash = {
                    type: 'error',
                    message: 'Status part tidak tepat!'
                }
                res.redirect("/part");
            }
        } else {
            req.session.sessionFlash = {
                type: 'error',
                message: 'Field tidak boleh kosong!'
            }
            res.redirect("/part");
        }
    } catch (error) {
        // console.log(error);
        /** catch */
        req.session.sessionFlash = {
            type: 'error',
            message: error
        }
        res.redirect("/part");
    }
}

/** delete part process */
exports.delete = async (req, res, dataputs) => {
    try{
        const { modalidparthapus } = req.body;

        if(modalidparthapus ){
            params = {
                id: modalidparthapus
                }
            var res1 = res;
            url =  process.env.MAIN_URL + '/part/deletepart';
            var dataputs = await axios.put(url, params)
            .then(function (res) {
                var message = res.data.message;
                req.session.sessionFlash2 = {
                    type: 'success',
                    message: message
                }
                res1.redirect('/part');
            })
            .catch(function (err) {
                /** get message from API */
                var message = err.response.data.message;
                req.session.sessionFlash = {
                    type: 'error',
                    message: message
                }
                res1.redirect("/part");
            })
        } else {
            req.session.sessionFlash = {
                type: 'error',
                message: 'Field tidak boleh kosong!'
            }
            res.redirect("/part");
        }
    } catch (error) {
        // console.log(error);
        /** catch */
        req.session.sessionFlash = {
            type: 'error',
            message: error
        }
        res.redirect("/part");
    }
}