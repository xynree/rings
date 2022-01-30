import { ModelType, ControllerType, ViewType, Controller_TitlesType, Controller_SetupType, Controller_DefaultType, Controller_DragType, Controller_RingListButtonsType, Controller_TextType } from '../Types/Types.js'
import Controller_Default  from './Controller_Default.js'
import Controller_Drag from './Controller_Drag.js'
import Controller_RingListButtons from './Controller_RingListButtons.js'
import Controller_Titles from './Controller_Titles.js'
import Controller_Text from './Controller_Text.js'
import Controller_Setup from './Controller_Setup.js'
import View_InnerRings from '../View/View_InnerRings.js'
import View_Default from '../View/View_Default.js'


export default class Controller implements ControllerType  {
  constructor(Model:ModelType, View:ViewType) {

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
      this.Default.loadDefaults();
      Model.Storage.saveAllStorage(Model.ringList, Model.selectedId, View.color);
    }
    this._attachTitles();
  }

    this.Drag = new Controller_Drag(Model, View);
    this.Titles = new Controller_Titles(Model,View);
    this.Text = new Controller_Text(Model, View);
    this.Setup = new Controller_Setup(Model, View)
    this.RingListButtons= new Controller_RingListButtons(Model, View, this.Titles.loadDisplayedTitle, this.Text.refreshNodes);
    this.Default = new Controller_Default(View, this.RingListButtons.attachRingTitleButtonListener, this.Titles.loadDisplayedTitle, this.Text.refreshNodes);

    this._getLoadedColors = () => {
      View.color = Model.Storage.loadColorFromStorage();
      View.InnerRings = new View_InnerRings(View.color)
      View.Default = new View_Default(View.color);
    }

    this._loadInitialListeners = () => {
      this.Setup.attachColorButtonListener(this.setup);
      this.RingListButtons.attachAddNewRingListener();
      this.Drag.attachDocumentDragListeners();
      this.Drag.attachDragListener_NewInnerRing();
      this.Setup.attachClickListener_ClearStorage(this.setup);
      this.Text.attachDblClickListener();
      this.Text.attachDeleteListener();
    }

    this._loadModelFromStorage = () => {
      Model.selectedId = Model.Storage.loadSelectedIdFromStorage();
      Model.ringList = Model.Storage.loadRingListFromStorage();
      if (Model.Storage.loadText() !== null) {
        Model.textList = Model.Storage.loadText();
      }
    }

    this._attachRingListListeners = () => {
      this.RingListButtons.attachAllRingTitleButtonListeners();
      this.RingListButtons.refreshSelectedRingListButtons();
      this.RingListButtons.attachAllDeleteListeners();
    }

    this._attachTitles = () => {
      this.Titles.loadDisplayedTitle();
      this.Titles.attachDisplayedTitleListener(this.RingListButtons.loadRingListButtonTitles);
      this.RingListButtons.loadRingListButtonTitles();
    }

}

setup: () => void;

_getLoadedColors: () => void;
_loadInitialListeners: () => void;
_loadModelFromStorage: () => void;
_attachRingListListeners: () => void;
_attachTitles: () => void;
Default: Controller_DefaultType;
Drag: Controller_DragType;
RingListButtons: Controller_RingListButtonsType;
Titles: Controller_TitlesType;
Text: Controller_TextType;
Setup: Controller_SetupType;
}