import Controller_Default from './Controller_Default.js';
import Controller_Drag from './Controller_Drag.js';
import Controller_RingListButtons from './Controller_RingListButtons.js';
import Controller_Titles from './Controller_Titles.js';
import Controller_Text from './Controller_Text.js';
export default class Controller {
    constructor(Model, View) {
        this.Default = new Controller_Default(View);
        this.Drag = new Controller_Drag(Model, View);
        this.RingListButtons = new Controller_RingListButtons(Model, View);
        this.Titles = new Controller_Titles(Model, View);
        this.Text = new Controller_Text(Model, View);
        this.setup = function () {
            View.default.loadDefaultView();
            this.attachColorButtonListener();
            this.attachAddNewRingListener();
            this.Drag.attachDragListener_Styles();
            this.Drag.attachDragListener_NewInnerRing();
            this.attachClickListener_ClearStorage();
            this.Text.attachDblClickListener();
            if (Model.storage.hasStoredRings()) {
                Model.selectedId = Model.storage.loadSelectedIdFromStorage();
                Model.ringList = Model.storage.loadRingListFromStorage();
                View.ringTitleButtons.clearRingTitleButtons();
                Model.viewCommands.loadRingTitleButtonsToDOM(Model.ringList);
                Model.viewCommands.loadAllSelectedInnerRingsToDOM(Model.ringList, Model.selectedId);
                this.RingListButtons.attachAllRingTitleButtonListeners(this.Titles.loadDisplayedTitle);
                this.RingListButtons.clearSelectedRingListButton(Model.selectedId);
                this.RingListButtons.styleSelectedRingListButton();
            }
            else {
                this.Default.loadDefaults(this.RingListButtons.attachRingTitleButtonListener, this.Titles.loadDisplayedTitle);
                Model.storage.saveAllStorage(Model.ringList, Model.selectedId);
            }
            this.Titles.loadDisplayedTitle();
            this.Titles.attachDisplayedTitleListener(this.RingListButtons.loadRingListButtonTitles);
            this.RingListButtons.loadRingListButtonTitles();
        };
        this.attachColorButtonListener = () => {
            let colorbutton = document.getElementById('colorbutton');
            colorbutton.addEventListener('click', () => {
                let colorIndex = View.colorList.findIndex(color => color === View.color);
                if (colorIndex + 1 < View.colorList.length) {
                    View.color = View.colorList[colorIndex + 1];
                }
                else
                    View.color = View.colorList[0];
                console.log(View.color);
            });
        };
        this.attachAddNewRingListener = function () {
            let newRing = document.getElementById("newring");
            newRing.addEventListener("click", (e) => {
                e.preventDefault();
                Model.selectedId = Model.ringList[Model.ringList.length - 1].id + 1;
                console.log(Model.selectedId);
                Model.addNewRingToRingListFromSelectedId(Model.selectedId);
                View.innerRings.clearInnerRings();
                View.ringTitleButtons.addRingTitleButton(Model.selectedId);
                this.RingListButtons.clearSelectedRingListButton();
                this.RingListButtons.styleSelectedRingListButton();
                Model.storage.saveAllStorage(Model.ringList, Model.selectedId);
                this.RingListButtons.loadRingListButtonTitles();
                this.Titles.loadDisplayedTitle();
                // event listener for new ring title button
                let newRingTitleButton = this.RingListButtons.findNewRingTitleButton(Model.selectedId);
                newRingTitleButton.addEventListener('click', (e) => {
                    console.log(e.target.parentNode, e.target.parentNode.id);
                    this.RingListButtons.attachRingTitleButtonListener(parseInt(e.target.parentNode.id.slice(7)), e, this.Titles.loadDisplayedTitle);
                });
            });
        };
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
//# sourceMappingURL=Controller.js.map