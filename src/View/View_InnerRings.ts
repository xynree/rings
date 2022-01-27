
export interface View_InnerRingsType {
  addInnerRing: (value:number) => void;
  clearInnerRings: () => void;
  removeInnerRingDragPreview: (e:any) => void;
}


export default class View_InnerRings implements View_InnerRingsType {

  addInnerRing: (value:number) => void;
  clearInnerRings: () => void;
  removeInnerRingDragPreview: (e:any) => void;
  
  constructor(){
    this.addInnerRing = function (value) {
      let outerRing = document.querySelector("#oring");
      let newRing = document.createElement("div");
      newRing.innerText = "";
      newRing.classList.add(
        "absolute",
        "rounded-full",
        "border",
        "border-stone-700",
        "bg-transparent",
        "m-12",
        "flex",
        "justify-center",
        "items-center"
      );
      newRing.id='innerring';
      newRing.style.width = `${value}px`;
      newRing.style.height = `${value}px`;
      outerRing.appendChild(newRing);
    };
  
    this.clearInnerRings = function () {
      let outerRing = document.querySelector("#oring");
      while (outerRing.lastElementChild && outerRing.lastElementChild.id !== "iring") {
        outerRing.removeChild(outerRing.lastElementChild);
      }
    };
  
    this.removeInnerRingDragPreview = (e) => {
      let dragShadow = e.target.cloneNode(true);
      dragShadow.style.display = "none";
      document.body.appendChild(dragShadow);
      e.dataTransfer.setDragImage(dragShadow, 0, 0);
      e.target.classList.add("bg-stone-200");
    }

  }



}