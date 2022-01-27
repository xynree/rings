import { ModelType } from '../Model/Model.js'
import { ViewType } from '../View/View.js'
import Controller_Default, { Controller_DefaultType }  from './Controller_Default.js'
import Controller_Drag, { Controller_DragType } from './Controller_Drag.js'
import Controller_RingListButtons, { Controller_RingListButtonsType } from './Controller_RingListButtons.js'
import Controller_Titles, {Controller_TitlesType} from './Controller_Titles.js'


export default class Controller  {

  Default: Controller_DefaultType;
  Drag: Controller_DragType;
  RingListButtons: Controller_RingListButtonsType;
  Titles: Controller_TitlesType;

  setup: () => void;
  
  attachAddNewRingListener: () => void;
  attachClickListener_ClearStorage: () => void;

  constructor(Model:ModelType, View:ViewType) {

    this.Default = new Controller_Default(View);
    this.Drag = new Controller_Drag(Model, View);
    this.RingListButtons= new Controller_RingListButtons(Model, View);
    this.Titles = new Controller_Titles(Model,View);

    this.setup = function() {
      View.default.loadDefaultView();
      this.attachAddNewRingListener();
      this.Drag.attachDragListener_Styles();
      this.Drag.attachDragListener_NewInnerRing();
      this.attachClickListener_ClearStorage();

      if (Model.storage.hasStoredRings()){
        Model.selectedId = Model.storage.loadSelectedIdFromStorage();
        Model.ringList = Model.storage.loadRingListFromStorage();
        View.ringTitleButtons.clearRingTitleButtons();
        Model.viewCommands.loadRingTitleButtonsToDOM(Model.ringList);
        Model.viewCommands.loadAllSelectedInnerRingsToDOM(Model.ringList, Model.selectedId);

        this.RingListButtons.attachAllRingTitleButtonListeners(this.Titles.loadDisplayedTitle);
        this.RingListButtons.clearSelectedRingListButton(Model.selectedId);
        this.RingListButtons.styleSelectedRingListButton();

      } else{
        this.Default.loadDefaults(this.RingListButtons.attachRingTitleButtonListener, this.Titles.loadDisplayedTitle);

        Model.storage.saveAllStorage(Model.ringList, Model.selectedId);
      }
      this.Titles.loadDisplayedTitle();
      this.Titles.attachDisplayedTitleListener(this.RingListButtons.loadRingListButtonTitles);
      this.RingListButtons.loadRingListButtonTitles();
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
        this.RingListButtons.clearSelectedRingListButton();

        this.RingListButtons.styleSelectedRingListButton();
        Model.storage.saveAllStorage(Model.ringList, Model.selectedId);
        this.RingListButtons.loadRingListButtonTitles();

        // event listener for new ring title button
        let newRingTitleButton = this.RingListButtons.findNewRingTitleButton(Model.selectedId);

        newRingTitleButton.addEventListener('click', (e:any) => 
      {     
        console.log(e.target.parentNode, e.target.parentNode.id)   
        this.RingListButtons.attachRingTitleButtonListener(
        parseInt(e.target.parentNode.id.slice(7)), 
        e, this.Titles.loadDisplayedTitle)

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

 


  }


}
