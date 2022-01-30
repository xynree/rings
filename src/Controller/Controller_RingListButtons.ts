import { ring, ModelType, ViewType, Controller_RingListButtonsType } from '../Types/Types.js'

export default class Controller_RingListButtons implements Controller_RingListButtonsType {

  _HIGHLIGHT: string;

  attachRingTitleButtonListener: (elem:HTMLElement, id:number) => void;
  attachAllRingTitleButtonListeners: () => void;
  loadRingListButtonTitles:() => void;
  refreshSelectedRingListButtons: () => void;
  attachAllDeleteListeners: () => void;
  attachAddNewRingListener: () => void;

  _clearSelectedRingListButtons:() => void;
  _styleSelectedRingListButtons:() => void;
  _attachDeleteListener: (elem:HTMLElement) => void;
  _findRingTitleButton: (id:number) => Element;

  constructor(Model:ModelType, View:ViewType, loadDisplayedTitle:Function, refreshNodes:Function){

    this._HIGHLIGHT = "white"

    this.attachRingTitleButtonListener = (elem, id) => {
      elem.addEventListener('click', () => {
        Model.selectedId = id;
        View.InnerRings.clearInnerRings();
        Model.ViewCommands.loadAllSelectedInnerRingsToDOM(Model.ringList, Model.selectedId);
        this._clearSelectedRingListButtons();
        this._styleSelectedRingListButtons();
        Model.Storage.saveAllStorage(Model.ringList, Model.selectedId, View.color);
        this.loadRingListButtonTitles();
        Model.selectedTextId = 0;
        loadDisplayedTitle();
        refreshNodes();
      })
    }
  
    this.attachAllRingTitleButtonListeners = function () {
      document.querySelectorAll(".ringtitlebuttongroup").forEach((group) => {
        this.attachRingTitleButtonListener(group.firstElementChild,Number(group.id.slice(7)))
        this._attachDeleteListener(group.lastElementChild, Model.selectedId)
      })
    }

    this.attachAllDeleteListeners = () => document.querySelectorAll('.ringlistdelete').forEach((elem:HTMLElement) => this._attachDeleteListener(elem))

    this.loadRingListButtonTitles = () =>  document.querySelectorAll("#ringlistbutton").forEach((button:any) => button.innerText = Model.ringList.filter((ring:ring) => ring.id === Number(button.parentNode.id.slice(7)))[0].title)

    this.refreshSelectedRingListButtons = () => {
      this._clearSelectedRingListButtons();
      this._styleSelectedRingListButtons();
    }

    this.attachAddNewRingListener = () => {
      document.getElementById("newring").addEventListener("click", (e:any) => {
        e.preventDefault();

        Model.selectedId = Model.ringList[Model.ringList.length-1].id +1;
        Model.addNewRingToRingListFromSelectedId(Model.selectedId);

        View.InnerRings.clearInnerRings();
        View.RingTitleButtons.addRingTitleButton(Model.selectedId);
        
        this.refreshSelectedRingListButtons();

        Model.Storage.saveAllStorage(Model.ringList, Model.selectedId, View.color);
        this.loadRingListButtonTitles();

        loadDisplayedTitle();
        refreshNodes();

        // event listener for new ring title button
        let newRingTitleButton = this._findRingTitleButton(Model.selectedId);
        this._attachDeleteListener(<HTMLElement>newRingTitleButton.lastElementChild);
        this.attachRingTitleButtonListener(<HTMLElement>newRingTitleButton, Model.selectedId)
      }); 
    }

    this._attachDeleteListener = (elem) => {
      elem.addEventListener('click', (e:any) => {
        let clickedId = Number(e.target.parentNode.id.slice(7));
        View.RingTitleButtons.clearButton(e.target.parentNode)
        
        if (Model.selectedId === clickedId){
          Model.selectedId = 1;
          View.InnerRings.clearInnerRings();
          Model.ViewCommands.loadAllSelectedInnerRingsToDOM(Model.ringList, Model.selectedId);
          loadDisplayedTitle();
        }
        Model.ringList = Model.ringList.filter(({id}) => id !== clickedId)
        Model.textList= Model.textList.filter(({ringId}) => ringId !== clickedId);
        Model.Storage.saveAllStorage(Model.ringList, Model.selectedId, View.color);
        refreshNodes();
      })
    }

    this._clearSelectedRingListButtons = function() {
      document.querySelectorAll('#ringlistbutton').forEach((elem:any) => {
        if (Number(elem.parentNode.id.slice(7)) !== Model.selectedId){
          elem.classList.remove(`bg-${View.color}-100`)
          elem.classList.add(`bg-transparent`)
        }
      })
    }

    this._styleSelectedRingListButtons = function(){
      if (Model.selectedId !== 1){
        document.querySelectorAll('#ringlistbutton').forEach((button:any) => {
          if (Number(button.parentNode.id.slice(7)) === Model.selectedId){
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

    this._findRingTitleButton = (id) => document.getElementById(`ringid_${id}`);  

  }

}