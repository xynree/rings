/** Model Types */

export interface ModelType {
  Storage: Model_StorageType;
  ViewCommands: Model_ViewCommandsType;

  textList: textNode[];
  ringList: ring[];
  selectedId: number;
  selectedTextId: number;

  addNewInnerRingToRingList: (val: number) => void;
  addNewRingToRingListFromSelectedId: (val: number) => void;
  resetModelToDefault: () => void;
}

export interface Model_ViewCommandsType {
  loadAllSelectedInnerRingsToDOM: (ringList:ring[], selectedId:number) => void;
  loadRingTitleButtonsToDOM: (ringList:ring[]) => void;
}

export interface Model_StorageType {
  hasStoredRings: () => boolean;
  hasColor: () => boolean;
  loadSelectedIdFromStorage: () => number;
  loadRingListFromStorage: () => ring[];
  saveAllStorage: (ringList: ring[], selectedId: number, color: string) => void;
  clearStorage: () => void;
  saveColor: (color:string) => void;
  loadColorFromStorage: () => string;
  saveText: (textNodeList:any[]) => void;
  loadText:() => any[];
}

/** Controller Types */

export interface ControllerType {
  /** sets up initial load for project */
  setup: (Model:ModelType, View:ViewType) => void;
  /**  Gets color from storage and sets a new Inner Rings / Default object with new color loaded in.*/
  _getLoadedColors: () => void;
  /** Loads initial event listeners: Color Button, Add New Ring, Drag Listeners, Clear Storage, Double Click */
  _loadInitialListeners: () => void;
  /** Loads ringList, id, and textList from storage */
  _loadModelFromStorage: () => void;
  /** Attaches listeners to Ring List buttons + Delete Buttons, then clears and styles them*/
  _attachRingListListeners: () => void;
  /** Loads Display + Ring Button Titles + Listener for Display Title */
  _attachTitles: () => void;
  /** Styling and setup for on-load functions */
  Default: Controller_DefaultType;
  /** Listeners for drag effects on Document + Inner Riings */
  Drag: Controller_DragType;
  /** Listeners/Options for controlling action related to Ring List Buttons */
  RingListButtons: Controller_RingListButtonsType;
  /** Displayed Titles Throughout */
  Titles: Controller_TitlesType;
  /** Controllling Text  */
  Text: Controller_TextType;
  /** Functions running on load used in setup() function */
  Setup: Controller_SetupType;

}

export interface Controller_TitlesType{
  /** Finds displayed title -> attaches "Enter" Listener to It */
  attachDisplayedTitleListener:(loadRingListButtonTitles:Function) => void;
  /** Sets Displayed Title onto DOM */
  loadDisplayedTitle:() => void;
}

export interface Controller_SetupType {
  /** clears whole document */
  clear: () => void;
  /** Attaches listener -> Reset Storage (Clear) Button */
  attachClickListener_ClearStorage: (setup:Function) => void;
  /** Cycles through colors -> Resets page */
  attachColorButtonListener: (setup:Function) => void;
}

export interface Controller_TextType {

  /** clears and reloads text */
  refreshNodes: () => void;
  /** attaches listeners for adding text on double click */
  attachDblClickListener: () => void;
  /** attaches listener for deleting text on drop */
  attachDeleteListener : () => void;

  _addNewTextNodeToTextList: (textNode:textNode) => void;
  _createNewNode: (x:number, y:number, innerText?:string) => HTMLElement;
  _updateTextNode: (text:string, ringId:number, textId:number, x:number, y:number) => void;
  _attachTextListener: (elem:HTMLElement, x:number, y:number) => HTMLElement;
  _removeOldNodes: () => void;
  _loadTextNodes: () => void;
  _findTextNode: (ringId:number, textId:number) => textNode

}

export interface Controller_RingListButtonsType {
  _HIGHLIGHT: string;

  attachRingTitleButtonListener: (elem:HTMLElement, id:number) => void;
  attachAllRingTitleButtonListeners: () => void;
  loadRingListButtonTitles:() => void;
  refreshSelectedRingListButtons: () => void;
  attachAllDeleteListeners: () => void;
  attachAddNewRingListener: () => void;

  _clearSelectedRingListButtons:() => void;
  _styleSelectedRingListButtons:() => void;
  _attachDeleteListener: (btn:HTMLElement) => void;
  _findRingTitleButton: (id:number) => Element;
}

export interface Controller_DragType {

  attachDocumentDragListeners:()=> void;
  attachDragListener_NewInnerRing: () => void;
  _findDiam: (posX:number, posY:number) => number;

}

export interface Controller_DefaultType {
  /** styles default RingButton and loads Default Listener */
  loadDefaults: () => void;
  /** sets up default ring list button with listener */
  _loadDefaultRingTitleButtonListener: () => void;
  /** Highlights default ring button */
  _styleDefaultRingButton: () => void; 
}

/** View Types */

export interface ViewType {
  Default: View_DefaultType;
  InnerRings: View_InnerRingsType;
  RingTitleButtons: View_RingTitleButtonsType;

  colorList: string[];
  color: string;
}

export interface View_RingTitleButtonsType {
  addRingTitleButton: (id:number) => void;
  clearRingTitleButtons: () => void;
  clearButton: (elem:HTMLElement) => void;
}

export interface View_InnerRingsType {
  addInnerRing: (value:number) => void;
  clearInnerRings: () => void;
  removeInnerRingDragPreview: (e:any) => void;
}

export interface View_DefaultType {

/** setups up View using color and default html */
loadDefaultView: () => void;

  defaultView: string;
  styles: {text1: string, text2:string, border: string, highlight: string, hover: string, focus: string, selection: string, caret: string, bg:string};
}



/** One-off Types */

export type ring = {
  id:number, title:string, innerRings:number[] 
}

export type textNode = { ringId:number, textId:number, body:string, x:number, y:number }