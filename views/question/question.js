import View from '../view';
import template from './question.pug';

export default class VQuestion extends View{

  constructor(node) {
    super(node);
  }

  render(state) {
    this.node.innerHTML = template({
      number: 1
    });
  }

}