/********************  Init  ***********************/

var formElt = document.getElementById("form");
var mainElt = document.getElementById("main");
var inputElt = document.getElementById("searchBar");
//var loaderElt = document.getElementsByClassName("lds-ring")[0];
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
   //loaderElt.style.display = "block";
   if (e !== null) { e.preventDefault() };
   ajaxGet("https://www.prevision-meteo.ch/services/json/" + inputElt.value , "application/json", onDataGet );
}

function onDataGet (reponse) {
   data = JSON.parse(reponse);
   templateDocument = ajaxGet('/template.html', "text/html", onTemplateGet)
};

function onTemplateGet(reponse) {
   //loaderElt.style.display = "none"
   var output = ejs.render(reponse, {data: data});
   
   mainElt.innerHTML = output;
};

/********************* chart *************************/

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['1h00', '2h00', '3h00', '4h00','5h00','6h00','7h00','8h00','9h00','10h00','11h00','12h00'],
        datasets: [{
            label: 'Vitesse du vent',
            data: [12, 19, 3, 5, 2, 3],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        },
        {
         label: 'Température',
         data: [25, 19, 56, 52, 90, 3,25, 19, 56, 52, 90, 3,25, 19, 56, 52, 90, 3],
         borderColor: [
             'rgba(54, 162, 235, 1)'
         ],
         borderWidth: 1
     }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});