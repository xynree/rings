import Controller_Default from './Controller_Default.js';
import Controller_Drag from './Controller_Drag.js';
import Controller_RingListButtons from './Controller_RingListButtons.js';
import Controller_Titles from './Controller_Titles.js';
import Controller_Text from './Controller_Text.js';
import View_InnerRings from '../View/View_InnerRings.js';
import View_Default from '../View/View_Default.js';
export default class Controller {
    constructor(Model, View) {
        this.Default = new Controller_Default(View);
        this.Drag = new Controller_Drag(Model, View);
        this.RingListButtons = new Controller_RingListButtons(Model, View);
        this.Titles = new Controller_Titles(Model, View);
        this.Text = new Controller_Text(Model, View);
        this.clear = () => {
            document.body.innerHTML = '';
        };
        this.setup = function () {
            if (Model.storage.hasColor()) {
                View.color = Model.storage.loadColorFromStorage();
                View.innerRings = new View_InnerRings(View.color);
                View.default = new View_Default(View.color);
            }
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
                Model.textList = Model.storage.loadText();
                this.Text.loadTextNodes();
                View.ringTitleButtons.clearRingTitleButtons();
                Model.viewCommands.loadRingTitleButtonsToDOM(Model.ringList);
                Model.viewCommands.loadAllSelectedInnerRingsToDOM(Model.ringList, Model.selectedId);
                this.RingListButtons.attachAllRingTitleButtonListeners(this.Titles.loadDisplayedTitle);
                this.RingListButtons.clearSelectedRingListButton(Model.selectedId);
                this.RingListButtons.styleSelectedRingListButton();
                this.RingListButtons.attachAllDeleteListeners(this.Titles.loadDisplayedTitle);
            }
            else {
                this.Default.loadDefaults(this.RingListButtons.attachRingTitleButtonListener, this.Titles.loadDisplayedTitle);
                Model.storage.saveAllStorage(Model.ringList, Model.selectedId, View.color);
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
                Model.storage.saveColor(View.color);
                this.clear();
                this.setup();
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
                Model.storage.saveAllStorage(Model.ringList, Model.selectedId, View.color);
                this.RingListButtons.loadRingListButtonTitles();
                this.Titles.loadDisplayedTitle();
                // event listener for new ring title button
                let newRingTitleButton = this.RingListButtons.findNewRingTitleButton(Model.selectedId);
                this.RingListButtons.attachDeleteListener(newRingTitleButton.lastElementChild, this.Titles.loadDisplayedTitle);
                newRingTitleButton.addEventListener('click', (e) => {
                    if (e.target.parentNode.id === 'ringlistdelete' || e.target.parentNode.id === 'ringlistdeletespan')
                        return;
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