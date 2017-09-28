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

    async render(args) {

        this.node.innerHTML = template({
            number: 1
        });

        let data = await this.model.fetch();
        let testData = data[0];
        let question = testData.data[+args[1] - 1];

        let quest = new UIQuestion(this.node.querySelector('.js-info'), {
            title: `Вопрос N${args[0]}`,
            desc: question.question
        });

        let answers = new UIAnswer(this.node.querySelector('.js-answers'), {
            answers: question.answers.map(item => item.value)
        });

        quest.render();
        answers.render();

        answers.onSubmit = (value) => {
            this.model.addResult(args[0], args[1], value);
            location.href = './#question/1/2';
        }

    }

}