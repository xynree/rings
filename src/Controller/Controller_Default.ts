import { ViewType, Controller_DefaultType } from "../Types/Types.js";

export default class Controller_Default implements Controller_DefaultType{

  loadDefaults: () => void;
  _loadDefaultRingTitleButtonListener: () => void;
  _styleDefaultRingButton: () => void;

  constructor ( View:ViewType, attachRingTitleButtonListener:Function, loadDisplayedTitle: Function, refreshNodes:Function) {

    this.loadDefaults = () => {
      this._styleDefaultRingButton();
      this._loadDefaultRingTitleButtonListener();
    }

    this._loadDefaultRingTitleButtonListener = () => {
      let ringListButton = document.querySelector('#ringlistbutton');
      let id = parseInt((<HTMLElement>ringListButton.parentNode).id.slice(7));
      attachRingTitleButtonListener(ringListButton, id)
    }

    this._styleDefaultRingButton = () => {
      let ringListButton = document.querySelector('#ringlistbutton')
      ringListButton.classList.add(View.Default.styles.highlight)
    }
  }
}