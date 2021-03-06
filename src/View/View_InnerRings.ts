import { View_InnerRingsType } from '../Types/Types.js'

export default class View_InnerRings implements View_InnerRingsType {

  addInnerRing: (value:number) => void;
  clearInnerRings: () => void;
  removeInnerRingDragPreview: (e:any) => void;
  
  constructor(color:string){
    this.addInnerRing = function (value) {
      let outerRing = document.querySelector("#oring");
      let newRing = document.createElement("div");
      newRing.innerText = "";
      newRing.classList.add(
        "absolute",
        "rounded-full",
        "border",
        `border-${color}-700`,
        "bg-transparent",
        "m-12",
        "flex",
        "justify-center",
        "items-center",
      );
      newRing.id='innerring';
      newRing.style.width = `${value}px`;
      newRing.style.height = `${value}px`;
      outerRing.appendChild(newRing);
    };
  
    this.clearInnerRings = function () {
      let outerRing = document.querySelector("#oring");
      while (outerRing.lastElementChild && outerRing.lastElementChild.id !=="center_ring") {
        outerRing.removeChild(outerRing.lastElementChild);
      }
    };
  
    this.removeInnerRingDragPreview = (e) => {
      // let dragShadow = e.target.cloneNode(true);
      // dragShadow.style.visibility = "hidden";
      // document.body.appendChild(dragShadow);
      // e.dataTransfer.setDragImage(dragShadow, 0, 0);
      // e.target.classList.add(`bg-${color}-200`);
    }

  }



}