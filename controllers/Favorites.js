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
                $.ajax({
                        url: 'http://api.deezer.com/track/' + dataFavorites[dataFavoriteKey] + '&output=jsonp',
                        dataType: 'jsonp'
                    }).done(function (musics) {
                        $('.div-error').remove();
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
                        musicTitle.innerHTML = musics.title.substring(0, 21);
                        musicTitle.className = 'title';
                        musicInfos.push(musicTitle);

                        let musicAuthor = document.createElement('div');
                        musicAuthor.innerHTML = musics.artist.name.substring(0, 21);
                        musicInfos.push(musicAuthor);

                        let musicAlbum = document.createElement('div');
                        musicAlbum.innerHTML = musics.album.title.substring(0, 21);
                        musicAlbum.className = 'album';
                        musicInfos.push(musicAlbum);

                        let musicPlayer = document.createElement('div');
                        musicPlayer.innerHTML = "   <audio controls='controls'>" +
                            "<source src='" + musics.preview + "' type='audio/mp3' />" +
                            "Votre navigateur n'est pas compatible" +
                            "</audio>";
                        musicPlayer.children[0].preload = 'none';
                        musicPlayer.children[0].addEventListener('playing', function () {
                            let currentAudio = this;
                            $.each($('audio'), function () {
                                if (currentAudio !== this) {
                                    this.pause();
                                    this.currentTime = 0;
                                }
                            });
                        });
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
                    .fail(function () {
                        /* Affichage d'une erreur quelconque lors de la recherche */
                        $('.div-error').remove();
                        let divError = document.createElement('div');
                        divError.className = 'div-error';
                        divError.innerHTML = '  <h1> Erreur </h1>' +
                            '<p> Une erreur est survenue lors de la requête, vérifier votre connexion internet. Si le problème persiste veuillez joindre le support.</p>'
                        deezerAPI.appendChild(divError);
                    });
            }
        }

    }
}