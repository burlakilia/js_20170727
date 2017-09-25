import template from './uiquestion.pug';
import UIBlock from '../uiblock'

export default class UIQuestion extends UIBlock{

    constructor(node) {
        super(node);
        this.questionTitle = "Question Title",
        this.questionBody = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea expedita magnam libero ut autem aperiam velit minus nobis recusandae modi adipisci, voluptatem minima error deleniti ratione asperiores illum molestiae quaerat."
    }

    render(state) {
        this.node.innerHTML = template({
        });
    }

}