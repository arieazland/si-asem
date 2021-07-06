const Mysql = require("mysql");
const Path = require("path");
const axios = require('axios');
const Dotenv = require("dotenv");
Dotenv.config({ path: './.env' });
// process.env.MAIN_URL

/** insert assessment process */
exports.registerSatu = async (req, res, dataputs) => {
    try{
        const { idacara, iduser, idsoal, radio1, radio2, radio3, radio4, radio5, radio6, radio7, radio8, radio9, radio10, radio11, radio12, radio13, radio14, radio15, radio16, radio17, radio18, radio19, radio20, radio21, radio22, radio23, radio24, radio25, radio26, radio27, radio28, radio29, radio30 } = req.body;
        
        if(idacara && iduser && idsoal && radio1 && radio2 && radio3 && radio4 && radio5 && radio6 && radio7 && radio8 && radio9 && radio10 && radio11 && radio12 && radio13 && radio14 && radio15 && radio16 && radio17 && radio18 && radio19 && radio20 && radio21 && radio22 && radio23 && radio24 && radio25 && radio26 && radio27 && radio28 && radio29 && radio30){
            var radio = [];
            radio.push(radio1, radio2, radio3, radio4, radio5, radio6, radio7, radio8, radio9, radio10, radio11, radio12, radio13, radio14, radio15, radio16, radio17, radio18, radio19, radio20, radio21, radio22, radio23, radio24, radio25, radio26, radio27, radio28, radio29, radio30);
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
        const { idacara, iduser, idsoal, radio31, radio32, radio33, radio34, radio35, radio36, radio37, radio38, radio39, radio40, radio41, radio42, radio43, radio44, radio45, radio46, radio47, radio48, radio49, radio50, radio51, radio52, radio53, radio54, radio55 } = req.body;
        
        if(idacara && iduser && idsoal && radio31 && radio32 && radio33 && radio34 && radio35 && radio36 && radio37 && radio38 && radio39 && radio40 && radio41 && radio42 && radio43 && radio44 && radio45 && radio46 && radio47 && radio48 && radio49 && radio50 && radio51 && radio52 && radio53 && radio54 && radio55){
            var radio = [];
            radio.push(radio31, radio32, radio33, radio34, radio35, radio36, radio37, radio38, radio39, radio40, radio41, radio42, radio43, radio44, radio45, radio46, radio47, radio48, radio49, radio50, radio51, radio52, radio53, radio54, radio55);
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
        const { idacara, iduser, idsoal, radio56, radio57, radio58, radio59, radio60, radio61, radio62, radio63, radio64, radio65, radio66, radio67, radio68, radio69, radio70, radio71, radio72, radio73, radio74, radio75, radio76, radio77, radio78, radio79, radio80, radio81, radio82, radio83, radio84, radio85, radio86, radio87, radio88, radio89, radio90, radio91, radio92, radio93, radio94, radio95, radio96, radio97 } = req.body;
        
        if(idacara && iduser && idsoal && radio56 && radio57 && radio58 && radio59 && radio60 && radio61 && radio62 && radio63 && radio64 && radio65 && radio66 && radio67 && radio68 && radio69 && radio70 && radio71 && radio72 && radio73 && radio74 && radio75 && radio76 && radio77 && radio78 && radio79 && radio80 && radio81 && radio82 && radio83 && radio84 && radio85 && radio86 && radio87 && radio88 && radio89 && radio90 && radio91 && radio92 && radio93 && radio94 && radio95 && radio96 && radio97){
            var radio = [];
            radio.push(radio56, radio57, radio58, radio59, radio60, radio61, radio62, radio63, radio64, radio65, radio66, radio67, radio68, radio69, radio70, radio71, radio72, radio73, radio74, radio75, radio76, radio77, radio78, radio79, radio80, radio81, radio82, radio83, radio84, radio85, radio86, radio87, radio88, radio89, radio90, radio91, radio92, radio93, radio94, radio95, radio96, radio97);
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
        const { idacara, iduser, idsoal, radio98, radio99, radio100, radio101, radio102, radio103, radio104, radio105, radio106, radio107, radio108, radio109, radio110, radio111, radio112, radio113, radio114, radio115, radio116, radio117, radio118, radio119, radio120, radio121, radio122, radio123, radio124, radio125, radio126, radio127, radio128, radio129, radio130, radio131, radio132, radio133, radio134, radio135, radio136, radio137, radio138, radio139, radio140, radio141, radio142, radio143, radio144, radio145, radio146, radio147  } = req.body;
        
        if(idacara && iduser && idsoal && radio98 && radio99 && radio100 && radio101 && radio102 && radio103 && radio104 && radio105 && radio106 && radio107 && radio108 && radio109 && radio110 && radio111 && radio112 && radio113 && radio114 && radio115 && radio116 && radio117 && radio118 && radio119 && radio120 && radio121 && radio122 && radio123 && radio124 && radio125 && radio126 && radio127 && radio128 && radio129 && radio130 && radio131 && radio132 && radio133 && radio134 && radio135 && radio136 && radio137 && radio138 && radio139 && radio140 && radio141 && radio142 && radio143 && radio144 && radio145 && radio146 && radio147){
            var radio = [];
            radio.push(radio98, radio99, radio100, radio101, radio102, radio103, radio104, radio105, radio106, radio107, radio108, radio109, radio110, radio111, radio112, radio113, radio114, radio115, radio116, radio117, radio118, radio119, radio120, radio121, radio122, radio123, radio124, radio125, radio126, radio127, radio128, radio129, radio130, radio131, radio132, radio133, radio134, radio135, radio136, radio137, radio138, radio139, radio140, radio141, radio142, radio143, radio144, radio145, radio146, radio147);
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
        const { idacara, iduser, idsoal, radio148, radio149, radio150, radio151, radio152, radio153, radio154, radio155, radio156, radio157, radio158, radio159, radio160, radio161, radio162, radio163, radio164, radio165, radio166, radio167, radio168, radio169, radio170, radio171, radio172, radio173, radio174, radio175, radio176, radio177, radio178, radio179, radio180, radio181, radio182, radio183, radio184, radio185, radio186, radio187, radio188, radio189, radio190, radio191  } = req.body;
        
        if(idacara && iduser && idsoal && radio148 && radio149 && radio150 && radio151 && radio152 && radio153 && radio154 && radio155 && radio156 && radio157 && radio158 && radio159 && radio160 && radio161 && radio162 && radio163 && radio164 && radio165 && radio166 && radio167 && radio168 && radio169 && radio170 && radio171 && radio172 && radio173 && radio174 && radio175 && radio176 && radio177 && radio178 && radio179 && radio180 && radio181 && radio182 && radio183 && radio184 && radio185 && radio186 && radio187 && radio188 && radio189 && radio190 && radio191){
            var radio = [];
            radio.push(radio148, radio149, radio150, radio151, radio152, radio153, radio154, radio155, radio156, radio157, radio158, radio159, radio160, radio161, radio162, radio163, radio164, radio165, radio166, radio167, radio168, radio169, radio170, radio171, radio172, radio173, radio174, radio175, radio176, radio177, radio178, radio179, radio180, radio181, radio182, radio183, radio184, radio185, radio186, radio187, radio188, radio189, radio190, radio191);
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