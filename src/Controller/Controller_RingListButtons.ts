import {ModelType} from '../Model/Model.js'
import { ViewType} from '../View/View.js'
import { ring } from '../Types/Types.js'

export interface Controller_RingListButtonsType{
  HIGHLIGHT: string;

  attachRingTitleButtonListener: (elem:HTMLElement,id:number, e:any, loadDisplayedTitle:Function) => void;
  attachAllRingTitleButtonListeners: (loadDisplayedTitle:Function) => void;
  loadRingListButtonTitles:() => void;
  clearSelectedRingListButton:() => void;
  styleSelectedRingListButton:() => void;
  findNewRingTitleButton: (id:number) => Element;
  attachDeleteListener: (btn:HTMLElement, loadDisplayedTitle:Function) => void;
  attachAllDeleteListeners: (loadDisplayedTitle:Function) => void;


}

export default class Controller_RingListButtons implements Controller_RingListButtonsType{

  HIGHLIGHT: string;

  attachRingTitleButtonListener: (elem:HTMLElement, id:number, e:any, loadDisplayedTitle:Function) => void;
  attachAllRingTitleButtonListeners: (loadDisplayedTitle:Function) => void;
  loadRingListButtonTitles:() => void;
  clearSelectedRingListButton:() => void;
  styleSelectedRingListButton:() => void;
  findNewRingTitleButton: (id:number) => Element;
  attachDeleteListener: (btn:HTMLElement, loadDisplayedTitle:Function) => void;
  attachAllDeleteListeners: (loadDisplayedTitle:Function) => void;

  constructor(Model:ModelType, View:ViewType){

    this.HIGHLIGHT = "white"

    this.attachRingTitleButtonListener = (elem, id, loadDisplayedTitle) => {
      elem.addEventListener('click', (e:any) => {
        e.preventDefault();
        console.log('ring title listener clumped')

        Model.selectedId = id;
        View.InnerRings.clearInnerRings();
        Model.viewCommands.loadAllSelectedInnerRingsToDOM(Model.ringList, Model.selectedId);
        this.clearSelectedRingListButton();
        this.styleSelectedRingListButton();
        Model.storage.saveAllStorage(Model.ringList, Model.selectedId, View.color);
        this.loadRingListButtonTitles();
        loadDisplayedTitle();
      })

    }
  
      this.attachAllRingTitleButtonListeners = function (loadDisplayedTitle) {
        let ringListButtonGroup = document.querySelectorAll(".ringtitlebuttongroup");
        ringListButtonGroup.forEach((group) => {
          this.attachRingTitleButtonListener(group.firstElementChild,parseInt(group.id.slice(7)), loadDisplayedTitle )
          this.attachDeleteListener(group.lastElementChild, Model.selectedId, loadDisplayedTitle)
        })
      }

      this.attachDeleteListener = (btn, loadDisplayedTitle) => {

        btn.addEventListener('click', (e:any) => {
          let id = parseInt(e.target.parentNode.id.slice(7));
          console.log('delete listener clumped')
          View.RingTitleButtons.clearButton(e.target.parentNode)
          
          if (Model.selectedId === id){
            Model.selectedId = 1;
            View.InnerRings.clearInnerRings();
            Model.viewCommands.loadAllSelectedInnerRingsToDOM(Model.ringList, Model.selectedId);
            loadDisplayedTitle();
          }
          let filteredList = Model.ringList.filter((ring) => ring.id !== id)
          Model.ringList = filteredList;
          console.log(Model.ringList, filteredList)
          Model.storage.saveAllStorage(Model.ringList, Model.selectedId, View.color);
        })
      }

      this.attachAllDeleteListeners = (loadDisplayedTitle) => {

        let delbtns = document.querySelectorAll('.ringlistdelete');
        delbtns.forEach((btn:HTMLElement) => {
          this.attachDeleteListener(btn, loadDisplayedTitle);
        })
      }
  
      this.loadRingListButtonTitles = () => {
        let ringListButtons = document.querySelectorAll("#ringlistbutton");
        ringListButtons.forEach((button:any) => {
          let selectedTitle = Model.ringList.filter((ring:ring) => ring.id === parseInt(button.parentNode.id.slice(7)))[0].title
          button.innerText = selectedTitle;
        })
      }
  
      this.clearSelectedRingListButton = function() {
        let ringListButtons = document.querySelectorAll('#ringlistbutton')
        ringListButtons.forEach((button:any) => {
          if (parseInt(button.parentNode.id.slice(7)) !== Model.selectedId){
            button.classList.remove(`bg-${View.color}-100`)
            button.classList.add(`bg-transparent`)
          }
        })
      }

  
      this.styleSelectedRingListButton = function(){
  
        if (Model.selectedId !== 1){
          let ringListButtons = document.querySelectorAll('#ringlistbutton')
          ringListButtons.forEach((button:any) => {
            if (parseInt(button.parentNode.id.slice(7)) === Model.selectedId){
              button.classList.remove(`bg-transparent`)

              button.classList.add(`bg-${View.color}-100`);
            }
          })
        } else {
          let ringListButton = document.querySelector('#ringlistbutton')
            ringListButton.classList.remove(`bg-transparent`)
            ringListButton.classList.add(`bg-${View.color}-100`);
          
        }
      }
  
      this.findNewRingTitleButton = (id) => document.getElementById(`ringid_${id}`);  

  }






}