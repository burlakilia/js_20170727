export default class View {

  constructor(node) {
    this.node = node;
  }

  toggle(state, args) {
    this.node.hidden = !state;

    if (state) {
      this.render(args);
    }
  }

}