import {ModelType} from '../Model/Model.js'
import { ViewType} from '../View/View.js'
import { ring } from '../Types/Types.js'

export interface Controller_TitlesType{
  attachDisplayedTitleListener:(loadRingListButtonTitles:Function) => void;
  loadDisplayedTitle:() => void;
}

export default class Controller_Titles implements Controller_TitlesType {

  attachDisplayedTitleListener:(loadRingListButtonTitles:Function) => void;
  loadDisplayedTitle:() => void;
  constructor(Model:ModelType, View:ViewType){

    this.attachDisplayedTitleListener = (loadRingListButtonTitles) => {
      let node = document.getElementById('textdisplaytitle')

      node.addEventListener("keydown", (e:any) =>{
        if (e.code === "Enter") {  
          console.log('you pressd enter', e.target.value)
          Model.ringList.forEach((ring:ring) => {
            if (ring.id === Model.selectedId){
              console.log(e.target.value)
              ring.title = e.target.value;
              Model.storage.saveAllStorage(Model.ringList, Model.selectedId);
            }
            })
            node.blur();
            loadRingListButtonTitles();
            }
          })
    }

    this.loadDisplayedTitle = () => {
      (<HTMLInputElement>document.getElementById('textdisplaytitle')).value = Model.ringList.filter((ringList:ring) => ringList.id == Model.selectedId)[0].title;
    }

  }
}