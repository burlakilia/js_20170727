import UIBlock from '../uiblock';
import template from './uilayout.pug';
import css from './uilayout.scss';

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