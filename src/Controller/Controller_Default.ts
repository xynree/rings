import { ViewType } from '../View/View.js'
export interface Controller_DefaultType {

  /** styles default RingButton and loads Default Listener */
  loadDefaults: (attachRingTitleButtonListener:Function, loadDisplayedTitle: Function, refreshNodes:Function) => void;
 
  /** sets up default ring list button with listener */
  loadDefaultRingTitleButtonListener: (attachRingTitleButtonListener:Function, loadDisplayedTitle: Function, refreshNodes:Function) => void;
  
  /** Highlights default ring button */
  styleDefaultRingButton: () => void; 

}

export default class Controller_Default implements Controller_DefaultType{

  constructor ( View:ViewType) {

    this.loadDefaults = (attachRingTitleButtonListener, loadDisplayedTitle, refreshNodes) => {
      this.styleDefaultRingButton();
      this.loadDefaultRingTitleButtonListener(attachRingTitleButtonListener, loadDisplayedTitle,refreshNodes);
    }

    this.loadDefaultRingTitleButtonListener = (attachRingTitleButtonListener, loadDisplayedTitle, refreshNodes) => {
      let ringListButton = document.querySelector('#ringlistbutton');
      let id = parseInt((<HTMLElement>ringListButton.parentNode).id.slice(7));
      attachRingTitleButtonListener(ringListButton, id, loadDisplayedTitle, refreshNodes)
    }

    this.styleDefaultRingButton = () => {
      let ringListButton = document.querySelector('#ringlistbutton')
      ringListButton.classList.add(View.Default.styles.highlight)
    }
  }
  loadDefaults: (attachRingTitleButtonListener:Function, loadDisplayedTitle: Function, refreshNodes:Function) => void;
  loadDefaultRingTitleButtonListener: (attachRingTitleButtonListener:Function, loadDisplayedTitle: Function,  refreshNodes:Function) => void;
  styleDefaultRingButton: () => void;
}