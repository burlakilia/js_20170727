import VQuestion from '../../views/question/question';
import VResults from '../../views/results/results';
import Router from '../../modules/router';
import tempalte from './app.pug';


window.addEventListener('DOMContentLoaded', () => {
    let router = new Router(document.body);

    document.body.innerHTML = tempalte();

    router.register('#question', new VQuestion(document.querySelector('.js-question')));
    router.register('#results', new VResults(document.querySelector('.js-results')));
    router.start();
});
 
