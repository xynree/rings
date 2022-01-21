import { ring } from '../Types/Types'
import { ModelType } from '../Model/Model'
import { ViewType } from '../View/View'

export interface Controller_RingListButtonsType {

  HIGHLIGHT:string;
  attachRingTitleButtonListener:(id:number, e:any, loadDisplayedTitle:Function) => void;
  attachAllRingTitleButtonListeners:(loadDisplayedTitle:Function)=> void;
  clearSelectedRingButton:(id:number)=> void;
  styleSelectedRingListButton:(id:number)=> void;
  findNewRingTitleButton:(id:number)=> Node;
  loadRingListButtonTitles:() => void;

}


export default class Controller_RingListButtons implements Controller_RingListButtonsType{

  HIGHLIGHT:string;
  attachRingTitleButtonListener:(id:number, e:any, loadDisplayedTitle:Function) => void;
  attachAllRingTitleButtonListeners:(loadDisplayedTitle:Function)=> void;
  clearSelectedRingButton:(id:number)=> void;
  styleSelectedRingListButton:(id:number)=> void;
  findNewRingTitleButton:(id:number)=> Node;
  loadRingListButtonTitles:() => void;


  constructor(Model:ModelType, View:ViewType){

    this.HIGHLIGHT = "white"

    this.attachRingTitleButtonListener = (id, e, loadDisplayedTitle) => {
    e.preventDefault();
    Model.selectedId = id
    Model.storage.saveAllStorage(Model.ringList, Model.selectedId)
    View.innerRings.clearInnerRings();
    Model.viewCommands.loadAllSelectedInnerRingsToDOM(Model.ringList, Model.selectedId);
    this.clearSelectedRingButton(id);
    this.styleSelectedRingListButton(id);
    loadDisplayedTitle();
    this.loadRingListButtonTitles();
  }

    this.attachAllRingTitleButtonListeners = function (loadDisplayedTitle) {
      let ringListButtons = document.querySelectorAll(".ringlistbutton");
      ringListButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          this.attachRingTitleButtonListener(button.id.slice(7), e)
        })
      })
    }

    this.loadRingListButtonTitles = () => {
      let ringListButtons = document.querySelectorAll(".ringlistbutton");
      ringListButtons.forEach((button:any) => {
        let selectedTitle = Model.ringList.filter((ring:ring) => ring.id === parseInt(button.id.slice(7)))[0].title
        button.firstElementChild.innerText = selectedTitle;
      })
    }

    this.clearSelectedRingButton = function(selectedId) {
      let ringListButtons = document.querySelectorAll('.ringlistbutton')
      ringListButtons.forEach((button) => {
        if (parseInt(button.id.slice(7)) !== selectedId){
          View.styleBackground(<HTMLElement>button, "transparent")
        }
      })
    }


    this.styleSelectedRingListButton = function(id){

      if (id !== 1){
        let ringListButtons = document.querySelectorAll('.ringlistbutton')
        ringListButtons.forEach((button) => {
          if (parseInt(button.id.slice(7)) === id){
            console.log('i am the selected one:',button.id)
            View.styleBackground(<HTMLElement>button, this.HIGHLIGHT )
          }
        })
      } else {
        let ringListButton = document.querySelector('.ringlistbutton')
        if (parseInt(ringListButton.id.slice(7)) === id){
          View.styleBackground(<HTMLElement>ringListButton, this.HIGHLIGHT)
        }
      }
    }

    this.findNewRingTitleButton = (id) => document.getElementById(`ringid_${id}`);
    // for initial loaded ring

    
  }
}