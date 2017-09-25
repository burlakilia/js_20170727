import UIBlock from '../uiblock';
import template from './uilayout.pug';

export default class UILayout extends UIBlock {

  constructor(node) {
    super(node);

  }

  render() {
    this.node.innerHTML = template();
  }

  start() {

  }

}