import {ViewType } from '../View/View.js'
export interface Controller_DefaultType {

  loadDefaults: (attachRingTitleButtonListener:Function) => void;
 
  loadDefaultRingTitleButtonListener: (attachRingTitleButtonListener:Function) => void;
  styleDefaultRingButton: () => void; 

}

export default class Controller_Default implements Controller_DefaultType{

  loadDefaults: (attachRingTitleButtonListener:Function) => void;

  loadDefaultRingTitleButtonListener: (attachRingTitleButtonListener:Function) => void;
  styleDefaultRingButton: () => void;

  constructor( View:ViewType) {

    this.loadDefaults = (attachRingTitleButtonListener) => {
      this.styleDefaultRingButton();
      this.loadDefaultRingTitleButtonListener(attachRingTitleButtonListener);
    }

    this.loadDefaultRingTitleButtonListener = (attachRingTitleButtonListener) => {
      let ringListButton = document.querySelector('.ringlistbutton');
      ringListButton.addEventListener('click', (e) =>{
        attachRingTitleButtonListener(parseInt(ringListButton.id.slice(7)), e)
    })
    }

    this.styleDefaultRingButton = () => {
      let ringListButton = document.querySelector('.ringlistbutton')
      View.styleBackground(<HTMLElement>ringListButton, "white")
    }



  }
}