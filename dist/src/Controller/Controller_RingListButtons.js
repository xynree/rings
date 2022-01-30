export default class Controller_RingListButtons {
    constructor(Model, View, loadDisplayedTitle, refreshNodes) {
        this._HIGHLIGHT = "white";
        this.attachRingTitleButtonListener = (elem, id) => {
            elem.addEventListener('click', () => {
                Model.selectedId = id;
                View.InnerRings.clearInnerRings();
                Model.ViewCommands.loadAllSelectedInnerRingsToDOM(Model.ringList, Model.selectedId);
                this._clearSelectedRingListButtons();
                this._styleSelectedRingListButtons();
                Model.Storage.saveAllStorage(Model.ringList, Model.selectedId, View.color);
                this.loadRingListButtonTitles();
                Model.selectedTextId = 0;
                loadDisplayedTitle();
                refreshNodes();
            });
        };
        this.attachAllRingTitleButtonListeners = function () {
            document.querySelectorAll(".ringtitlebuttongroup").forEach((group) => {
                this.attachRingTitleButtonListener(group.firstElementChild, Number(group.id.slice(7)));
                this._attachDeleteListener(group.lastElementChild, Model.selectedId);
            });
        };
        this.attachAllDeleteListeners = () => document.querySelectorAll('.ringlistdelete').forEach((elem) => this._attachDeleteListener(elem));
        this.loadRingListButtonTitles = () => document.querySelectorAll("#ringlistbutton").forEach((button) => button.innerText = Model.ringList.filter((ring) => ring.id === Number(button.parentNode.id.slice(7)))[0].title);
        this.refreshSelectedRingListButtons = () => {
            this._clearSelectedRingListButtons();
            this._styleSelectedRingListButtons();
        };
        this.attachAddNewRingListener = () => {
            document.getElementById("newring").addEventListener("click", (e) => {
                e.preventDefault();
                Model.selectedId = Model.ringList[Model.ringList.length - 1].id + 1;
                Model.addNewRingToRingListFromSelectedId(Model.selectedId);
                View.InnerRings.clearInnerRings();
                View.RingTitleButtons.addRingTitleButton(Model.selectedId);
                this.refreshSelectedRingListButtons();
                Model.Storage.saveAllStorage(Model.ringList, Model.selectedId, View.color);
                this.loadRingListButtonTitles();
                loadDisplayedTitle();
                refreshNodes();
                // event listener for new ring title button
                let newRingTitleButton = this._findRingTitleButton(Model.selectedId);
                this._attachDeleteListener(newRingTitleButton.lastElementChild);
                this.attachRingTitleButtonListener(newRingTitleButton, Model.selectedId);
            });
        };
        this._attachDeleteListener = (elem) => {
            elem.addEventListener('click', (e) => {
                let clickedId = Number(e.target.parentNode.id.slice(7));
                View.RingTitleButtons.clearButton(e.target.parentNode);
                if (Model.selectedId === clickedId) {
                    Model.selectedId = 1;
                    View.InnerRings.clearInnerRings();
                    Model.ViewCommands.loadAllSelectedInnerRingsToDOM(Model.ringList, Model.selectedId);
                    loadDisplayedTitle();
                }
                Model.ringList = Model.ringList.filter(({ id }) => id !== clickedId);
                Model.textList = Model.textList.filter(({ ringId }) => ringId !== clickedId);
                Model.Storage.saveAllStorage(Model.ringList, Model.selectedId, View.color);
                refreshNodes();
            });
        };
        this._clearSelectedRingListButtons = function () {
            document.querySelectorAll('#ringlistbutton').forEach((elem) => {
                if (Number(elem.parentNode.id.slice(7)) !== Model.selectedId) {
                    elem.classList.remove(`bg-${View.color}-100`);
                    elem.classList.add(`bg-transparent`);
                }
            });
        };
        this._styleSelectedRingListButtons = function () {
            if (Model.selectedId !== 1) {
                document.querySelectorAll('#ringlistbutton').forEach((button) => {
                    if (Number(button.parentNode.id.slice(7)) === Model.selectedId) {
                        button.classList.remove(`bg-transparent`);
                        button.classList.add(`bg-${View.color}-100`);
                    }
                });
            }
            else {
                let ringListButton = document.querySelector('#ringlistbutton');
                ringListButton.classList.remove(`bg-transparent`);
                ringListButton.classList.add(`bg-${View.color}-100`);
            }
        };
        this._findRingTitleButton = (id) => document.getElementById(`ringid_${id}`);
    }
}
//# sourceMappingURL=Controller_RingListButtons.js.map