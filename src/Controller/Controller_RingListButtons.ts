import {ModelType} from '../Model/Model.js'
import { ViewType} from '../View/View.js'
import { ring } from '../Types/Types.js'

export interface Controller_RingListButtonsType {
  HIGHLIGHT: string;

  attachRingTitleButtonListener: (elem:HTMLElement, id:number) => void;
  attachAllRingTitleButtonListeners: () => void;
  loadRingListButtonTitles:() => void;
  clearSelectedRingListButton:() => void;
  styleSelectedRingListButton:() => void;
  findNewRingTitleButton: (id:number) => Element;
  attachDeleteListener: (btn:HTMLElement) => void;
  attachAllDeleteListeners: () => void;
  attachAddNewRingListener: () => void;
}

export default class Controller_RingListButtons implements Controller_RingListButtonsType {

  constructor(Model:ModelType, View:ViewType, loadDisplayedTitle:Function, refreshNodes:Function){

    this.HIGHLIGHT = "white"

    this.attachRingTitleButtonListener = (elem, id) => {
      elem.addEventListener('click', (e:any) => {
        e.preventDefault();
        console.log('ring title listener clumped')

        Model.selectedId = id;
        View.InnerRings.clearInnerRings();
        Model.ViewCommands.loadAllSelectedInnerRingsToDOM(Model.ringList, Model.selectedId);
        this.clearSelectedRingListButton();
        this.styleSelectedRingListButton();
        Model.Storage.saveAllStorage(Model.ringList, Model.selectedId, View.color);
        this.loadRingListButtonTitles();
        Model.selectedTextId = 0;

        loadDisplayedTitle();
        refreshNodes;

        
      })

    }
  
      this.attachAllRingTitleButtonListeners = function () {
        let ringListButtonGroup = document.querySelectorAll(".ringtitlebuttongroup");
        ringListButtonGroup.forEach((group) => {
          this.attachRingTitleButtonListener(group.firstElementChild,parseInt(group.id.slice(7)))
          this.attachDeleteListener(group.lastElementChild, Model.selectedId)
        })
      }

      this.attachDeleteListener = (btn) => {

        btn.addEventListener('click', (e:any) => {
          let id = parseInt(e.target.parentNode.id.slice(7));
          console.log('delete listener clumped')
          View.RingTitleButtons.clearButton(e.target.parentNode)
          
          if (Model.selectedId === id){
            Model.selectedId = 1;
            View.InnerRings.clearInnerRings();
            Model.ViewCommands.loadAllSelectedInnerRingsToDOM(Model.ringList, Model.selectedId);
            loadDisplayedTitle();
          }
          Model.ringList = Model.ringList.filter((ring) => ring.id !== id)
          Model.textList= Model.textList.filter(({ringId}) => ringId !== id);
          Model.Storage.saveAllStorage(Model.ringList, Model.selectedId, View.color);
          refreshNodes();
        })
      }

      this.attachAllDeleteListeners = () => {

        let delbtns = document.querySelectorAll('.ringlistdelete');
        delbtns.forEach((btn:HTMLElement) => {
          this.attachDeleteListener(btn);
        })
      }
  
      this.loadRingListButtonTitles = () => {
        let ringListButtons = document.querySelectorAll("#ringlistbutton");
        ringListButtons.forEach((button:any) => {
          button.innerText = Model.ringList.filter((ring:ring) => ring.id === parseInt(button.parentNode.id.slice(7)))[0].title
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
      
      this.attachAddNewRingListener = () => {
        let newRing = document.getElementById("newring");
        newRing.addEventListener("click", (e:any) => {
          e.preventDefault();
  
          Model.selectedId = Model.ringList[Model.ringList.length-1].id +1;
          Model.addNewRingToRingListFromSelectedId(Model.selectedId);
  
          View.InnerRings.clearInnerRings();
          View.RingTitleButtons.addRingTitleButton(Model.selectedId);
          
          this.clearSelectedRingListButton();
          this.styleSelectedRingListButton();

          Model.Storage.saveAllStorage(Model.ringList, Model.selectedId, View.color);
          this.loadRingListButtonTitles();
  
          loadDisplayedTitle();
          refreshNodes();

          // event listener for new ring title button
          let newRingTitleButton = this.findNewRingTitleButton(Model.selectedId);
          this.attachDeleteListener(<HTMLElement>newRingTitleButton.lastElementChild);
          this.attachRingTitleButtonListener(<HTMLElement>newRingTitleButton, Model.selectedId)
        }); 
      }

  }

  HIGHLIGHT: string;

  attachRingTitleButtonListener: (elem:HTMLElement, id:number) => void;
  attachAllRingTitleButtonListeners: () => void;
  loadRingListButtonTitles:() => void;
  clearSelectedRingListButton:() => void;
  styleSelectedRingListButton:() => void;
  findNewRingTitleButton: (id:number) => Element;
  attachDeleteListener: (btn:HTMLElement) => void;
  attachAllDeleteListeners: () => void;
  attachAddNewRingListener: () => void;

}