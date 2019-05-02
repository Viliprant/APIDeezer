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

        searchMusicForm.addEventListener('submit', function (event) {
            event.preventDefault();

            $('.container-music').remove();

            /*RECUPERER VIA API*/
            $.ajax({
                url: 'https://api.deezer.com/search?strict=on&q=' + maRecherche.value + '&order=' + monTri.value + '&output=jsonp',
                dataType: 'jsonp'
            }).done(function (musics) {
                $('.div-error').remove();
                for (const musicKey in musics.data) {
                    /* Container Musique */
                    let musicContainer = document.createElement('div');
                    musicContainer.className = 'container-music';
                    deezerAPI.appendChild(musicContainer);

                    /* Informations sur la musique */
                    let musicInfos = [];

                    let musicImage = document.createElement('img');
                    musicImage.src = musics.data[musicKey].album.cover_small;
                    musicImage.className = 'right-img';
                    musicInfos.push(musicImage);

                    let musicTitle = document.createElement('div');
                    musicTitle.innerHTML = musics.data[musicKey].title.substring(0, 21);
                    musicTitle.className = 'title';
                    musicInfos.push(musicTitle);

                    let musicAuthor = document.createElement('div');
                    musicAuthor.innerHTML = musics.data[musicKey].artist.name.substring(0, 21);
                    musicInfos.push(musicAuthor);

                    let musicAlbum = document.createElement('div');
                    musicAlbum.innerHTML = musics.data[musicKey].album.title.substring(0, 21);
                    musicAlbum.className = 'album';
                    musicInfos.push(musicAlbum);

                    let musicPlayer = document.createElement('div');
                    musicPlayer.innerHTML = "   <audio controls='controls'>" +
                        "<source src='" + musics.data[musicKey].preview + "' type='audio/mp3' />" +
                        "Votre navigateur n'est pas compatible" +
                        "</audio>";
                    musicPlayer.children[0].preload = 'none';
                    musicPlayer.children[0].addEventListener('playing',function(){
                        let currentAudio = this;
                        $.each($('audio'),function(){
                            if(currentAudio !== this){
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
                            dataFavorites.push(musics.data[musicKey].id);
                            localStorage.setItem('myMusicsAPIDeezer', dataFavorites);
                            this.value = 'Retirer des favoris';
                        } else {
                            dataFavorites.splice(dataFavorites.indexOf(musics.data[musicKey].id), 1);
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
                    if (dataFavorites.includes(musics.data[musicKey].id)) {
                        musicfavoriteButton.value = 'Retirer des favoris';
                        musicfavoriteButton.className = 'favorite';
                    } else {
                        musicfavoriteButton.value = 'Ajouter aux favoris';
                    }

                    musicInfos.push(musicfavoriteButton);

                    for (const infoKey in musicInfos) {
                        musicContainer.appendChild(musicInfos[infoKey]);
                    }


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
        })
    }
}