import  { ring } from '../Types/Types'

export interface Model_ViewCommandsType {
  loadAllSelectedInnerRingsToDOM: (ringList:ring[], selectedId:number) => void;
  loadRingTitleButtonsToDOM: (ringList:ring[]) => void;
}

export default class Model_ViewCommands {
  constructor(View){

    this.loadAllSelectedInnerRingsToDOM = function (ringList, selectedId) {

      console.log('selectedId:', selectedId)
      ringList.forEach(({ id, innerRings }) => {
        if (id === selectedId) {
            innerRings.forEach((value) => {
              View.InnerRings.addInnerRing(value);
            });
        }
      })
    };
  
    this.loadRingTitleButtonsToDOM = function (ringList) {
      ringList.forEach(({ id }) => {
        if (id !== 1) {
            View.RingTitleButtons.addRingTitleButton(id);
        }
      });
    };
  }
  loadAllSelectedInnerRingsToDOM: (ringList:ring[], selectedId:number) => void;
  loadRingTitleButtonsToDOM: (ringList:ring[]) => void;
}