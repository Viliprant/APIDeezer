import {searchAPITracks} from '../fragments/APIfunction';
import CreateTrackCard from '../fragments/CreateTrackCard';
import alert from '../fragments/alert';
export default class Accueil {
    constructor() {
        this.view = 'home.html';
    }

    init() {
        /* DIV DEDIER A DEEZER */
        let deezerAPI = document.getElementById('api-deezer');
        /* LOCALSTORAGE */
        let dataFavorites = [];
        if (localStorage.getItem('myMusicsAPIDeezer') !== null) {
            dataFavorites = localStorage.getItem('myMusicsAPIDeezer').split(",").map(Number);
        }
        let actuelMusic;

        $('#randomButton').remove();

        function SearchOnApiDeezer(dataFavorites, actuelMusic) {
            $('.container-music').remove();
            $('.div-error').remove();

            /* Gestion de l'aléatoire */
            /* CHOISIR AU HASARD UNE MUSIQUE FAVORIS */
            let myRandomFavorite = Math.floor(Math.random() * Math.floor(dataFavorites.length));
            if (actuelMusic !== undefined) {
                if (dataFavorites.length > 1) {
                    while (myRandomFavorite == actuelMusic) {
                        myRandomFavorite = Math.floor(Math.random() * Math.floor(dataFavorites.length));
                    }
                }
            }

            /*RECUPERER VIA API*/
            searchAPITracks(dataFavorites[myRandomFavorite],
                function (musics) {
                        /* AFFICHAGE DES MUSIQUES */
                        deezerAPI.appendChild(CreateTrackCard(musics,dataFavorites));
                   
                },
                function () {
                    /* AFFICHAGE EN CAS D'ERREURS */
                    deezerAPI.appendChild(alert('error','Erreur','Une erreur est survenue lors de la requête, vérifier votre connexion internet. Si le problème persiste veuillez joindre le support.</p>'));
                });
            return myRandomFavorite;
        }

        if (dataFavorites.length < 1) {
            $('#randomButton').remove();
            if (dataFavorites.length == 0) {
                $('#randomButton').remove();
                $('.container-music').remove();
            }
        } else {
            SearchOnApiDeezer(dataFavorites);

            /* Bouton pour changer de musique aléatoirement */
            let randomButton = document.createElement('input');
            randomButton.type = 'button';
            randomButton.id = 'randomButton';
            randomButton.value = 'Changer de musique aléatoirement';
            randomButton.addEventListener('click', function () {
                actuelMusic = SearchOnApiDeezer(dataFavorites, actuelMusic);
            });
            deezerAPI.after(randomButton);
        }

    }
}