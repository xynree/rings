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
            Model.storage.saveAllStorage(Model.ringList, Model.selectedId);
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
                    View.styleBackground(button, "transparent");
                }
            });
        };
        this.styleSelectedRingListButton = function () {
            if (Model.selectedId !== 1) {
                let ringListButtons = document.querySelectorAll('.ringlistbutton');
                ringListButtons.forEach((button) => {
                    if (parseInt(button.id.slice(7)) == Model.selectedId) {
                        View.styleBackground(button, this.HIGHLIGHT);
                    }
                });
            }
            else {
                let ringListButton = document.querySelector('.ringlistbutton');
                if (parseInt(ringListButton.id.slice(7)) == Model.selectedId) {
                    View.styleBackground(ringListButton, this.HIGHLIGHT);
                }
            }
        };
        this.findNewRingTitleButton = (id) => document.getElementById(`ringid_${id}`);
    }
}
//# sourceMappingURL=Controller_RingListButtons.js.map