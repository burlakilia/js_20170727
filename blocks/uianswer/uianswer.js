import UIBlock from '../uiblock';
import template from './uianswer.pug';
import './uianswer.scss';

export default class UIAnswer extends UIBlock {

    constructor(node, data) {
        super(node);
        this.data = data;
    }

    render() {
        this.node.innerHTML = template(this.data);
        let form = document.querySelector('form');

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.onSubmit(form.elements.test.value);
        });
    }

    onSubmit(value) {}

}