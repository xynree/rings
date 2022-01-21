import Controller_RingListButtons, {Controller_RingListButtonsType} from './Controller_RingListButtons.js';
import Controller_Default, {Controller_DefaultType} from './Controller_Default.js'
import Controller_DisplayedTitle, {Controller_DisplayedTitleType} from './Controller_DisplayedTitle.js';
import Controller_DragListeners, {Controller_DragListenersType} from './Controller_DragListeners.js'
import { ModelType } from '../Model/Model.js'
import { ViewType } from '../View/View.js'

export interface ControllerType {
  dragListeners: Controller_DragListenersType;
  ringListButtons: Controller_RingListButtonsType;
  default: Controller_DefaultType;
  displayedTitle: Controller_DisplayedTitleType;

  attachAddNewRingListener:() => void;
  attachClickListener_ClearStorage:()=> void;

  setup: () => void;
}

export default class Controller implements ControllerType {

  dragListeners: Controller_DragListenersType;
  ringListButtons: Controller_RingListButtonsType;
  default: Controller_DefaultType;
  displayedTitle: Controller_DisplayedTitleType;

  attachAddNewRingListener:() => void;
  attachClickListener_ClearStorage:()=> void;

  setup: () => void;

  constructor(Model:ModelType, View:ViewType) {

    this.ringListButtons = new Controller_RingListButtons(Model,View);
    this.default = new Controller_Default(View);
    this.displayedTitle = new Controller_DisplayedTitle(Model,View);
    this.dragListeners = new Controller_DragListeners(Model,View)
    
    this.setup = function() {
      View.default.loadDefaultView();
      this.attachAddNewRingListener();
      this.dragListeners.attachDragListener_Styles();
      this.dragListeners.attachDragListener_NewInnerRing();
      this.attachClickListener_ClearStorage();

      if (Model.storage.hasStoredRings()){
        Model.selectedId = Model.storage.loadSelectedIdFromStorage();
        Model.ringList = Model.storage.loadRingListFromStorage();
        View.ringTitleButtons.clearRingTitleButtons();
        Model.viewCommands.loadRingTitleButtonsToDOM(Model.ringList);
        Model.viewCommands.loadAllSelectedInnerRingsToDOM(Model.ringList, Model.selectedId);

        this.ringListButtons.attachAllRingTitleButtonListeners(this.displayedTitle.loadDisplayedTitle);

        this.ringListButtons.clearSelectedRingButton(Model.selectedId);
        this.ringListButtons.styleSelectedRingListButton(Model.selectedId);

      } else{
        this.default.styleDefaultRingButton();
        this.default.loadDefaultRingTitleButtonListener(this.ringListButtons.attachRingTitleButtonListener, this.displayedTitle.loadDisplayedTitle);

        Model.storage.saveAllStorage(Model.ringList, Model.selectedId);
      }
      this.displayedTitle.loadDisplayedTitle();
      this.displayedTitle.attachDisplayedTitleListener(this.ringListButtons.loadRingListButtonTitles);
      this.ringListButtons.loadRingListButtonTitles();
    }

    this.attachAddNewRingListener = function () {
      let newRing = document.getElementById("newring");
      newRing.addEventListener("click", (e:any) => {
        e.preventDefault();
        console.log('new ring clicked', Model)

        Model.selectedId++;
        Model.addNewRingToRingListFromSelectedId(Model.selectedId);
        View.innerRings.clearInnerRings();
        View.ringTitleButtons.addRingTitleButton(Model.selectedId);
        this.ringListButtons.clearSelectedRingButton(Model.selectedId);
        this.ringListButtons.styleSelectedRingListButton(Model.selectedId)
        Model.storage.saveAllStorage(Model.ringList, Model.selectedId);
        this.ringListButtons.loadRingListButtonTitles();

        // event listener for new ring title button
        let newRingTitleButton = this.ringListButtons.findNewRingTitleButton(Model.selectedId);
        newRingTitleButton.addEventListener('click', (e:any) => 
        this.ringListButtons.attachRingTitleButtonListener(
          parseInt(e.target.parentNode.id.slice(7)), 
          e,
          this.displayedTitle.loadDisplayedTitle))
      }); 
    }

    this.attachClickListener_ClearStorage = function () {
      document.getElementById("clear").addEventListener("click", (e) => {
        e.preventDefault();
        Model.storage.clearStorage();
        Model.resetModelToDefault();
        View.innerRings.clearInnerRings();
        View.ringTitleButtons.clearRingTitleButtons();
        console.log("storage cleared!", localStorage);
      });
    };

  }


}
