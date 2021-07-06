const Mysql = require("mysql");
const Path = require("path");
const axios = require('axios');
const Dotenv = require("dotenv");
Dotenv.config({ path: './.env' });
// process.env.MAIN_URL

/** insert aspek process */
exports.register = async (req, res, dataputs) => {

}

exports.edit = async (req, res, dataputs) => {
    try{
        const { modalidsoal, modalnamasoal, modalidaspek } = req.body

        if(modalidsoal && modalnamasoal && modalidaspek){
            params = {
                idsoal: modalidsoal,
                soal: modalnamasoal,
                idaspek : modalidaspek
            }
            var res1 = res;
            url =  process.env.MAIN_URL + '/soal/editsoal';
            var dataputs = await axios.put(url, params)
            .then(function (res) {
                var message = res.data.message;
                req.session.idaspek = res.data.idaspek;
                req.session.sessionFlash2 = {
                    type: 'success',
                    message: message
                }
                res1.redirect('/soal');
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
            res.redirect("/soal");
        }
    } catch(error) {
        req.session.sessionFlash = {
            type: 'error',
            message: error
        }
        res.redirect("/soal");
    }
}

exports.delete = async (req, res, dataputs) => {
    
}