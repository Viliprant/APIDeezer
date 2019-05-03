import {searchAPIQ} from '../fragments/APIfunction';
import CreateTrackCard from '../fragments/CreateTrackCard';
import alert from '../fragments/alert';
export default class Search {

    constructor() {
        this.view = 'search.html';
    }

    init() {
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
                    $('#api-deezer div').remove();
                    /* Si la recherche ne retourne aucun résultat */
                    if(musics.data !== undefined && musics.data.length == 0)
                    {
                        deezerAPI.appendChild(alert('warning','Introuvable','Veillez à ne pas mettre n\'importe quoi. 🤢'));
                    }
                    else{
                        for (const musicKey in musics.data) {
                        /* AFFICHAGE DES MUSIQUES */
                        deezerAPI.appendChild(CreateTrackCard(musics.data[musicKey],dataFavorites));
                        }
                    }                   
                },
                function () {
                    /* AFFICHAGE EN CAS D'ERREURS */
                    $('#api-deezer div').remove();
                    deezerAPI.appendChild(alert('error','Erreur','Une erreur est survenue lors de la requête, vérifier votre connexion internet. Si le problème persiste veuillez joindre le support.</p>'));
                });
        })
    }
}