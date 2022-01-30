import { ring, Model_StorageType } from '../Types/Types'

export default class Model_Storage implements Model_StorageType {
  hasStoredRings: () => boolean;
  hasColor: () => boolean;
  loadSelectedIdFromStorage: () => number;
  loadRingListFromStorage: () => ring[];
  saveAllStorage: (ringList: ring[], selectedId: number, color: string) => void;
  clearStorage: () => void;
  loadColorFromStorage: () => string;
  saveColor: (color:string) => void;
  saveText: (textNodeList:any[]) => void;
  loadText:() => any[];


  constructor() {

    this.hasStoredRings = () => window.localStorage.length !== 0 ? true : false;

    this.hasColor = () => window.localStorage.getItem('color') ? true: false;

    this.loadSelectedIdFromStorage = () => JSON.parse(window.localStorage.getItem("selectedId"));
 
    this.loadColorFromStorage = () => window.localStorage.getItem('color');
  
    this.loadRingListFromStorage = () => JSON.parse(window.localStorage.getItem("ringList"));
    this.loadText = () => JSON.parse(window.localStorage.getItem('textList'));
    this.saveText = (textNodeList) => window.localStorage.setItem('textList', JSON.stringify(textNodeList));

    this.saveAllStorage = (ringList, selectedId,color) => {
      window.localStorage.setItem("ringList", JSON.stringify(ringList));
      window.localStorage.setItem("selectedId",JSON.stringify(selectedId));
      window.localStorage.setItem('color',color);
      // console.log('Storage Saved!', localStorage)
    }

    this.saveColor = (color) => window.localStorage.setItem('color', color);


    this.clearStorage = () => { 
      localStorage.clear();
      window.location.reload();
    }
  }


}

