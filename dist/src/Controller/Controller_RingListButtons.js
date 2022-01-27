export default class Controller_RingListButtons {
    constructor(Model, View) {
        this.HIGHLIGHT = "white";
        this.attachRingTitleButtonListener = (elem, id, loadDisplayedTitle) => {
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
                loadDisplayedTitle();
            });
        };
        this.attachAllRingTitleButtonListeners = function (loadDisplayedTitle) {
            let ringListButtonGroup = document.querySelectorAll(".ringtitlebuttongroup");
            ringListButtonGroup.forEach((group) => {
                this.attachRingTitleButtonListener(group.firstElementChild, parseInt(group.id.slice(7)), loadDisplayedTitle);
                this.attachDeleteListener(group.lastElementChild, Model.selectedId, loadDisplayedTitle);
            });
        };
        this.attachDeleteListener = (btn, loadDisplayedTitle) => {
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
                Model.ringList = filteredList;
                console.log(Model.ringList, filteredList);
                Model.storage.saveAllStorage(Model.ringList, Model.selectedId, View.color);
            });
        };
        this.attachAllDeleteListeners = (loadDisplayedTitle) => {
            let delbtns = document.querySelectorAll('.ringlistdelete');
            delbtns.forEach((btn) => {
                this.attachDeleteListener(btn, loadDisplayedTitle);
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