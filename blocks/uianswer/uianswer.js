import UIBlock from '../uiblock';
import template from './uianswer.pug';

export default class UIAnswer extends UIBlock {

  constructor(node) {
    super(node);
    this.answerText = "answer";
    this.answerType = "checkbox";
    this.answerName = "name";
    this.answerChecked = "false";


    node.addEventListener('click', (event) => {
      this.onChoice(event.target.value);
    })
  }

  render() {
    this.node.innerHTML = template({

    });
  }

  start() {

  }

}