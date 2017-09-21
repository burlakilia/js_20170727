import UIBlock from '../uiblock';
import template from './uiclock.pug';

export default class UIClock extends UIBlock {

    constructor(node) {
        super(node);
        this.seconds = 0;
    }

    render() {
        this.node.innerHTML = template({
            min: 0,
            sec: 0
        });
    }

    start() {

        setInterval(() => {
            this.seconds += 1;
            this.render(this.seconds);
        }, 1000);

    }

}