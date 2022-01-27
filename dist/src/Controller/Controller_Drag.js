export default class Controller_Drag {
    constructor(Model, View) {
        this.attachDragListener_Styles = function () {
            document.addEventListener("dragenter", function (event) {
                if (event.target.classList.contains("dragzone")) {
                    event.target.classList.add("bg-stone-200");
                }
            }, false);
            document.addEventListener("dragleave", function (event) {
                if (event.target.classList.contains("dragzone")) {
                    event.target.classList.remove("bg-stone-200");
                }
            }, false);
            document.addEventListener("dragend", function (event) {
                if (event.target.classList.contains("dragzone")) {
                    event.target.classList.remove("bg-stone-200");
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
                event.target.classList.add("bg-stone-300/50");
            });
            innerRing.addEventListener("mouseout", (event) => {
                event.target.classList.remove("bg-stone-300/50");
            });
            innerRing.addEventListener("dragstart", (event) => {
                dragStartX = event.screenX;
                dragStartY = event.screenY;
                View.innerRings.removeInnerRingDragPreview(event);
            });
            innerRing.addEventListener("dragend", (event) => {
                console.log('drag end run');
                event.preventDefault();
                dragEndX = event.screenX;
                dragEndY = event.screenY;
                event.target.classList.remove("bg-stone-300/50");
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
        this.findDiam = (posX, posY) => Math.sqrt(Math.pow(posX, 2) + Math.pow(posY, 2)) * 2;
    }
}
//# sourceMappingURL=Controller_Drag.js.map