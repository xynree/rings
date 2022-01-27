export default class Controller_RingListButtons {
    constructor(Model, View) {
        this.HIGHLIGHT = "white";
        this.attachRingTitleButtonListener = (id, e, loadDisplayedTitle) => {
            e.preventDefault();
            Model.selectedId = id;
            View.innerRings.clearInnerRings();
            Model.viewCommands.loadAllSelectedInnerRingsToDOM(Model.ringList, Model.selectedId);
            this.clearSelectedRingListButton();
            this.styleSelectedRingListButton();
            Model.storage.saveAllStorage(Model.ringList, Model.selectedId, View.color);
            this.loadRingListButtonTitles();
            loadDisplayedTitle();
        };
        this.attachAllRingTitleButtonListeners = function (loadDisplayedTitle) {
            let ringListButtons = document.querySelectorAll(".ringlistbutton");
            ringListButtons.forEach((button) => {
                button.addEventListener("click", (e) => {
                    this.attachRingTitleButtonListener(parseInt(button.id.slice(7)), e, loadDisplayedTitle);
                });
            });
        };
        this.attachDeleteListener = (btn, loadDisplayedTitle) => {
            btn.addEventListener('click', (e) => {
                let id;
                if (e.target.parentNode.id === 'ringlistdelete' || e.target.parentNode.id === 'ringlistdeletespan') {
                    id = e.target.parentNode.parentNode.id.slice(7);
                    View.ringTitleButtons.clearButton(e.target.parentNode.parentNode);
                }
                else {
                    id = parseInt(e.target.parentNode.id.slice(7));
                    View.ringTitleButtons.clearButton(e.target.parentNode);
                }
                if (Model.selectedId === id) {
                    Model.selectedId = 1;
                    View.innerRings.clearInnerRings();
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
            let ringListButtons = document.querySelectorAll(".ringlistbutton");
            ringListButtons.forEach((button) => {
                let selectedTitle = Model.ringList.filter((ring) => ring.id === parseInt(button.id.slice(7)))[0].title;
                button.firstElementChild.innerText = selectedTitle;
            });
        };
        this.clearSelectedRingListButton = function () {
            let ringListButtons = document.querySelectorAll('.ringlistbutton');
            ringListButtons.forEach((button) => {
                if (parseInt(button.id.slice(7)) !== Model.selectedId) {
                    button.classList.remove(`bg-${View.color}-100`);
                    button.classList.add(`bg-transparent`);
                }
            });
        };
        this.styleSelectedRingListButton = function () {
            if (Model.selectedId !== 1) {
                let ringListButtons = document.querySelectorAll('.ringlistbutton');
                ringListButtons.forEach((button) => {
                    if (parseInt(button.id.slice(7)) == Model.selectedId) {
                        button.classList.remove(`bg-transparent`);
                        button.classList.add(`bg-${View.color}-100`);
                    }
                });
            }
            else {
                let ringListButton = document.querySelector('.ringlistbutton');
                if (parseInt(ringListButton.id.slice(7)) == Model.selectedId) {
                    ringListButton.classList.remove(`bg-transparent`);
                    ringListButton.classList.add(`bg-${View.color}-100`);
                }
            }
        };
        this.findNewRingTitleButton = (id) => document.getElementById(`ringid_${id}`);
    }
}
//# sourceMappingURL=Controller_RingListButtons.js.map