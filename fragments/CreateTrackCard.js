export default function CreateTrackCard(dataMusic,dataFavorites) {
    /* Container Musique */
    let musicContainer = document.createElement('div');
    musicContainer.className = 'container-music';

    /* Informations sur la musique */
    let musicInfos = [];

    let musicImage = document.createElement('img');
    musicImage.src = dataMusic.album.cover_small;
    musicImage.className = 'right-img';
    musicInfos.push(musicImage);

    let musicTitle = document.createElement('div');
    musicTitle.innerHTML = dataMusic.title.substring(0, 21);
    musicTitle.className = 'title';
    musicInfos.push(musicTitle);

    let musicAuthor = document.createElement('div');
    musicAuthor.innerHTML = dataMusic.artist.name.substring(0, 21);
    musicInfos.push(musicAuthor);

    let musicAlbum = document.createElement('div');
    musicAlbum.innerHTML = dataMusic.album.title.substring(0, 21);
    musicAlbum.className = 'album';
    musicInfos.push(musicAlbum);

    let musicPlayer = document.createElement('div');
    musicPlayer.innerHTML = "   <audio controls='controls'>" +
        "<source src='" + dataMusic.preview + "' type='audio/mp3' />" +
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
            dataFavorites.push(dataMusic.id);
            localStorage.setItem('myMusicsAPIDeezer', dataFavorites);
            this.value = 'Retirer des favoris';
        } else {
            dataFavorites.splice(dataFavorites.indexOf(dataMusic.id), 1);
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
    if (dataFavorites.includes(dataMusic.id)) {
        musicfavoriteButton.value = 'Retirer des favoris';
        musicfavoriteButton.className = 'favorite';
    } else {
        musicfavoriteButton.value = 'Ajouter aux favoris';
    }
    musicInfos.push(musicfavoriteButton);

    for (const infoKey in musicInfos) {
        musicContainer.appendChild(musicInfos[infoKey]);
    }

    return musicContainer;
}