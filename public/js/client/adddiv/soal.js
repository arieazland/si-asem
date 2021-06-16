document.getElementById("tambahpertanyaan").onclick = function() {
  var aContainer = document.createElement('div');
  aContainer.setAttribute('class', 'form-group remove');
  aContainer.innerHTML = "<textarea class=\"form-control\" name=\"pertanyaan\" id=\"pertanyaan\" rows=\"10\"></textarea>";
  document.getElementById('form-group').appendChild(aContainer);
  $("#hapuspertanyaan").show();
}

document.getElementById("hapuspertanyaan").onclick = function() {
  var node = document.getElementById('form-group');
  if (node.hasChildNodes())
    node.removeChild(node.lastChild);
}