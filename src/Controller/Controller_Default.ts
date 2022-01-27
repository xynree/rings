import {ViewType } from '../View/View.js'
export interface Controller_DefaultType {

  loadDefaults: (attachRingTitleButtonListener:Function, loadDisplayedTitle: Function) => void;
 
  loadDefaultRingTitleButtonListener: (attachRingTitleButtonListener:Function, loadDisplayedTitle: Function) => void;
  styleDefaultRingButton: () => void; 

}

export default class Controller_Default implements Controller_DefaultType{

  loadDefaults: (attachRingTitleButtonListener:Function, loadDisplayedTitle: Function) => void;

  loadDefaultRingTitleButtonListener: (attachRingTitleButtonListener:Function, loadDisplayedTitle: Function) => void;
  styleDefaultRingButton: () => void;

  constructor( View:ViewType) {

    this.loadDefaults = (attachRingTitleButtonListener, loadDisplayedTitle) => {
      this.styleDefaultRingButton();
      this.loadDefaultRingTitleButtonListener(attachRingTitleButtonListener, loadDisplayedTitle);
    }

    this.loadDefaultRingTitleButtonListener = (attachRingTitleButtonListener, loadDisplayedTitle) => {
      let ringListButton = document.querySelector('#ringlistbutton');
      let id = parseInt((<HTMLElement>ringListButton.parentNode).id.slice(7));
      attachRingTitleButtonListener(ringListButton,id, loadDisplayedTitle)

    }

    this.styleDefaultRingButton = () => {
      let ringListButton = document.querySelector('#ringlistbutton')
      ringListButton.classList.add(View.Default.styles.highlight)
    }



  }
}