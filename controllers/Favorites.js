import {searchAPITracks} from '../fragments/APIfunction';
import CreateTrackCard from '../fragments/CreateTrackCard';
import showError from '../fragments/erreurs';
export default class Favorite {

    constructor() {
        this.view = 'favorites.html';
    }

    init() {
        /* DIV DEDIER A DEEZER */
        let deezerAPI = document.getElementById('api-deezer');
        /* LOCALSTORAGE */
        let dataFavorites = [];
        if (localStorage.getItem('myMusicsAPIDeezer') !== null) {
            dataFavorites = localStorage.getItem('myMusicsAPIDeezer').split(",").map(Number);
        }

        $('.container-music').remove();
        $('#randomButton').remove();

        if (dataFavorites.length == 0) {
            let noFavoritesMusics = document.createElement('div');
            noFavoritesMusics.className = 'noFavoritesMusics';
            noFavoritesMusics.innerHTML = '<p>Vous n\'avez pas encore ajouté de favoris.</p>';
            deezerAPI.appendChild(noFavoritesMusics);

        } else {
            for (const dataFavoriteKey in dataFavorites) {
                /*RECUPERER VIA API*/
                searchAPITracks(dataFavorites[dataFavoriteKey],
                    function (musics) {
                        $('.div-error').remove();
                        deezerAPI.appendChild(CreateTrackCard(musics,dataFavorites));
                    },
                    function () {
                        deezerAPI.appendChild(showError());
                    });
            }
        }

    }
}