import {
    isNull
} from "util";

export default class Favorite {

    constructor() {
        this.view = 'favorites.html';
    }

    init() {
        /* DIV DEDIER A DEEZER */
        let deezerAPI = document.getElementById('api-deezer');
        /* LOCALSTORAGE */
        let dataFavorites = [];
        if (!isNull(localStorage.getItem('myMusicsAPIDeezer'))) {
            dataFavorites = localStorage.getItem('myMusicsAPIDeezer').split(",").map(Number);
        }

        $('.container-music').remove();
        console.log(dataFavorites.length == 0);
        if (dataFavorites.length == 0) {
            let noFavoritesMusics = document.createElement('div');
            noFavoritesMusics.className = 'noFavoritesMusics';
            noFavoritesMusics.innerHTML = '<p>Vous n\'avez pas encore ajouté de favoris.</p>';
            deezerAPI.appendChild(noFavoritesMusics);

        } else {
            for (const dataFavoriteKey in dataFavorites) {
                /*RECUPERER VIA API*/
                $.ajax({
                    url: 'http://api.deezer.com/track/' + dataFavorites[dataFavoriteKey] + '&output=jsonp',
                    dataType: 'jsonp'
                }).done(function (musics) {
                    /* Container Musique */
                    let musicContainer = document.createElement('div');
                    musicContainer.className = 'container-music';
                    deezerAPI.appendChild(musicContainer);

                    /* Informations sur la musique */
                    let musicInfos = [];

                    let musicImage = document.createElement('img');
                    musicImage.src = musics.album.cover_small;
                    musicImage.className = 'right-img';
                    musicInfos.push(musicImage);

                    let musicTitle = document.createElement('div');
                    musicTitle.innerHTML = musics.title_short;
                    musicTitle.className = 'title';
                    musicInfos.push(musicTitle);

                    let musicAuthor = document.createElement('div');
                    musicAuthor.innerHTML = musics.artist.name;
                    musicInfos.push(musicAuthor);

                    let musicAlbum = document.createElement('div');
                    musicAlbum.innerHTML = musics.album.title;
                    musicAlbum.className = 'album';
                    musicInfos.push(musicAlbum);

                    let musicPlayer = document.createElement('div');
                    musicPlayer.innerHTML = "   <audio controls='controls'>" +
                        "<source src='" + musics.preview + "' type='audio/mp3' />" +
                        "Votre navigateur n'est pas compatible" +
                        "</audio>";
                    musicInfos.push(musicPlayer);

                    let musicfavoriteButton = document.createElement('input');
                    musicfavoriteButton.type = 'button';

                    /* AJOUTER AUX FAVORIS DANS LOCALSTORAGE */
                    musicfavoriteButton.addEventListener('click', function () {
                        if (this.value == "Ajouter aux favoris") {
                            dataFavorites.push(musics.id);
                            localStorage.setItem('myMusicsAPIDeezer', dataFavorites);
                            this.value = 'Retirer des favoris';
                        } else {
                            dataFavorites.splice(dataFavorites.indexOf(musics.id), 1);
                            this.value = 'Ajouter aux favoris';
                            if (dataFavorites.length == 0) {
                                localStorage.removeItem('myMusicsAPIDeezer');
                            } else {
                                localStorage.setItem('myMusicsAPIDeezer', dataFavorites);
                            }
                        }
                        this.classList.toggle('favorite');
                    })

                    /* -----------------------Condition (plus tard) --------------------- */
                    if (dataFavorites.includes(musics.id)) {
                        musicfavoriteButton.value = 'Retirer des favoris';
                        musicfavoriteButton.className = 'favorite';
                    } else {
                        musicfavoriteButton.value = 'Ajouter aux favoris';
                    }
                    musicInfos.push(musicfavoriteButton);

                    for (const infoKey in musicInfos) {
                        musicContainer.appendChild(musicInfos[infoKey]);
                    }
                })
            }
        }

    }
}