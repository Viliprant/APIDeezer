/* DIV DEDIER A DEEZER */
let deezerAPI = document.getElementById('api-deezer');
deezerAPI.className = 'center-block';

/* Formulaire pour la recherche de la musique */
let searchMusicForm = document.getElementById('searchMusicForm'),
/* Le champ texte pour la recherche */
maRecherche = document.getElementById('maRecherche');

searchMusicForm.addEventListener('submit', function (event){
    event.preventDefault();
    deezerAPI.innerHTML = '';
    /*RECUPERER VIA API*/
    $.ajax({
        url: 'https://api.deezer.com/search?q=' + maRecherche.value + '&output=jsonp',
        dataType: 'jsonp'
    }).done(function (musics) {
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
            musicTitle.innerHTML = musics.data[musicKey].title;
            musicTitle.className = 'title';
            musicInfos.push(musicTitle);

            let musicAuthor = document.createElement('div');
            musicAuthor.innerHTML = musics.data[musicKey].artist.name;
            musicInfos.push(musicAuthor);

            let musicAlbum = document.createElement('div');
            musicAlbum.innerHTML = musics.data[musicKey].album.title;
            musicAlbum.className = 'album';
            musicInfos.push(musicAlbum);

            let musicPlayer = document.createElement('div');
            musicPlayer.innerHTML = "   <audio controls='controls'>" +
                "<source src='" + musics.data[musicKey].preview + "' type='audio/mp3' />" +
                "Votre navigateur n'est pas compatible" +
                "</audio>";
            musicInfos.push(musicPlayer);

            let musicfavoriteButton = document.createElement('input');
            musicfavoriteButton.type = 'button';
            /* -----------------------Condition (plus tard) --------------------- */
            musicfavoriteButton.value = 'Ajouter aux favoris';
            musicInfos.push(musicfavoriteButton);

            for (const infoKey in musicInfos) {
                musicContainer.appendChild(musicInfos[infoKey]);
            }


        }
    })
})