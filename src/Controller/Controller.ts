import { ModelType } from '../Model/Model.js'
import { ViewType } from '../View/View.js'
import { ring } from '../Types/Types.js'
import Controller_Default, { Controller_DefaultType }  from './Controller_Default.js'


export default class Controller  {

  default: Controller_DefaultType;


  setup: () => void;
  
  attachAddNewRingListener: () => void;
  attachDragListener_Styles:()=> void;
  attachDragListener_NewInnerRing: () => void;
  attachClickListener_ClearStorage: () => void;

  
  HIGHLIGHT: string;
  attachRingTitleButtonListener: (id:number, e:any) => void;
  attachAllRingTitleButtonListeners: () => void;
  loadRingListButtonTitles:() => void;
  clearSelectedRingButton:() => void;
  styleSelectedRingListButton:() => void;
  findNewRingTitleButton: (id:number) => Element
  findDiam: (posX:number, posY:number) => number;

  attachDisplayedTitleListener:() => void;
  loadDisplayedTitle:() => void;

  constructor(Model:ModelType, View:ViewType) {

    this.default = new Controller_Default(View);

    this.setup = function() {
      View.default.loadDefaultView();
      this.attachAddNewRingListener();
      this.attachDragListener_Styles();
      this.attachDragListener_NewInnerRing();
      this.attachClickListener_ClearStorage();

      if (Model.storage.hasStoredRings()){
        Model.selectedId = Model.storage.loadSelectedIdFromStorage();
        Model.ringList = Model.storage.loadRingListFromStorage();
        View.ringTitleButtons.clearRingTitleButtons();
        Model.viewCommands.loadRingTitleButtonsToDOM(Model.ringList);
        Model.viewCommands.loadAllSelectedInnerRingsToDOM(Model.ringList, Model.selectedId);

        this.attachAllRingTitleButtonListeners();
        this.clearSelectedRingButton(Model.selectedId);
        this.styleSelectedRingListButton();

      } else{
        this.default.loadDefaults(this.attachRingTitleButtonListener);

        Model.storage.saveAllStorage(Model.ringList, Model.selectedId);
      }
      this.loadDisplayedTitle();
      this.attachDisplayedTitleListener();
      this.loadRingListButtonTitles();
    }

    this.attachAddNewRingListener = function () {
      let newRing = document.getElementById("newring");
      newRing.addEventListener("click", (e:any) => {
        e.preventDefault();

        Model.selectedId = Model.ringList[Model.ringList.length-1].id + 1;
        console.log(Model.selectedId)
        Model.addNewRingToRingListFromSelectedId(Model.selectedId);

        View.innerRings.clearInnerRings();
        View.ringTitleButtons.addRingTitleButton(Model.selectedId);
        this.clearSelectedRingButton();

        this.styleSelectedRingListButton();
        Model.storage.saveAllStorage(Model.ringList, Model.selectedId);
        this.loadRingListButtonTitles();

        // event listener for new ring title button
        let newRingTitleButton = this.findNewRingTitleButton(Model.selectedId);

        newRingTitleButton.addEventListener('click', (e:any) => 
      {     
        console.log(e.target.parentNode, e.target.parentNode.id)   
        this.attachRingTitleButtonListener(
        parseInt(e.target.parentNode.id.slice(7)), 
        e)

      })
      }); 
    }

    this.attachClickListener_ClearStorage = function () {
      document.getElementById("clear").addEventListener("click", (e) => {
        e.preventDefault();
        Model.storage.clearStorage();
        Model.resetModelToDefault();
        View.innerRings.clearInnerRings();
        View.ringTitleButtons.clearRingTitleButtons();
      });
    };






    this.HIGHLIGHT = "white"

    this.attachRingTitleButtonListener = (id, e) => {
    e.preventDefault();
    Model.selectedId = id;
    View.innerRings.clearInnerRings();
    Model.viewCommands.loadAllSelectedInnerRingsToDOM(Model.ringList, Model.selectedId);
    this.clearSelectedRingButton();
    this.styleSelectedRingListButton();

    Model.storage.saveAllStorage(Model.ringList, Model.selectedId);

    this.loadRingListButtonTitles();
    this.loadDisplayedTitle();

  }

    this.attachAllRingTitleButtonListeners = function () {
      let ringListButtons = document.querySelectorAll(".ringlistbutton");
      ringListButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          this.attachRingTitleButtonListener(parseInt(button.id.slice(7)), e)
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

    this.clearSelectedRingButton = function() {
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
    // for initial loaded ring

    
    this.findDiam = (posX, posY) => Math.sqrt(posX ** 2 + posY ** 2) * 2;

    this.attachDragListener_Styles = function () {
      document.addEventListener(
        "dragenter",
        function (event:any) {
          if (event.target.classList.contains("dragzone")) {
            event.target.classList.add("bg-stone-100");
          }
        },
        false
      );

      document.addEventListener(
        "dragleave",
        function (event:any) {
          if (event.target.classList.contains("dragzone")) {
            event.target.classList.remove("bg-stone-100");
          }
        },
        false
      );

      document.addEventListener(
        "dragend",
        function (event:any) {
          if (event.target.classList.contains("dragzone")) {
            event.target.classList.remove("bg-stone-100");
          }
        },
        false
      );
    };

    this.attachDragListener_NewInnerRing = function () {
      let dragStartX;
      let dragEndX;
      let dragStartY;
      let dragEndY;
      let innerRing = document.querySelector("#iring");


      innerRing.addEventListener("mouseenter", (event:any) => {
        event.target.classList.add("bg-stone-300");
      });

      innerRing.addEventListener("mouseout", (event:any) => {
        event.target.classList.remove("bg-stone-300");
      });

      innerRing.addEventListener("dragstart", (event:any) => {
        dragStartX = event.screenX;
        dragStartY = event.screenY;
        View.innerRings.removeInnerRingDragPreview(event);
      });

      innerRing.addEventListener("dragend", (event:any) => {

        event.preventDefault();
        dragEndX = event.screenX;
        dragEndY = event.screenY;

        event.target.classList.remove("bg-stone-300");

        let posX = Math.abs(dragEndX - dragStartX);
        let posY = Math.abs(dragEndY - dragStartY);

        let diam = Math.round(this.findDiam(posX, posY));

        if (diam < 970) {
          View.innerRings.addInnerRing(diam);
          Model.addNewInnerRingToRingList(diam)
          Model.storage.saveAllStorage(Model.ringList, Model.selectedId)
        }
      });
    };


    this.attachDisplayedTitleListener = () => {
      let node = document.getElementById('textdisplaytitle')

      node.addEventListener("keydown", (e:any) =>{
        if (e.code === "Enter") {  
          console.log('you pressd enter', e.target.value)
          Model.ringList.forEach((ring:ring) => {
            if (ring.id === Model.selectedId){
              console.log(e.target.value)
              ring.title = e.target.value;
              Model.storage.saveAllStorage(Model.ringList, Model.selectedId);
            }
            })
            node.blur();
            this.loadRingListButtonTitles();
            }
          })
    }

    this.loadDisplayedTitle = () => {
      (<HTMLInputElement>document.getElementById('textdisplaytitle')).value = Model.ringList.filter((ringList:ring) => ringList.id == Model.selectedId)[0].title;
    }



  }


}
