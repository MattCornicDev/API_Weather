// Récupérer le noeud correspondant à l'id result
var affichage = document.querySelector('#result');
var recup = document.querySelector('#recup_ville');
var envoyer = document.querySelector('#envoie');
var icon = document.querySelector("#icon");

// var idIcon = "http://openweathermap.org/img/wn/10d@2x.png";

envoyer.addEventListener('click', getTemp);

// Déclaration et initialisation des variables utiles
var meteo; // données au format json
var temp = 20; // température
var ville = ""; // ville
var icon;

function getTemp() {
    ville = recup.value;
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + ville + ",france&lang=fr&units=metric&appid=ce385607a5755d07012416f5d315a3d0";

    var req = fetch(url);

req.then(function(response){response.text().then(function(meteo){

    var objMeteo = JSON.parse(meteo);

    temp = objMeteo.main.temp;
    ville2 = objMeteo.name;
    idIcon = objMeteo.weather[0].icon;
    icon.src = "http://openweathermap.org/img/wn/"+ idIcon +"@2x.png";
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + recup +
            ",france&lang=fr&units=metric&appid=eb3bb071a70595d1052688dd6c14251f";

    console.log(temp);
    console.log(meteo);
    console.log(idIcon);

    affichage.innerHTML = "Resultat : A " + ville2 + " la temperature est de " + temp;

    let lat = objMeteo.coord.lat;
    let lon = objMeteo.coord.lon;
    alert(lon);
    alert(lat);

    mymap = L.map('map').setView([lat, lon], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
                        attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
                        minZoom: 1,
                        maxZoom: 12,
                    }

                    ).addTo(mymap);
let marker = L.marker([lat, lon]).addTo(mymap);

});

}).catch(error => alert("Erreur : " + error));
}



// var url = "https://api.openweathermap.org/data/2.5/weather?q=" +recup + ",france&lang=fr&units=metric&appid=ce385607a5755d07012416f5d315a3d0";

    
//var req = new XMLHttpRequest();
//req.open("GET",url);



/*

// defiinition de la fonction a executer 
req.onload = function() {
    if (req.status >= 200 && req.status < 400) { // le serveur a réussi a traité la req
        meteo = req.responseText;
        var objMeteo = JSON.parse(meteo);
        temp = objMeteo.main.temp;
        ville = objMeteo.name;
        console.log(temp);

        affichage.innerHTML = "Resultat : A " + ville + " la temperature est de " + temp;
        
    }
    else {
        console.error(req.status + '' + req.statusText);

        req.addEventListener(error, function(){
            console.error("erreur reseau");
        } );
    
    }

}
req.send(null);
*/
