//declaration objet noeuds utilisés
n2 = document.querySelector('#ville');
n3 = document.querySelector('#valider');
n4 = document.querySelector('#result');
n5 = document.querySelector('#icon');

//abonne l'événement click du bouton à la fonction getTemp
n3.addEventListener('click', getTemp);

//Déclaration de variables
var meteo;
var temp=20;
var ville="";
var icon;

function getTemp() {

    //On récupére la ville saisie par l'utilisateur dans une variable villeSaisie
    var villeSaisie = n2.value;

    if (villeSaisie === "") {
        //En cas de champs non rempli afficher une alerte
        alert("Saisir une ville");
    }

    else {

        //Lancement de la requête http
        var req = new XMLHttpRequest();

        //Récupération de la requête http
        var url = "https://api.openweathermap.org/data/2.5/weather?q=" + ville2 +
            ",france&lang=fr&units=metric&appid=eb3bb071a70595d1052688dd6c14251f";

        //Lancement de la requête pour l'icone
        var reqIcon = new XMLHttpRequest();

        //Récupération de l'URL
        var urlIcon = "http://openweathermap.org/img/wn/10d@2x.png";


        //Ouverture de la requête http
        req.open("GET", url);

        //Ouverture de la requête icon
        reqIcon.open("GET", urlIcon);

        req.addEventListener("loadend", function () {
            if (req.status >= 200 && req.status < 400) {

                //Recuperation des informations meteo
                meteo = req.responseText;

                //On converti le fichier en JSON pour une meilleur manipulation
                var objMeteo = JSON.parse(meteo);

                //On récupére les infos correspondantes aux cahier des charges
                temp = objMeteo.main.temp;
                ville = objMeteo.name;
                icon = objMeteo.weather[0].icon;

                //Affichage du résultat dans le noeud resultat du html
                n4.innerHTML = "A " + ville + ", la température est de " + Math.round(temp)+".";

                //Affichage de l'icon correspondant à la ville saisie par l'utilisateur
                var urlIcon = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";

                n5.src=urlIcon;

            }


        });


        req.addEventListener("error", function () {
            console.error("erreur reseau");
        });

        req.send(null);

    }
}
