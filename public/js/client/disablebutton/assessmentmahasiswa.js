function Disable(idform, idbutton1, idbutton2){
    $(document).ready(function () {

        $('#'+idform).submit(function (e) {

            //stop submitting the form to see the disabled button effect
            // e.preventDefault();

            //disable the submit button
            $('#'+idbutton1).attr("disabled", true);

            //disable a rest button
            $('#'+idbutton2).attr("disabled", true);

            return true;

        });
    });
}

var idform = "simpanjawaban";
var idbutton1 = "tombolsimpan";
var idbutton2 = "tombolreset";
Disable(idform, idbutton1, idbutton2);

var idform = "formpilihacara";
var idbutton1 = "tombolsimpan2";
var idbutton2 = "tombolreset2";
Disable(idform, idbutton1, idbutton2);