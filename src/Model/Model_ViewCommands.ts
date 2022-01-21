import  { ring } from '../Types/Types'

export default class Model_ViewCommands {

  loadAllSelectedInnerRingsToDOM: (ringList:ring[], selectedId:number) => void;
  loadRingTitleButtonsToDOM: (ringList:ring[]) => void;

  constructor(View){

    this.loadAllSelectedInnerRingsToDOM = function (ringList, selectedId) {
      ringList.forEach(({ title, id, innerRings }) => {
        if (id === selectedId) {
            innerRings.forEach((value) => {
              View.innerRings.addInnerRing(value);
            });
        }
      })
    };
  
    this.loadRingTitleButtonsToDOM = function (ringList) {
      ringList.forEach(({ id }) => {
        if (id !== 1) {
            View.ringTitleButtons.addRingTitleButton(id);
        }
      });
    };
  }

}