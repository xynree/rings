
import { ring, ModelType, ViewType, Controller_TitlesType } from '../Types/Types.js'

export default class Controller_Titles implements Controller_TitlesType {

  /** @returns index of selected id and title of selectedId as object */
  _findSelectedModelIndexAndTitle: () => {index:number, title:string};
  /** updates displayed title and storage after editing */
  _updateTitle: (e:any) => void;

  loadDisplayedTitle = () => {
    const {index, title} = this._findSelectedModelIndexAndTitle();
    ~index ? (<HTMLInputElement>document.getElementById('textdisplaytitle')).value = title : '';
  }

  attachDisplayedTitleListener = (loadRingListButtonTitles) => {
    document.getElementById('textdisplaytitle').addEventListener("keydown", (e:any) =>{
      if (e.code === "Enter") {  
        this._updateTitle(e)
        document.getElementById('textdisplaytitle').blur();
        loadRingListButtonTitles();
          }
        })
  }

  constructor(Model:ModelType, View:ViewType){
    this._updateTitle = (e) => {
      Model.ringList.forEach((ring:ring) => {
        if (ring.id === Model.selectedId){
          ring.title = e.target.value;
          Model.Storage.saveAllStorage(Model.ringList, Model.selectedId, View.color);
        }
        })
    }
    this._findSelectedModelIndexAndTitle = () => {
      let index = Model.ringList.findIndex((ring) => ring.id === Model.selectedId)
      return {index, title: Model.ringList[index].title}
    }
  }
}