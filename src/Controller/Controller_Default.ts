export interface Controller_DefaultType {

  styleDefaultRingButton:(id:number)=> void;
  loadDefaultRingTitleButtonListener:(attachRingTitleButtonListener:Function,loadDisplayedTitle:Function) => void;
}

export default class Controller_Default implements Controller_DefaultType{
  loadDefaultRingTitleButtonListener:(attachRingTitleButtonListener:Function,loadDisplayedTitle:Function) => void;
  styleDefaultRingButton:(id:number)=> void;

  constructor(View:any) {

    this.loadDefaultRingTitleButtonListener = (attachRingTitleButtonListener,loadDisplayedTitle) => {
      let ringListButton = document.querySelector('.ringlistbutton');
      ringListButton.addEventListener('click', (e) =>{
        attachRingTitleButtonListener(parseInt(ringListButton.id.slice(7)), e, loadDisplayedTitle)
    })
    }

    this.styleDefaultRingButton = (id) => {
      let ringListButton = document.querySelector('.ringlistbutton')
      View.styleBackground(ringListButton, "white")
    }

    
    

  }
}