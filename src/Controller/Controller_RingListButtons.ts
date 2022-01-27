import {ModelType} from '../Model/Model.js'
import { ViewType} from '../View/View.js'
import { ring } from '../Types/Types.js'

export interface Controller_RingListButtonsType{
  HIGHLIGHT: string;

  attachRingTitleButtonListener: (id:number, e:any, loadDisplayedTitle:Function) => void;
  attachAllRingTitleButtonListeners: (loadDisplayedTitle:Function) => void;
  loadRingListButtonTitles:() => void;
  clearSelectedRingListButton:() => void;
  styleSelectedRingListButton:() => void;
  findNewRingTitleButton: (id:number) => Element;
}

export default class Controller_RingListButtons implements Controller_RingListButtonsType{

  HIGHLIGHT: string;

  attachRingTitleButtonListener: (id:number, e:any, loadDisplayedTitle:Function) => void;
  attachAllRingTitleButtonListeners: (loadDisplayedTitle:Function) => void;
  loadRingListButtonTitles:() => void;
  clearSelectedRingListButton:() => void;
  styleSelectedRingListButton:() => void;
  findNewRingTitleButton: (id:number) => Element;

  constructor(Model:ModelType, View:ViewType){

    this.HIGHLIGHT = "white"

    this.attachRingTitleButtonListener = (id, e, loadDisplayedTitle) => {
      e.preventDefault();
      Model.selectedId = id;
      View.innerRings.clearInnerRings();
      Model.viewCommands.loadAllSelectedInnerRingsToDOM(Model.ringList, Model.selectedId);
      this.clearSelectedRingListButton();
      this.styleSelectedRingListButton();
      Model.storage.saveAllStorage(Model.ringList, Model.selectedId);
  
      this.loadRingListButtonTitles();
      loadDisplayedTitle();
  
    }
  
      this.attachAllRingTitleButtonListeners = function (loadDisplayedTitle) {
        let ringListButtons = document.querySelectorAll(".ringlistbutton");
        ringListButtons.forEach((button) => {
          button.addEventListener("click", (e) => {
            this.attachRingTitleButtonListener(parseInt(button.id.slice(7)), e, loadDisplayedTitle)
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
  
      this.clearSelectedRingListButton = function() {
        let ringListButtons = document.querySelectorAll('.ringlistbutton')
        ringListButtons.forEach((button) => {
          if (parseInt(button.id.slice(7)) !== Model.selectedId){
            View.styleBackground(<HTMLElement>button, "transparent")
          }
        })
      }
  
      this.styleSelectedRingListButton = function(){
  
        if (Model.selectedId !== 1){
          let ringListButtons = document.querySelectorAll('.ringlistbutton')
          ringListButtons.forEach((button) => {
            if (parseInt(button.id.slice(7)) == Model.selectedId){
              View.styleBackground(<HTMLElement>button, this.HIGHLIGHT )
            }
          })
        } else {
          let ringListButton = document.querySelector('.ringlistbutton')
          if (parseInt(ringListButton.id.slice(7)) == Model.selectedId){
            View.styleBackground(<HTMLElement>ringListButton, this.HIGHLIGHT)
          }
        }
      }
  
      this.findNewRingTitleButton = (id) => document.getElementById(`ringid_${id}`);  

  }






}