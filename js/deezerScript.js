/* DIV DEDIER A DEEZER */
let deezerAPI = document.getElementById('api-deezer');

/*RECUPERER VIA API*/
$.ajax({
    url : 'https://api.deezer.com/search?q=eminem&output=jsonp',
    dataType : 'jsonp'
}).done(function(musiques){
    for (const key in musiques.data) {
            console.log(musiques.data[key]);
    }
})