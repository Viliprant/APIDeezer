console.log('Loading Parameters');

/* EVITER LE BLOCAGE LORS DU CHARGEMENT DE L'API DEEZER */
window.dzAsyncInit = function () {
    DZ.init({
        appId: '345122',
        channelUrl: 'http://localhost:8080/html/index.html'
    });
};
(function () {
    var e = document.createElement('script');
    e.src = 'https://e-cdns-files.dzcdn.net/js/min/dz.js';
    e.async = true;
    document.getElementById('dz-root').appendChild(e);
}());

/* EXECUTION DU PLAYER */
sdk_options = 
{
    token: {
		access_token: ' b987b9429bdfdef50f81e426da373f63',
		expire: '196966942',
	},
	player: {
		current_track: {},
		muted: false,
		repeat: 1,
		shuffle: false,
		volume: 100,
	}
}
DZ.ready(function(sdk_options){
	console.log('DZ SDK is ready', sdk_options);
});