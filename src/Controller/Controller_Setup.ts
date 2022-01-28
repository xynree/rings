
export interface Controller_SetupType {
  clear: () => void;
  attachClickListener_ClearStorage: () => void;
  attachColorButtonListener: (setup:Function) => void;
}

export default class Controller_Setup {

  constructor(Model, View) {

    this.clear = () => document.body.innerHTML = '';

    this.attachColorButtonListener = (setup) => {

      let colorbutton = document.getElementById('colorbutton');
      colorbutton.addEventListener('click', () => {
        let colorIndex = View.colorList.findIndex(color => color === View.color);

        if (colorIndex+1 < View.colorList.length) {
          View.color = View.colorList[colorIndex+1]
        } else View.color = View.colorList[0];
        console.log(View.color);
        Model.Storage.saveColor(View.color);

        this.clear();
        setup();
      })
    }

    this.attachClickListener_ClearStorage = function () {
      document.getElementById("clear").addEventListener("click", (e) => {
        e.preventDefault();
        Model.Storage.clearStorage();
        Model.resetModelToDefault();
        View.InnerRings.clearInnerRings();
        View.RingTitleButtons.clearRingTitleButtons();
      });
    };

  }
  
  clear: () => void;
  attachClickListener_ClearStorage: () => void;
  attachColorButtonListener: (setup:Function) => void;
}