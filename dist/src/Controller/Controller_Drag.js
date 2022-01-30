export default class Controller_Drag {
    constructor(Model, View) {
        this.attachDocumentDragListeners = function () {
            document.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
            });
        };
        this.attachDragListener_NewInnerRing = function () {
            let innerRing = document.querySelector("#center_ring");
            innerRing.addEventListener("mouseenter", (event) => {
                event.target.classList.add(`bg-${View.color}-50/50`);
            });
            innerRing.addEventListener("mouseout", (event) => {
                event.target.classList.remove(`bg-${View.color}-50/50`);
            });
            innerRing.addEventListener("dragstart", (event) => {
                View.InnerRings.removeInnerRingDragPreview(event);
            });
            innerRing.addEventListener("dragend", (e) => {
                e.preventDefault();
                innerRing.classList.remove(`bg-${View.color}-50/50`);
                e.target.classList.remove(`bg-${View.color}-50/50`);
                let posX = Math.abs(e.offsetX);
                let posY = Math.abs(e.offsetY);
                let diam = Math.round(this._findDiam(posX, posY));
                if (diam < 970) {
                    View.InnerRings.addInnerRing(diam);
                    Model.addNewInnerRingToRingList(diam);
                    Model.Storage.saveAllStorage(Model.ringList, Model.selectedId, View.color);
                }
            });
        };
        this._findDiam = (posX, posY) => Math.sqrt(Math.pow(posX, 2) + Math.pow(posY, 2)) * 2;
    }
}
//# sourceMappingURL=Controller_Drag.js.map