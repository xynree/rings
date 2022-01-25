export default class Controller_RingListButtons {
    constructor(Model, View) {
        this.HIGHLIGHT = "white";
        this.attachRingTitleButtonListener = (id, e, loadDisplayedTitle) => {
            e.preventDefault();
            Model.selectedId = id;
            Model.storage.saveAllStorage(Model.ringList, Model.selectedId);
            View.innerRings.clearInnerRings();
            Model.viewCommands.loadAllSelectedInnerRingsToDOM(Model.ringList, Model.selectedId);
            this.clearSelectedRingButton(id);
            this.styleSelectedRingListButton(id);
            this.loadRingListButtonTitles();
            loadDisplayedTitle();
        };
        this.attachAllRingTitleButtonListeners = function (loadDisplayedTitle) {
            let ringListButtons = document.querySelectorAll(".ringlistbutton");
            ringListButtons.forEach((button) => {
                button.addEventListener("click", (e) => {
                    this.attachRingTitleButtonListener(button.id.slice(7), e, loadDisplayedTitle);
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
        this.clearSelectedRingButton = function (selectedId) {
            let ringListButtons = document.querySelectorAll('.ringlistbutton');
            ringListButtons.forEach((button) => {
                if (parseInt(button.id.slice(7)) !== selectedId) {
                    View.styleBackground(button, "transparent");
                }
            });
        };
        this.styleSelectedRingListButton = function (id) {
            if (id !== 1) {
                let ringListButtons = document.querySelectorAll('.ringlistbutton');
                ringListButtons.forEach((button) => {
                    if (parseInt(button.id.slice(7)) === id) {
                        console.log('i am the selected one:', button.id);
                        View.styleBackground(button, this.HIGHLIGHT);
                    }
                });
            }
            else {
                let ringListButton = document.querySelector('.ringlistbutton');
                if (parseInt(ringListButton.id.slice(7)) === id) {
                    View.styleBackground(ringListButton, this.HIGHLIGHT);
                }
            }
        };
        this.findNewRingTitleButton = (id) => document.getElementById(`ringid_${id}`);
        // for initial loaded ring
    }
}
//# sourceMappingURL=Controller_RingListButtons.js.map