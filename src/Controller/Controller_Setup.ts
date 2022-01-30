import { Controller_SetupType, ModelType, ViewType } from '../Types/Types.js'

export default class Controller_Setup implements Controller_SetupType {
  
  clear = () => document.body.innerHTML = '';

  attachClickListener_ClearStorage = (setup) => {
    document.getElementById("clear").addEventListener("click", () => {
      this._resetModelAndView();
      this.clear();
      setup();
    })
  }

  attachColorButtonListener = (setup) => {
    let colorbutton = document.getElementById('colorbutton');
    colorbutton.addEventListener('click', () => {
      this._incrementColors();
      this.clear();
      setup();
    })
  }
  
  _resetModelAndView: () => void;
  _incrementColors: () => void;

  constructor(Model:ModelType, View:ViewType) {
    this._incrementColors = () => {
      let colorIndex = View.colorList.findIndex(color => color === View.color);
      View.color = colorIndex % View.colorList.length === 0 ? View.colorList[0]: View.colorList[colorIndex+1]
      Model.Storage.saveColor(View.color);
    }
    this._resetModelAndView = () => {
      Model.Storage.clearStorage();
      Model.resetModelToDefault();
      View.InnerRings.clearInnerRings();
      View.RingTitleButtons.clearRingTitleButtons();
    }
  }
}