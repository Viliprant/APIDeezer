export function searchAPIQ(q, order, done, fail) {
    $.ajax({
            url: 'https://api.deezer.com/search?strict=on&q=' + q + '&order=' + order + '&output=jsonp',
            dataType: 'jsonp'
        }).done(done)
        .fail(fail);
}

export function searchAPITracks(track, done, fail) {
    $.ajax({
            url: 'https://api.deezer.com/track/' + track + '&output=jsonp',
            dataType: 'jsonp'
        }).done(done)
        .fail(fail);
}