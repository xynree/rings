export default class Controller_Setup {
    constructor(Model, View) {
        this.clear = () => document.body.innerHTML = '';
        this.attachClickListener_ClearStorage = (setup) => {
            document.getElementById("clear").addEventListener("click", () => {
                this._resetModelAndView();
                this.clear();
                setup();
            });
        };
        this.attachColorButtonListener = (setup) => {
            let colorbutton = document.getElementById('colorbutton');
            colorbutton.addEventListener('click', () => {
                this._incrementColors();
                this.clear();
                setup();
            });
        };
        this._incrementColors = () => {
            let colorIndex = View.colorList.findIndex(color => color === View.color);
            View.color = colorIndex % View.colorList.length === 0 ? View.colorList[0] : View.colorList[colorIndex + 1];
            Model.Storage.saveColor(View.color);
        };
        this._resetModelAndView = () => {
            Model.Storage.clearStorage();
            Model.resetModelToDefault();
            View.InnerRings.clearInnerRings();
            View.RingTitleButtons.clearRingTitleButtons();
        };
    }
}
//# sourceMappingURL=Controller_Setup.js.map