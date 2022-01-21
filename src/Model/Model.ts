import Model_Storage, {Model_StorageType} from './Model_Storage.js';
import Model_ViewCommands from './Model_ViewCommands.js'

import { ring } from '../Types/Types'
import { ViewType } from '../View/View.js'


export interface ModelType {
  selectedId: number;
  selectedTitle: string;
  ringList:ring[];
  storage: Model_StorageType;
  viewCommands: any;
  addNewInnerRingToRingList: () => void;
  addNewRingToRingListFromSelectedId: (val: number) => void;
  resetModelToDefault: () => void;
}

export default class Model implements ModelType {
  selectedId: number;
  selectedTitle: string;
  ringList:ring[];
  storage: Model_StorageType;
  viewCommands: any;
  addNewInnerRingToRingList: () => void;
  addNewRingToRingListFromSelectedId: (val: number) => void;
  resetModelToDefault: () => void;

  constructor(View:ViewType) {
    this.viewCommands = new Model_ViewCommands(View);
    this.selectedId = 1;
    this.selectedTitle = "Ring Title";
    this.ringList = [
      { id: 1, title: "Ring Title", innerRings: [] },
    ];
    this.storage = new Model_Storage();

    this.addNewInnerRingToRingList = (val:number ) => {
      this.ringList.forEach(({ id, innerRings }) => {
        if (id == this.selectedId) {
          innerRings.push(val)
        }
      })
    }
  
    this.addNewRingToRingListFromSelectedId = (id:number, ) => {
      this.ringList.push({
        id: id,
        title: "placeholder title",
        innerRings: [],
      });
    }
  
    this.resetModelToDefault = () => {
      this.selectedId = 1;
      this.selectedTitle = "Ring Title";
      this.ringList = [
        { id: 1, title: "Ring Title", innerRings: [] },
      ];
    }
  }
}



