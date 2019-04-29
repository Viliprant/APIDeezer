import Router from '../node_modules/vanilla-router/index';

let myRouter = new Router({
    mode: 'hash'
});

/* Accueil */
myRouter.add('/Home', function (name) {
    console.log('Home');
});
/* Search */
myRouter.add('/Search', function (name) {
    console.log('Search');
});
/* Favorites */
myRouter.add('/Favorites', function (name) {
    console.log('Favorites');
});

myRouter.addUriListener();
myRouter.check();