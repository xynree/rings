import Model_Storage from './Model_Storage.js';
import Model_ViewCommands from './Model_ViewCommands.js'
import { ring, textNode, ModelType, Model_ViewCommandsType, ViewType, Model_StorageType} from '../Types/Types'


export default class Model implements ModelType {

  Storage: Model_StorageType;
  ViewCommands: Model_ViewCommandsType;

  textList: textNode[];
  ringList: ring[];
  selectedId: number;
  selectedTextId: number;

  addNewInnerRingToRingList: (val: number) => void;
  addNewRingToRingListFromSelectedId: (val: number) => void;
  resetModelToDefault: () => void;

  constructor(View:ViewType) {

    this.ViewCommands = new Model_ViewCommands(View);
    this.Storage = new Model_Storage();

    this.textList = [];
    this.ringList = [ { id: 1, title: "Ring Title", innerRings: [] } ];

    this.selectedId = 1;
    this.selectedTextId = this.textList.length > 0 ? this.textList[this.textList.length-1].textId : 1;

    this.addNewInnerRingToRingList = (val:number ) => {
      this.ringList.forEach(({ id, innerRings }) => {
        id === this.selectedId ? innerRings.push(val) : ''
      })
    }
  
    this.addNewRingToRingListFromSelectedId = (id:number) => {
      this.ringList.push({
        id,
        title: "New Ring",
        innerRings: [],
      });
    }
  
    this.resetModelToDefault = () => {
      this.selectedId = 1;
      this.ringList = [
        { id: 1, title: "Ring Title", innerRings: [] },
      ];
    }
  }



}



