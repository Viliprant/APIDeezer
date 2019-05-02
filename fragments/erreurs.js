export default function showError(){
    /* Affichage d'une erreur quelconque lors de la recherche */
    $('.div-error').remove();
    let divError = document.createElement('div');
    divError.className = 'div-error';
    divError.innerHTML = '  <h1> Erreur </h1>' +
                         '<p> Une erreur est survenue lors de la requête, vérifier votre connexion internet. Si le problème persiste veuillez joindre le support.</p>';
    return divError;
   }