import Router from 'vanilla-router';
import Search from '../controllers/Search';
import Favorite from '../controllers/Favorites';

let myRouter = new Router({
    mode: 'hash'
});

/* Accueil */
myRouter.add('/', function (name) {
    dispatchRoute('home.html');
});
/* Search */
myRouter.add('/Search', function () {
    dispatchRoute(new Search());
});
/* Favorites */
myRouter.add('/Favorites', function (name) {
    dispatchRoute(new Favorite());
});

myRouter.addUriListener();
myRouter.check();

const $apiDeezer = document.getElementById('api-deezer');

function dispatchRoute(controller) {
    return fetch(`../views/${controller.view}`)
        .then(res => res.text())
        .then(htmlContent => {
            $apiDeezer.innerHTML = htmlContent;
            controller.init();
        });
}