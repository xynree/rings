import { ring } from '../Types/Types'

export interface Model_StorageType {
  hasStoredRings: () => boolean;
  loadSelectedIdFromStorage: () => number;
  loadRingListFromStorage: () => ring[];
  saveAllStorage: (ringList: ring[], selectedId: number) => void;
  clearStorage: () => void;
}

export default class Model_Storage implements Model_StorageType {
  hasStoredRings: () => boolean;
  loadSelectedIdFromStorage: () => number;
  loadRingListFromStorage: () => ring[];
  saveAllStorage: (ringList: ring[], selectedId: number) => void;
  clearStorage: () => void;

  constructor() {

    this.hasStoredRings = () => window.localStorage.length !== 0 ? true : false;

    this.loadSelectedIdFromStorage = () => {
      return JSON.parse(window.localStorage.getItem("selectedId"));
    }
  
    this.loadRingListFromStorage = () => {
      return JSON.parse(window.localStorage.getItem("ringList"));
    }
  
    this.saveAllStorage = (ringList, selectedId) => {
      window.localStorage.setItem("ringList", JSON.stringify(ringList));
      window.localStorage.setItem("selectedId",JSON.stringify(selectedId));
      console.log('Storage Saved!', localStorage)
    }
  
    this.clearStorage = () => { 
      localStorage.clear();
      window.location.reload();
    }
  }


}

