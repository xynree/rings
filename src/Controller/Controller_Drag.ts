import {ModelType} from '../Model/Model.js'
import { ViewType } from '../View/View.js'

export interface Controller_DragType {

  attachDragListener_Styles:()=> void;
  attachDragListener_NewInnerRing: () => void;
  findDiam: (posX:number, posY:number) => number;

}

export default class Controller_Drag implements Controller_DragType {

  attachDragListener_Styles:()=> void;
  attachDragListener_NewInnerRing: () => void;
  findDiam: (posX:number, posY:number) => number;



  constructor(Model:ModelType, View:ViewType){

    this.attachDragListener_Styles = function () {
      document.addEventListener(
        "dragenter",
        function (event:any) {
          if (event.target.classList.contains("dragzone")) {
            event.target.classList.add("bg-stone-200");
          }
        },
        false
      );

      document.addEventListener(
        "dragleave",
        function (event:any) {
          if (event.target.classList.contains("dragzone")) {
            event.target.classList.remove("bg-stone-200");
          }
        },
        false
      );

      document.addEventListener(
        "dragend",
        function (event:any) {
          if (event.target.classList.contains("dragzone")) {
            event.target.classList.remove("bg-stone-200");
          }
        },
        false
      );
    };

    this.attachDragListener_NewInnerRing = function () {
      let dragStartX;
      let dragEndX;
      let dragStartY;
      let dragEndY;
      let innerRing = document.querySelector("#iring");


      innerRing.addEventListener("mouseenter", (event:any) => {
        event.target.classList.add("bg-stone-300/50");
      });

      innerRing.addEventListener("mouseout", (event:any) => {
        event.target.classList.remove("bg-stone-300/50");
      });

      innerRing.addEventListener("dragstart", (event:any) => {
        dragStartX = event.screenX;
        dragStartY = event.screenY;
        View.innerRings.removeInnerRingDragPreview(event);
      });

      innerRing.addEventListener("dragend", (event:any) => {

        console.log('drag end run')
        event.preventDefault();
        dragEndX = event.screenX;
        dragEndY = event.screenY;

        event.target.classList.remove("bg-stone-300/50");

        let posX = Math.abs(dragEndX - dragStartX);
        let posY = Math.abs(dragEndY - dragStartY);

        let diam = Math.round(this.findDiam(posX, posY));

        if (diam < 970) {
          View.innerRings.addInnerRing(diam);
          Model.addNewInnerRingToRingList(diam)
          Model.storage.saveAllStorage(Model.ringList, Model.selectedId)
        }
      });
    };

    this.findDiam = (posX, posY) => Math.sqrt(posX ** 2 + posY ** 2) * 2;




  }
}