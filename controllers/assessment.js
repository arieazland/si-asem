const Mysql = require("mysql");
const Path = require("path");
const axios = require('axios');
const Dotenv = require("dotenv");
Dotenv.config({ path: './.env' });
// process.env.MAIN_URL

/** insert assessment process */
exports.registerSatu = async (req, res, dataputs) => {
    try{
        const { idacara, iduser, idsoal, radio1, radio2, radio3, radio4, radio5, radio6, radio7, radio8, radio9, radio10, radio11, radio12, radio13, radio14, radio15 } = req.body;
        
        if(idacara && iduser && idsoal && radio1 && radio2 && radio3 && radio4 && radio5 && radio6 && radio7 && radio8 && radio9 && radio10 && radio11 && radio12 && radio13 && radio14 && radio15){
            var radio = [];
            radio.push(radio1, radio2, radio3, radio4, radio5, radio6, radio7, radio8, radio9, radio10, radio11, radio12, radio13, radio14, radio15);
            params = {
                idacara : idacara, iduser : iduser, idsoal : idsoal, radio : radio
            }
            var res1 = res;
            url =  process.env.MAIN_URL + '/assessment/registrasijawaban';
            var dataputs = await axios.post(url, params)
            .then(function (res) {
                var message = res.data.message;
                req.session.idacara = res.data.idacara;
                req.session.sessionFlash2 = {
                    type: 'success',
                    message: message
                }
                res1.redirect('/assessmentmahasiswa');
            })
            .catch(function (err) {
                /** get message from API */
                var message = err.response.data.message;
                req.session.sessionFlash = {
                    type: 'error',
                    message: message
                }
                res1.redirect("/assessmentmahasiswa");
            })
        } else {
            req.session.sessionFlash = {
                type: 'error',
                message: 'Field tidak boleh kosong brooh!'
            }
            res.redirect("/assessmentmahasiswa");
        }

    } catch (error) {
        req.session.sessionFlash = {
            type: 'error',
            message: error
        }
        res.redirect("/assessmentmahasiswa");
    }
}

exports.registerDua = async (req, res, dataputs) => {
    try{
        const { idacara, iduser, idsoal, radio16, radio17, radio18, radio19, radio20, radio21, radio22, radio23, radio24, radio25, radio26, radio27, radio28, radio29, radio30, radio31, radio32, radio33, radio34, radio35 } = req.body;
        
        if(idacara && iduser && idsoal && radio16 && radio17 && radio18 && radio19 && radio20 && radio21 && radio22 && radio23 && radio24 && radio25 && radio26 && radio27 && radio28 && radio29 && radio30 && radio31 && radio32 && radio33 && radio34 && radio35){
            var radio = [];
            radio.push(radio16, radio17, radio18, radio19, radio20, radio21, radio22, radio23, radio24, radio25, radio26, radio27, radio28, radio29, radio30, radio31, radio32, radio33, radio34, radio35);
            params = {
                idacara : idacara, iduser : iduser, idsoal : idsoal, radio : radio
            }
            var res1 = res;
            url =  process.env.MAIN_URL + '/assessment/registrasijawaban';
            var dataputs = await axios.post(url, params)
            .then(function (res) {
                var message = res.data.message;
                req.session.idacara = res.data.idacara;
                req.session.sessionFlash2 = {
                    type: 'success',
                    message: message
                }
                res1.redirect('/assessmentmahasiswa');
            })
            .catch(function (err) {
                /** get message from API */
                var message = err.response.data.message;
                req.session.sessionFlash = {
                    type: 'error',
                    message: message
                }
                res1.redirect("/assessmentmahasiswa");
            })
        } else {
            req.session.sessionFlash = {
                type: 'error',
                message: 'Field tidak boleh kosong brooh!'
            }
            res.redirect("/assessmentmahasiswa");
        }

    } catch (error) {
        req.session.sessionFlash = {
            type: 'error',
            message: error
        }
        res.redirect("/assessmentmahasiswa");
    }
}

exports.registerTiga = async (req, res, dataputs) => {
    try{
        const { idacara, iduser, idsoal, radio36, radio37, radio38, radio39, radio40, radio41, radio42, radio43, radio44, radio45, radio46, radio47, radio48, radio49 } = req.body;
        
        if(idacara && iduser && idsoal && radio36 && radio37 && radio38 && radio39 && radio40 && radio41 && radio42 && radio43 && radio44 && radio45 && radio46 && radio47 && radio48 && radio49){
            var radio = [];
            radio.push(radio36, radio37, radio38, radio39, radio40, radio41, radio42, radio43, radio44, radio45, radio46, radio47, radio48, radio49);
            params = {
                idacara : idacara, iduser : iduser, idsoal : idsoal, radio : radio
            }
            var res1 = res;
            url =  process.env.MAIN_URL + '/assessment/registrasijawaban';
            var dataputs = await axios.post(url, params)
            .then(function (res) {
                var message = res.data.message;
                req.session.idacara = res.data.idacara;
                req.session.sessionFlash2 = {
                    type: 'success',
                    message: message
                }
                res1.redirect('/assessmentmahasiswa');
            })
            .catch(function (err) {
                /** get message from API */
                var message = err.response.data.message;
                req.session.sessionFlash = {
                    type: 'error',
                    message: message
                }
                res1.redirect("/assessmentmahasiswa");
            })
        } else {
            req.session.sessionFlash = {
                type: 'error',
                message: 'Field tidak boleh kosong brooh!'
            }
            res.redirect("/assessmentmahasiswa");
        }

    } catch (error) {
        req.session.sessionFlash = {
            type: 'error',
            message: error
        }
        res.redirect("/assessmentmahasiswa");
    }
}

exports.registerEmpat = async (req, res, dataputs) => {
    try{
        const { idacara, iduser, idsoal, radio50, radio51, radio52, radio53, radio54, radio55, radio56, radio57, radio58, radio59, radio60, radio61, radio62, radio63, radio64, radio65, radio66, radio67, radio68, radio69  } = req.body;
        
        if(idacara && iduser && idsoal && radio50 && radio51 && radio52 && radio53 && radio54 && radio55 && radio56 && radio57 && radio58 && radio59 && radio60 && radio61 && radio62 && radio63 && radio64 && radio65 && radio66 && radio67 && radio68 && radio69){
            var radio = [];
            radio.push(radio50, radio51, radio52, radio53, radio54, radio55, radio56, radio57, radio58, radio59, radio60, radio61, radio62, radio63, radio64, radio65, radio66, radio67, radio68, radio69);
            params = {
                idacara : idacara, iduser : iduser, idsoal : idsoal, radio : radio
            }
            var res1 = res;
            url =  process.env.MAIN_URL + '/assessment/registrasijawaban';
            var dataputs = await axios.post(url, params)
            .then(function (res) {
                var message = res.data.message;
                req.session.idacara = res.data.idacara;
                req.session.sessionFlash2 = {
                    type: 'success',
                    message: message
                }
                res1.redirect('/assessmentmahasiswa');
            })
            .catch(function (err) {
                /** get message from API */
                var message = err.response.data.message;
                req.session.sessionFlash = {
                    type: 'error',
                    message: message
                }
                res1.redirect("/assessmentmahasiswa");
            })
        } else {
            req.session.sessionFlash = {
                type: 'error',
                message: 'Field tidak boleh kosong brooh!'
            }
            res.redirect("/assessmentmahasiswa");
        }

    } catch (error) {
        req.session.sessionFlash = {
            type: 'error',
            message: error
        }
        res.redirect("/assessmentmahasiswa");
    }
}

exports.registerLima = async (req, res, dataputs) => {
    try{
        const { idacara, iduser, idsoal, radio70, radio71, radio72, radio73, radio74, radio75, radio76, radio77, radio78, radio79, radio80, radio81, radio82, radio83, radio84, radio85, radio86, radio87, radio88, radio89, radio90, radio91, radio92, radio93, radio94, radio95, radio96, radio97, radio98, radio99, radio100, radio101, radio102, radio103, radio104, radio105   } = req.body;
        
        if(idacara && iduser && idsoal && radio70 && radio71 && radio72 && radio73 && radio74 && radio75 && radio76 && radio77 && radio78 && radio79 && radio80 && radio81 && radio82 && radio83 && radio84 && radio85 && radio86 && radio87 && radio88 && radio89 && radio90 && radio91 && radio92 && radio93 && radio94 && radio95 && radio96 && radio97 && radio98 && radio99 && radio100 && radio101 && radio102 && radio103 && radio104 && radio105){
            var radio = [];
            radio.push(radio70, radio71, radio72, radio73, radio74, radio75, radio76, radio77, radio78, radio79, radio80, radio81, radio82, radio83, radio84, radio85, radio86, radio87, radio88, radio89, radio90, radio91, radio92, radio93, radio94, radio95, radio96, radio97, radio98, radio99, radio100, radio101, radio102, radio103, radio104, radio105);
            params = {
                idacara : idacara, iduser : iduser, idsoal : idsoal, radio : radio
            }
            var res1 = res;
            url =  process.env.MAIN_URL + '/assessment/registrasijawaban';
            var dataputs = await axios.post(url, params)
            .then(function (res) {
                var message = res.data.message;
                req.session.idacara = res.data.idacara;
                req.session.sessionFlash2 = {
                    type: 'success',
                    message: "Assessment selesai, silahkan logout. Terima kasih"
                }
                res1.redirect('/assessmentmahasiswa');
            })
            .catch(function (err) {
                /** get message from API */
                var message = err.response.data.message;
                req.session.sessionFlash = {
                    type: 'error',
                    message: message
                }
                res1.redirect("/assessmentmahasiswa");
            })
        } else {
            req.session.sessionFlash = {
                type: 'error',
                message: 'Field tidak boleh kosong brooh!'
            }
            res.redirect("/assessmentmahasiswa");
        }

    } catch (error) {
        req.session.sessionFlash = {
            type: 'error',
            message: error
        }
        res.redirect("/assessmentmahasiswa");
    }
}