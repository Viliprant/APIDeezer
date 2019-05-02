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
            console.log(actuelMusic);
            if(actuelMusic !== undefined)
            {
                if(dataFavorites.length > 1)
                {
                    while(myRandomFavorite == actuelMusic)
                    {
                        myRandomFavorite = Math.floor(Math.random() * Math.floor(dataFavorites.length));
                    }
                }
            }

            /*RECUPERER VIA API*/
            $.ajax({
                url: 'http://api.deezer.com/track/' + dataFavorites[myRandomFavorite] + '&output=jsonp',
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

                /* -----------------------Condition pour les favoris au chargement de la page --------------------- */
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
            }).fail(function () {
                /* Affichage d'une erreur quelconque lors de la recherche */
                $('.div-error').remove();
                let divError = document.createElement('div');
                divError.className = 'div-error';
                divError.innerHTML = '  <h1> Erreur </h1>' +
                    '<p> Une erreur est survenue lors de la requête, vérifier votre connexion internet. Si le problème persiste veuillez joindre le support.</p>'
                deezerAPI.appendChild(divError);
            });
            return myRandomFavorite;
        }

        if (dataFavorites.length == 0) {
            $('#randomButton').remove();
        } else {
            SearchOnApiDeezer(dataFavorites);

            /* Bouton pour changer de musique aléatoirement */
            let randomButton = document.createElement('input');
            randomButton.type = 'button';
            randomButton.id = 'randomButton';
            randomButton.value = 'Changer de musique aléatoirement';
            randomButton.addEventListener('click', function () {
                if (dataFavorites.length == 0) {
                    $('#randomButton').remove();
                    $('.container-music').remove();
                } else {
                    actuelMusic = SearchOnApiDeezer(dataFavorites, actuelMusic);
                }
            });
            deezerAPI.after(randomButton);
        }

    }
}