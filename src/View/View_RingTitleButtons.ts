import { View_RingTitleButtonsType } from "../Types/Types.js";

export default class View_RingTitleButtons implements View_RingTitleButtonsType {
  
  addRingTitleButton: (id:number) => void;
  clearRingTitleButtons: () => void;
  clearButton: (elem:HTMLElement) => void;

  constructor(){
    this.addRingTitleButton = (id) => {
      let newRingGroup = document.getElementById("newRingGroup");
      let newRingButtonGroup = document.getElementById('ringid_1').cloneNode(true);
      (<Element>newRingButtonGroup).classList.add('ringtitlebuttongroup');
      (<Element>newRingButtonGroup).lastElementChild.classList.remove('invisible');

      (<Element>newRingButtonGroup).id = `ringid_${id}`;
      newRingGroup.appendChild(newRingButtonGroup);
    }
  
    this.clearRingTitleButtons = function() {
      let newRingGroup = document.getElementById("newRingGroup");
      while (newRingGroup.children.length > 1) {
        newRingGroup.removeChild(newRingGroup.lastChild);
      }
  }

  this.clearButton = (elem) => {
    elem.innerHTML='';
    elem.remove();
  }

  }
}