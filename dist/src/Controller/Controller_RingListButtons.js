export default class Controller_RingListButtons {
    constructor(Model, View) {
        this.HIGHLIGHT = "white";
        this.attachRingTitleButtonListener = (elem, id, loadDisplayedTitle, removeOldNodes, loadTextNodes) => {
            elem.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('ring title listener clumped');
                Model.selectedId = id;
                View.InnerRings.clearInnerRings();
                Model.viewCommands.loadAllSelectedInnerRingsToDOM(Model.ringList, Model.selectedId);
                this.clearSelectedRingListButton();
                this.styleSelectedRingListButton();
                Model.storage.saveAllStorage(Model.ringList, Model.selectedId, View.color);
                this.loadRingListButtonTitles();
                Model.selectedTextId = 0;
                loadDisplayedTitle();
                removeOldNodes();
                loadTextNodes();
            });
        };
        this.attachAllRingTitleButtonListeners = function (loadDisplayedTitle, removeOldNodes, loadTextNodes) {
            let ringListButtonGroup = document.querySelectorAll(".ringtitlebuttongroup");
            ringListButtonGroup.forEach((group) => {
                this.attachRingTitleButtonListener(group.firstElementChild, parseInt(group.id.slice(7)), loadDisplayedTitle, removeOldNodes, loadTextNodes);
                this.attachDeleteListener(group.lastElementChild, Model.selectedId, loadDisplayedTitle);
            });
        };
        this.attachDeleteListener = (btn, loadDisplayedTitle, removeOldNodes, loadTextNodes) => {
            btn.addEventListener('click', (e) => {
                let id = parseInt(e.target.parentNode.id.slice(7));
                console.log('delete listener clumped');
                View.RingTitleButtons.clearButton(e.target.parentNode);
                if (Model.selectedId === id) {
                    Model.selectedId = 1;
                    View.InnerRings.clearInnerRings();
                    Model.viewCommands.loadAllSelectedInnerRingsToDOM(Model.ringList, Model.selectedId);
                    loadDisplayedTitle();
                }
                let filteredList = Model.ringList.filter((ring) => ring.id !== id);
                let filteredTextList = Model.textList.filter(({ ringId }) => ringId !== id);
                Model.ringList = filteredList;
                Model.textList = filteredTextList;
                console.log(Model.ringList, filteredList);
                Model.storage.saveAllStorage(Model.ringList, Model.selectedId, View.color);
                removeOldNodes();
                loadTextNodes();
            });
        };
        this.attachAllDeleteListeners = (loadDisplayedTitle, removeOldNodes, loadTextNodes) => {
            let delbtns = document.querySelectorAll('.ringlistdelete');
            delbtns.forEach((btn) => {
                this.attachDeleteListener(btn, loadDisplayedTitle, removeOldNodes, loadTextNodes);
            });
        };
        this.loadRingListButtonTitles = () => {
            let ringListButtons = document.querySelectorAll("#ringlistbutton");
            ringListButtons.forEach((button) => {
                let selectedTitle = Model.ringList.filter((ring) => ring.id === parseInt(button.parentNode.id.slice(7)))[0].title;
                button.innerText = selectedTitle;
            });
        };
        this.clearSelectedRingListButton = function () {
            let ringListButtons = document.querySelectorAll('#ringlistbutton');
            ringListButtons.forEach((button) => {
                if (parseInt(button.parentNode.id.slice(7)) !== Model.selectedId) {
                    button.classList.remove(`bg-${View.color}-100`);
                    button.classList.add(`bg-transparent`);
                }
            });
        };
        this.styleSelectedRingListButton = function () {
            if (Model.selectedId !== 1) {
                let ringListButtons = document.querySelectorAll('#ringlistbutton');
                ringListButtons.forEach((button) => {
                    if (parseInt(button.parentNode.id.slice(7)) === Model.selectedId) {
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
        this.findNewRingTitleButton = (id) => document.getElementById(`ringid_${id}`);
    }
}
//# sourceMappingURL=Controller_RingListButtons.js.map