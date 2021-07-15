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

// form tambah user
var idform = "tambahacara";
var idbutton1 = "sumbittambahacara";
var idbutton2 = "resettambahacara";
Disable(idform, idbutton1, idbutton2);