import Storage from './Storage.js';

export default class Model {
  constructor(View) {
    this.selectedId = 1;
    this.selectedTitle = "Ring Title";
    this.ringList = [
      { id: 1, title: "Ring Title", innerRings: [] },
    ];
    this.storage = new Storage();

    // reset

    this.resetModelToDefault = () => {
      this.selectedId = 1;
      this.selectedTitle = "Ring Title";
      this.ringList = [
        { id: 1, title: "Ring Title", innerRings: [] },
      ];
    }

    // commands for View

    this.loadAllSelectedInnerRingsToDOM = function (ringList = this.ringList) {
      ringList.forEach(({ title, id, innerRings }) => {
        if (id == this.selectedId) {
            innerRings.forEach((value) => {
              View.addInnerRing(value);
            });
        }
      })
    };

    this.loadRingTitleButtonsToDOM = function (ringList = this.ringList) {
      ringList.forEach(({ id}) => {
        if (id !== 1) {
            View.addRingTitleButton(id);
        }
      });
    };

    //

    // update Model

    this.addNewInnerRingToRingList = (val) => {
    this.ringList.forEach(({id, innerRings}) => {
      if(id == this.selectedId){
        innerRings.push(val)
      }
      })
    }

    this.incrementSelectedId = () => this.selectedId++;

    this.addNewRingToRingListFromSelectedId = (id = this.selectedId) => {
      this.ringList.push({
        id: id,
        title: "placeholder title",
        innerRings: [],
      });
    }


  }
}
