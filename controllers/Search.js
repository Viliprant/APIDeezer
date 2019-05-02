import {searchAPIQ} from '../fragments/APIfunction';
import CreateTrackCard from '../fragments/CreateTrackCard';
import showError from '../fragments/erreurs';
export default class Search {

    constructor() {
        this.view = 'search.html';
    }

    init() {
        $('.div-error').remove();
        /* DIV DEDIER A DEEZER */
        let deezerAPI = document.getElementById('api-deezer');

        /* Formulaire pour la recherche de la musique */
        let searchMusicForm = document.getElementById('searchMusicForm'),
            /* Le champ texte pour la recherche */
            maRecherche = document.getElementById('maRecherche'),
            /* Pour le tri */
            monTri = document.getElementById('tri');
        /* LOCALSTORAGE */
        let dataFavorites = [];
        if (localStorage.getItem('myMusicsAPIDeezer') !== null) {
            dataFavorites = localStorage.getItem('myMusicsAPIDeezer').split(",").map(Number);
        }

        $('#randomButton').remove();

        /* POUR LE FORMULAIRE */
        searchMusicForm.addEventListener('submit', function (event) {
            event.preventDefault();

            $('.container-music').remove();

            /*RECUPERER VIA API*/
            searchAPIQ(maRecherche.value, monTri.value,
                function (musics) {
                    $('.div-error').remove();
                    for (const musicKey in musics.data) {
                        /* AFFICHAGE DES MUSIQUES */
                        deezerAPI.appendChild(CreateTrackCard(musics.data[musicKey],dataFavorites));
                    }
                },
                function () {
                    /* AFFICHAGE EN CAS D'ERREURS */
                    deezerAPI.appendChild(showError());
                });
        })
    }
}