import View from '../view';
import template from './question.pug';
import UIQuestion from '../../blocks/uiquestion/uiquestion';
import UIAnswer from '../../blocks/uianswer/uianswer';
import Model from '../../models/quiz';

export default class VQuestion extends View {

    constructor(node) {
        super(node);
        this.model = new Model();
    }

    render(state) {
        this.node.innerHTML = template({
            number: 1
        });

        this.model.fetch().then(data =>{
            console.log(data);

            let quest = new UIQuestion(this.node.querySelector('.js-info'), {

            });

            let answers = new UIAnswer(this.node.querySelector('.js-options'), {

            });

            answers.onChoice = function (number, val) {
                console.log('user choice is', val);

                this.model.addAswer(number, val);
            };
        })


    }

}