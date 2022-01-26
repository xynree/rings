export default class Controller {
    constructor(Model, View) {
        this.setup = function () {
            View.default.loadDefaultView();
            this.attachAddNewRingListener();
            this.attachDragListener_Styles();
            this.attachDragListener_NewInnerRing();
            this.attachClickListener_ClearStorage();
            if (Model.storage.hasStoredRings()) {
                Model.selectedId = Model.storage.loadSelectedIdFromStorage();
                Model.ringList = Model.storage.loadRingListFromStorage();
                View.ringTitleButtons.clearRingTitleButtons();
                Model.viewCommands.loadRingTitleButtonsToDOM(Model.ringList);
                Model.viewCommands.loadAllSelectedInnerRingsToDOM(Model.ringList, Model.selectedId);
                this.attachAllRingTitleButtonListeners();
                this.clearSelectedRingButton(Model.selectedId);
                this.styleSelectedRingListButton();
            }
            else {
                this.styleDefaultRingButton();
                this.loadDefaultRingTitleButtonListener();
                Model.storage.saveAllStorage(Model.ringList, Model.selectedId);
            }
            this.loadDisplayedTitle();
            this.attachDisplayedTitleListener();
            this.loadRingListButtonTitles();
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
                this.clearSelectedRingButton();
                this.styleSelectedRingListButton();
                Model.storage.saveAllStorage(Model.ringList, Model.selectedId);
                this.loadRingListButtonTitles();
                // event listener for new ring title button
                let newRingTitleButton = this.findNewRingTitleButton(Model.selectedId);
                newRingTitleButton.addEventListener('click', (e) => {
                    console.log(e.target.parentNode, e.target.parentNode.id);
                    this.attachRingTitleButtonListener(parseInt(e.target.parentNode.id.slice(7)), e);
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
        this.loadDefaultRingTitleButtonListener = () => {
            let ringListButton = document.querySelector('.ringlistbutton');
            ringListButton.addEventListener('click', (e) => {
                this.attachRingTitleButtonListener(parseInt(ringListButton.id.slice(7)), e);
            });
        };
        this.styleDefaultRingButton = () => {
            let ringListButton = document.querySelector('.ringlistbutton');
            View.styleBackground(ringListButton, "white");
        };
        this.HIGHLIGHT = "white";
        this.attachRingTitleButtonListener = (id, e) => {
            e.preventDefault();
            Model.selectedId = id;
            View.innerRings.clearInnerRings();
            Model.viewCommands.loadAllSelectedInnerRingsToDOM(Model.ringList, Model.selectedId);
            this.clearSelectedRingButton();
            this.styleSelectedRingListButton();
            Model.storage.saveAllStorage(Model.ringList, Model.selectedId);
            this.loadRingListButtonTitles();
            this.loadDisplayedTitle();
        };
        this.attachAllRingTitleButtonListeners = function () {
            let ringListButtons = document.querySelectorAll(".ringlistbutton");
            ringListButtons.forEach((button) => {
                button.addEventListener("click", (e) => {
                    this.attachRingTitleButtonListener(parseInt(button.id.slice(7)), e);
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
        this.clearSelectedRingButton = function () {
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
        // for initial loaded ring
        this.findDiam = (posX, posY) => Math.sqrt(Math.pow(posX, 2) + Math.pow(posY, 2)) * 2;
        this.attachDragListener_Styles = function () {
            document.addEventListener("dragenter", function (event) {
                if (event.target.classList.contains("dragzone")) {
                    event.target.classList.add("bg-stone-100");
                }
            }, false);
            document.addEventListener("dragleave", function (event) {
                if (event.target.classList.contains("dragzone")) {
                    event.target.classList.remove("bg-stone-100");
                }
            }, false);
            document.addEventListener("dragend", function (event) {
                if (event.target.classList.contains("dragzone")) {
                    event.target.classList.remove("bg-stone-100");
                }
            }, false);
        };
        this.attachDragListener_NewInnerRing = function () {
            let dragStartX;
            let dragEndX;
            let dragStartY;
            let dragEndY;
            let innerRing = document.querySelector("#iring");
            innerRing.addEventListener("mouseenter", (event) => {
                event.target.classList.add("bg-stone-300");
            });
            innerRing.addEventListener("mouseout", (event) => {
                event.target.classList.remove("bg-stone-300");
            });
            innerRing.addEventListener("dragstart", (event) => {
                dragStartX = event.screenX;
                dragStartY = event.screenY;
                View.innerRings.removeInnerRingDragPreview(event);
            });
            innerRing.addEventListener("dragend", (event) => {
                event.preventDefault();
                dragEndX = event.screenX;
                dragEndY = event.screenY;
                event.target.classList.remove("bg-stone-300");
                let posX = Math.abs(dragEndX - dragStartX);
                let posY = Math.abs(dragEndY - dragStartY);
                let diam = Math.round(this.findDiam(posX, posY));
                if (diam < 970) {
                    View.innerRings.addInnerRing(diam);
                    Model.addNewInnerRingToRingList(diam);
                    Model.storage.saveAllStorage(Model.ringList, Model.selectedId);
                }
            });
        };
        this.attachDisplayedTitleListener = () => {
            let node = document.getElementById('textdisplaytitle');
            node.addEventListener("keydown", (e) => {
                if (e.code === "Enter") {
                    console.log('you pressd enter', e.target.value);
                    Model.ringList.forEach((ring) => {
                        if (ring.id === Model.selectedId) {
                            console.log(e.target.value);
                            ring.title = e.target.value;
                            Model.storage.saveAllStorage(Model.ringList, Model.selectedId);
                        }
                    });
                    node.blur();
                    this.loadRingListButtonTitles();
                }
            });
        };
        this.loadDisplayedTitle = () => {
            document.getElementById('textdisplaytitle').value = Model.ringList.filter((ringList) => ringList.id == Model.selectedId)[0].title;
        };
    }
}
//# sourceMappingURL=Controller.js.map