import View from '../view';
import template from './results.pug';

export default class VResults extends View{

    constructor(node) {
        super(node);
    }

    render() {
        this.node.innerHTML = template({
            result: 800
        });
    }

}