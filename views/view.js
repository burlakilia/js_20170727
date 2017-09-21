export default class View {

    constructor(node) {
        this.node = node;
    }

    toggle(state) {
        this.node.hidden = !state;

        if (state) {
            this.render();
        }
    }

}