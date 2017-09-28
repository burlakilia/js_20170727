import template from './uiquestion.pug';
import UIBlock from '../uiblock';
import './uiquestion.scss';

export default class UIQuestion extends UIBlock{


    /**
     * @param {Element} node
     * @param {Object} data
     * @param {string} data.title - заголовок
     * @param {string} data.desc - описание вопроса
     */
    constructor(node, data) {
        super(node);
        this.data = data;
    }

    render(state) {
        this.node.innerHTML = template(this.data);
    }

}