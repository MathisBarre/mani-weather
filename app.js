/********************  Init  ***********************/

var formElt = document.getElementById("form");
var mainElt = document.getElementById("main");
var inputElt = document.getElementById("input");
var loaderElt = document.getElementsByClassName("lds-ring")[0];
var data, templateDocument
async function ajaxGet(url, type, callback) {
   const req = new XMLHttpRequest();
   req.open("GET", url);
   req.responseType = type;
   req.onload = function (e) {
      if (req.status >= 200 && req.status < 400) {
         callback(req.response);
      } else {
         console.error(req.status + " " + req.statusText + " on " + req.responseURL);
      }
   }
   req.onerror = function (e) {
      console.error("Erreur réseau");
   }
   req.send();
};

/********************* app *************************/

formElt.addEventListener("submit", onSubmit);

function onSubmit (e = null) {
   loaderElt.style.display = "block";
   if (e !== null) { e.preventDefault() };
   ajaxGet("https://www.prevision-meteo.ch/services/json/" + inputElt.value , "application/json", onDataGet );
}

function onDataGet (reponse) {
   data = JSON.parse(reponse);
   templateDocument = ajaxGet('/template.html', "text/html", onTemplateGet)
};

function onTemplateGet(reponse) {
   loaderElt.style.display = "none"
   var output = ejs.render(reponse, {data: data});
   
   mainElt.innerHTML = output;
};

onSubmit();