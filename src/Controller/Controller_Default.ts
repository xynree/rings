import {ViewType } from '../View/View.js'
export interface Controller_DefaultType {

  loadDefaults: (attachRingTitleButtonListener:Function, loadDisplayedTitle: Function,removeOldNodes:Function, loadTextNodes:Function) => void;
 
  loadDefaultRingTitleButtonListener: (attachRingTitleButtonListener:Function, loadDisplayedTitle: Function,removeOldNodes:Function, loadTextNodes:Function) => void;
  styleDefaultRingButton: () => void; 

}

export default class Controller_Default implements Controller_DefaultType{

  loadDefaults: (attachRingTitleButtonListener:Function, loadDisplayedTitle: Function,removeOldNodes:Function, loadTextNodes:Function) => void;

  loadDefaultRingTitleButtonListener: (attachRingTitleButtonListener:Function, loadDisplayedTitle: Function, removeOldNodes:Function, loadTextNodes:Function) => void;
  styleDefaultRingButton: () => void;

  constructor( View:ViewType) {

    this.loadDefaults = (attachRingTitleButtonListener, loadDisplayedTitle, removeOldNodes, loadTextNodes) => {
      this.styleDefaultRingButton();
      this.loadDefaultRingTitleButtonListener(attachRingTitleButtonListener, loadDisplayedTitle,removeOldNodes, loadTextNodes);
    }

    this.loadDefaultRingTitleButtonListener = (attachRingTitleButtonListener, loadDisplayedTitle, removeOldNodes, loadTextNodes) => {
      let ringListButton = document.querySelector('#ringlistbutton');
      let id = parseInt((<HTMLElement>ringListButton.parentNode).id.slice(7));
      attachRingTitleButtonListener(ringListButton,id, loadDisplayedTitle, removeOldNodes, loadTextNodes)

    }

    this.styleDefaultRingButton = () => {
      let ringListButton = document.querySelector('#ringlistbutton')
      ringListButton.classList.add(View.Default.styles.highlight)
    }



  }
}