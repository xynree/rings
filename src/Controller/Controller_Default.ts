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
      let ringListButton = document.querySelector('.ringlistbutton');
      ringListButton.addEventListener('click', (e) =>{
        attachRingTitleButtonListener(parseInt(ringListButton.id.slice(7)), e, loadDisplayedTitle)
    })
    }

    this.styleDefaultRingButton = () => {
      let ringListButton = document.querySelector('.ringlistbutton')
      View.styleBackground(<HTMLElement>ringListButton, "white")
    }



  }
}