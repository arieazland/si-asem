var os = require('os');
var MAIN_URL = null;

if(os.hostname().indexOf("local") > -1){
    var MAIN_URL = 'http://localhost:5025';
}else{
    var MAIN_URL = '';
}

module.exports = MAIN_URL;