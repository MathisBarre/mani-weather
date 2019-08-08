/********************  Init  ***********************/

var formElt = document.getElementById("form");
var searchBarElt = document.getElementById("searchBar");
var loadingElt = document.getElementsByClassName("loading")[0];
var template = document.getElementsByTagName("template")[0];
var APIdata

/********************* app *************************/

function onSubmit(e = null) {
   if (e !== null) { e.preventDefault() };
   loadingElt.style.display = "block";
   // "https://jsonplaceholder.typicode.com/users"
   // Ajax weather API
   fetch("https://www.prevision-meteo.ch/services/json/" + searchBarElt.value)
      .then(response => {
         console.log("then 1")
         if (response.ok) {
            return response.json();
         } else {
            console.error("error");
         }
      })
      .then(apiJson => {
         console.log("then 2")
         loadingElt.style.display = "none";
         console.info("Weather data acquired");
         
         renderTemplate(apiJson);
      })
      .catch(function() { console.error("error to acquired data") })
}

function renderTemplate(data) {
   console.log("rendering...")
   let render = ejs.render(template.innerHTML, {data: data});
   console.log(render);
   console.log(data);
   
   
}

formElt.addEventListener("submit", onSubmit);

/********************* chart ************************
var dataTodayTemp = [12, 19, 3, 5, 2, 3]

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
   type: 'line',
   data: {
      labels: ['1h00', '2h00', '3h00', '4h00', '5h00', '6h00', '7h00', '8h00', '9h00', '10h00', '11h00', '12h00'],
      datasets: [{
         label: 'Vitesse du vent',
         data: dataTodayTemp,
         borderColor: [
            'rgba(255, 99, 132, 1)'
         ],
         borderWidth: 1
      },
      {
         label: 'Température',
         data: [25, 19, 56, 52, 90, 3, 25, 19, 56, 52, 90, 3, 25, 19, 56, 52, 90, 3],
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
});*/