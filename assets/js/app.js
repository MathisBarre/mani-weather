/********************  Init  ***********************/

var formElt =      document.getElementById("form");
var searchBarElt = document.getElementById("searchBar");
var loadingElt =   document.getElementsByClassName("loading")[0];
var mainElt =      document.querySelector("main");

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
   loadingElt.style.display = "block";
   if (e !== null) { e.preventDefault() };
   ajaxGet("https://www.prevision-meteo.ch/services/json/" + searchBarElt.value , "application/json", onDataGet );
}

function onDataGet (reponse) {
   APIdata = JSON.parse(reponse);
   templateDocument = ajaxGet('/template.html', "text/html", onTemplateGet);
};

function onTemplateGet(reponse) {
   loadingElt.style.display = "none";
   var output = ejs.render(reponse, APIdata);
   console.info("Template has been successfully rendered")
   mainElt.innerHTML = output;

   chartInit(APIdata);
};

/********************* chart *************************/

function createTableOfDataUsableInChart(APIdata) {
   var APIdataArray = []
   for (let y = 0; y < 5 ; y++) {
      var currentDay = "fcst_day_" + y;
      APIdataArray.push([]);
      for (i = 0 ; i < 24 ; i++ ) {
         let hours = i + "H00";
         
         APIdataArray[y].push(APIdata[currentDay].hourly_data[hours].TMP2m)
      }      
   }
   return APIdataArray;
}

function chartInit(APIdata) {

   let APIdataArray = createTableOfDataUsableInChart(APIdata);
   

   var ctx = document.getElementById('myChart').getContext('2d');
   var myChart = new Chart(ctx, {
      type: 'line',
      data: {
         labels: ['0H00', '1h00', '2h00', '3h00', '4h00', '5h00', '6h00', '7h00', '8h00', '9h00', '10h00', '11h00', '13h00', '14h00', '15h00', '16h00', '17h00', '18h00', '19h00', '20h00', '21h00', '22h00', '23h00'],
         datasets: [
         {
            label: 'Température',
            data: APIdataArray[0],
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


}