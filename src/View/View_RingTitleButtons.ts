export interface View_RingTitleButtonsType {
  addRingTitleButton: (id:number) => void;
  clearRingTitleButtons: () => void;
}

export default class View_RingTitleButtons implements View_RingTitleButtonsType {
  addRingTitleButton: (id:number) => void;
  clearRingTitleButtons: () => void;
  constructor(){
    this.addRingTitleButton = (id) => {
      let newRingGroup = document.getElementById("newRingGroup");
      let ringButton1 = document.getElementById('ringid_1')
      let newButton = ringButton1.cloneNode(true);
      (<Element>newButton).classList.add('ringlistbutton');
      (<Element>newButton).id = `ringid_${id}`;
      newRingGroup.appendChild(newButton);
    }
  
    this.clearRingTitleButtons = function() {
      let newRingGroup = document.getElementById("newRingGroup");
      while (newRingGroup.children.length > 1) {
        newRingGroup.removeChild(newRingGroup.lastChild);
      }
  }


  }
}