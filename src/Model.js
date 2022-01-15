import Storage from './Storage.js';

export default class Model {
  constructor(View) {
    this.selectedId = 1;
    this.selectedTitle = "Ring Title";
    this.ringList = [
      { id: 1, title: "Ring Title", innerRings: [] },
    ];
    this.storage = new Storage();

    this.setup = function () {
      if (this.storage.hasStoredRings()) {
        // load model data
        this.setSelectedIdFromStorage();
        this.setRingListFromStorage();

        // update view with storage data
        this.loadAllSelectedInnerRingsToDOM();
        View.clearRingTitleButtons();

      } else {
        this.storage.saveAllStorage(this.ringList, this.selectedId);
      }
    }
 
    // Storage

    this.setSelectedIdFromStorage = () => {
      this.selectedId = this.storage.loadSelectedIdFromStorage();
    }

    this.setRingListFromStorage = () => {
      this.ringList = this.storage.loadRingListFromStorage();
    }

    this.saveStorage = () => this.storage.saveAllStorage(this.ringList, this.selectedId);
    this.clearStorage = () => this.storage.clearStorage();

    this.resetModelToDefault = () => {
      this.selectedId = 1;
      this.selectedTitle = "Ring Title";
      this.ringList = [
        { id: 1, title: "Ring Title", innerRings: [] },
      ];
    }

    // commands for View

    this.loadAllSelectedInnerRingsToDOM = function (ringList=this.ringList) {
      ringList.forEach(({ title, id, innerRings }) => {
        if (id == this.selectedId) {
            innerRings.forEach((value) => {
              View.addInnerRing(value);
            });
        }
      })
    };

    this.loadRingTitleButtonsToDOM = function (ringList=this.ringList) {
      ringList.forEach(({ id, title, innerRings }) => {
        if (id !== 1) {
            View.addRingTitleButton(id);
        }
      });
    };

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
