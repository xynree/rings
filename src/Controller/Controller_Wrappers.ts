import {ModelType, ViewType, Controller_WrappersType } from '../Types/Types.js'

export default class Controller_Wrappers implements Controller_WrappersType{

  saveAllStorageWrapper :(func:Function) => Function
  resetModelViewWrapper : (func: Function) => Function

  constructor(Model:ModelType, View:ViewType){

    this.saveAllStorageWrapper = (func) => {
      return function(){
        func.apply(this,...arguments);
        Model.Storage.saveAllStorage(Model.ringList, Model.selectedId, View.color)
        console.log('the wrapper was applied!')
      }
    }

    this.resetModelViewWrapper = (func) => {
      return function() {
        func.apply(this, ...arguments);
        Model.Storage.clearStorage();
        Model.resetModelToDefault();
        View.InnerRings.clearInnerRings();
        View.RingTitleButtons.clearRingTitleButtons();

      }
    }

  }
}