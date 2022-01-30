import { ModelType, ViewType, Controller_DragType } from "../Types/Types";

export default class Controller_Drag implements Controller_DragType {

  attachDocumentDragListeners:()=> void;
  attachDragListener_NewInnerRing: () => void;
  _findDiam: (posX:number, posY:number) => number;

  constructor(Model:ModelType, View:ViewType) {

    this.attachDocumentDragListeners = function () {

      document.addEventListener('dragover', (e:any) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move"
      })

    };

    this.attachDragListener_NewInnerRing = function () {
      let innerRing = document.querySelector("#center_ring");
      innerRing.addEventListener("mouseenter", (event:any) => {
        event.target.classList.add(`bg-${View.color}-50/50`);
      });

      innerRing.addEventListener("mouseout", (event:any) => {
        event.target.classList.remove(`bg-${View.color}-50/50`);
      });

      innerRing.addEventListener("dragstart", (event:any) => {
        View.InnerRings.removeInnerRingDragPreview(event);
      });

      innerRing.addEventListener("dragend", (e:any) => {
        e.preventDefault();

        innerRing.classList.remove(`bg-${View.color}-50/50`)

        e.target.classList.remove(`bg-${View.color}-50/50`);

        let posX = Math.abs(e.offsetX);
        let posY = Math.abs(e.offsetY);

        let diam = Math.round(this._findDiam(posX, posY));

        if (diam < 970) {
          View.InnerRings.addInnerRing(diam);
          Model.addNewInnerRingToRingList(diam)
          Model.Storage.saveAllStorage(Model.ringList, Model.selectedId, View.color)
        }
      });
    };

    this._findDiam = (posX, posY) => Math.sqrt(posX ** 2 + posY ** 2) * 2;

  }

}