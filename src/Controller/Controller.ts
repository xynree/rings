import { ModelType } from '../Model/Model.js'
import { ViewType } from '../View/View.js'
import Controller_Default, { Controller_DefaultType }  from './Controller_Default.js'
import Controller_Drag, { Controller_DragType } from './Controller_Drag.js'
import Controller_RingListButtons, { Controller_RingListButtonsType } from './Controller_RingListButtons.js'
import Controller_Titles, {Controller_TitlesType} from './Controller_Titles.js'
import Controller_Text, { Controller_TextType } from './Controller_Text.js'
import Controller_Setup, { Controller_SetupType } from './Controller_Setup.js'
import View_InnerRings from '../View/View_InnerRings.js'
import View_Default, {View_DefaultType} from '../View/View_Default.js'

export interface ControllerType {
  Default: Controller_DefaultType;
  Drag: Controller_DragType;
  RingListButtons: Controller_RingListButtonsType;
  Titles: Controller_TitlesType;
  Text: Controller_TextType;
  Setup: Controller_SetupType;

  setup: () => void;


  _getLoadedColors: () => void;
  _loadInitialListeners: () => void;
  _loadModelFromStorage: () => void;
  _attachRingListListeners: () => void;

}

export default class Controller implements ControllerType  {

  constructor(Model:ModelType, View:ViewType) {

    this.Default = new Controller_Default(View);
    this.Drag = new Controller_Drag(Model, View);
    this.Titles = new Controller_Titles(Model,View);
    this.Text = new Controller_Text(Model, View);
    this.Setup = new Controller_Setup(Model, View)
    this.RingListButtons= new Controller_RingListButtons(Model, View, this.Titles.loadDisplayedTitle, this.Text.refreshNodes);


    this.setup = () => {
      Model.Storage.hasColor() ? this._getLoadedColors() : '';
      View.Default.loadDefaultView();
      this._loadInitialListeners();

      if (Model.Storage.hasStoredRings()) {

        this._loadModelFromStorage();
        Model.ViewCommands.loadAllSelectedInnerRingsToDOM(Model.ringList, Model.selectedId);
        View.RingTitleButtons.clearRingTitleButtons();
        Model.ViewCommands.loadRingTitleButtonsToDOM(Model.ringList);
        this.Text.refreshNodes();
        this._attachRingListListeners();

      } else {
        this.Default.loadDefaults(this.RingListButtons.attachRingTitleButtonListener, this.Titles.loadDisplayedTitle, this.Text.refreshNodes);
        Model.Storage.saveAllStorage(Model.ringList, Model.selectedId, View.color);
      }
      this._attachTitles();
    }



    this._getLoadedColors = () => {
      View.color = Model.Storage.loadColorFromStorage();
      View.InnerRings = new View_InnerRings(View.color)
      View.Default = new View_Default(View.color);
    }

    this._loadInitialListeners = () => {
      this.Setup.attachColorButtonListener(this.setup);
      this.RingListButtons.attachAddNewRingListener();
      this.Drag.attachDragListener_Styles();
      this.Drag.attachDragListener_NewInnerRing();
      this.Setup.attachClickListener_ClearStorage();
      this.Text.attachDblClickListener();
    }

    this._loadModelFromStorage = () => {
      Model.selectedId = Model.Storage.loadSelectedIdFromStorage();
      Model.ringList = Model.Storage.loadRingListFromStorage();
      if (Model.Storage.loadText() !== null) {
        Model.textList = Model.Storage.loadText();
      }
    }

    this._attachRingListListeners = () => {t
      this.RingListButtons.attachAllRingTitleButtonListeners();
      this.RingListButtons.clearSelectedRingListButton();
      this.RingListButtons.styleSelectedRingListButton();
      this.RingListButtons.attachAllDeleteListeners();
    }

    this._attachTitles = () => {
      this.Titles.loadDisplayedTitle();
      this.Titles.attachDisplayedTitleListener(this.RingListButtons.loadRingListButtonTitles);
      this.RingListButtons.loadRingListButtonTitles();
    }

  }

  Default: Controller_DefaultType;
  Drag: Controller_DragType;
  RingListButtons: Controller_RingListButtonsType;
  Titles: Controller_TitlesType;
  Text: Controller_TextType;
  Setup: Controller_SetupType;


  /**
   * sets up function
   */
  setup: () => void;

  /**
   * Gets color from storage and sets a new Inner Rings / Default object with new color loaded in.
   */
  _getLoadedColors: () => void;
  /**
   * Loads initial event listeners: Color Button, Add New Ring, Drag Listeners, Clear Storage, Double Click
   */
  _loadInitialListeners: () => void;

  /**
   * Loads ringList, id, and textList from storage
   */
  _loadModelFromStorage: () => void;

  /**
   * Attaches listeners to Ring List buttons + Delete Buttons, then clears and styles them
   */
  _attachRingListListeners: () => void;

  /**
   * Loads Display + Ring Button Titles + Listener for Display Title
   */
  _attachTitles: () => void;

}
