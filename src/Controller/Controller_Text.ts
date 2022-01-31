import { textNode, ModelType, ViewType, Controller_TextType } from '../Types/Types.js'


export default class Controller_Text implements Controller_TextType {

  refreshNodes = () => {
    this._removeOldNodes();
    this._loadTextNodes();
    console.log('text nodes refreshed')
  }

  refreshWrapper = (func) => {

    func.apply(this,arguments);
    
    this.refreshNodes();

    console.log('text nodes were refreshed')
    
  }

  attachDblClickListener = () => {
    document.addEventListener('dblclick', (e:any) => {
      if (e.target.id !== 'oring' && e.target.id !== 'innerring') return;
      this._removeOldNodes();
      let newTextNode = this._createNewNode(e.clientX, e.clientY);
      this._attachTextListener(newTextNode, e.clientX, e.clientY);
    })
  }

  attachDeleteListener = () =>{
    document.getElementById('deletetext').addEventListener('drop', (e)=> {
      e.preventDefault();
      let id = e.dataTransfer.getData('id');
      this._removeNode(Number(id.slice(0,1)), Number(id.slice(2)));
      this._removeFromDOM(id);
    })

    document.getElementById('deletetext').addEventListener('ondragover', (e) => {
      e.preventDefault();
    })
  }

  constructor(Model:ModelType, View:ViewType){

    this._updateTextNode = (text=null, ringId, textId, x=null, y=null) => {
      Model.textList.forEach((node) => {
        if(node.ringId === ringId && node.textId === textId){
          if (text) node.body = text;
          if (x) node.x = x;
          if (y) node.y = y;
        }});
    }



    this._removeNode = (ringId, textId) => {

      let foundIndex = Model.textList.findIndex((node) => node.ringId === ringId && node.textId === textId)
      if (~foundIndex) Model.textList.splice(foundIndex, 1);
    }

    this._removeFromDOM = (id) => {
      document.getElementById(id).remove();
    }

    this._addNewTextNodeToTextList= ({ringId, textId, body, x, y}) => {
      Model.textList.push({ ringId, textId, body, x, y })
      Model.Storage.saveText(Model.textList);
    }

    this._createNewNode = (x,y, innerText='') => {
      let newTextNode = document.createElement('span');
      newTextNode.classList.add('ringtext', 'p-2', 'absolute', 'min-w-4', 'h-8', 'focus:outline', `focus:outline-${View.color}-800`,`focus:bg-${View.color}-50`, 'bg-transparent','cursor-grab', 'z-50', 'focus:ring-stone-900', `${View.Default.styles.hover}`, `${View.Default.styles.text2}`);
      newTextNode.style.left=`${x}px`;
      newTextNode.style.fontSize = '12px'
      newTextNode.style.top=`${y}px`;
      newTextNode.setAttribute('draggable', 'true')
      newTextNode.setAttribute('contenteditable', '');
      newTextNode.classList.add('cursor-text');
      newTextNode.innerText = innerText;
      document.body.appendChild(newTextNode);
      newTextNode.focus();
      return newTextNode;
    }

    this._attachTextListener = (elem, x:null, y:null) => {
      elem.addEventListener('dblclick', (f:any) => {
        if(f.target.hasAttribute('id')){
          Model.selectedTextId = parseInt(f.target.id.slice(2))
        }
        f.target.setAttribute('contenteditable','');
        f.target.classList.add('cursor-text');
        f.target.focus();
      })

      elem.addEventListener('keydown', (d:any) => {
        if (d.code === "Enter") {
          if (d.target.hasAttribute('id')){

            this._updateTextNode(d.target.textContent, Model.selectedId, Model.selectedTextId, null, null);
            console.log('updatedTextNode', Model.textList, parseInt(d.target.id.slice(2)))
            Model.Storage.saveText(Model.textList);
            elem.removeAttribute('contenteditable');
            elem.classList.remove('cursor-text');
            elem.blur();

          } else {
            Model.selectedTextId = Model.textList.length > 0? Model.textList[Model.textList.length-1].textId+1:1;
            elem.id = `${Model.selectedId}_${Model.selectedTextId}`
            this._addNewTextNodeToTextList({ringId:Model.selectedId, textId:Model.selectedTextId, body:d.target.textContent, x, y})
            elem.removeAttribute('contenteditable');
            elem.classList.remove('cursor-text');
            elem.blur();
          }
        }
      })

      elem.addEventListener('dragstart', (e:any) => {
        e.dataTransfer.setData('id', e.target.id);
        document.getElementById('deletetext').classList.add(`text-red-600`)
      } )

      elem.addEventListener('dragend', (e:any) => {
        e.preventDefault();

        document.getElementById('deletetext').classList.remove(`text-red-600`)
        let foundNode = this._findTextNode(parseInt(e.target.id.slice(0,1)),parseInt(e.target.id.slice(2)));
        if (foundNode) {
          this._updateTextNode(null, foundNode.ringId, foundNode.textId, e.clientX, e.clientY);
          elem.style.left=`${e.clientX}px`;
          elem.style.top=`${e.clientY}px`;
        }
        Model.Storage.saveText(Model.textList);
      })
      return elem;
    }

    this._findTextNode = (ringId, textId) => {
      return Model.textList.find((ring) => ring.ringId === ringId && ring.textId === textId)
    }

    this._removeOldNodes = () =>{
      let oldNodes = document.querySelectorAll('.ringtext');

      if (!oldNodes) return;

      oldNodes.forEach((node) => {
        console.log((node.id.slice(0,1)))
        if(!node.id || Number(node.id.slice(0,1)) !== Model.selectedId ){
          node.remove();
        }
      })
    }
    
    this._loadTextNodes = () => {
      if (!Model.textList ||Model.textList.length < 1) return;
      let loadList = Model.textList.filter((textNode) => textNode.ringId === Model.selectedId)
      loadList.forEach((node) => {
        let newNode = this._createNewNode(node.x,node.y, node.body);
        newNode.id = `${node.ringId}_${node.textId}`;
        newNode.removeAttribute('contenteditable');
        newNode.classList.remove('cursor-text');
        this._attachTextListener(newNode, node.x, node.y);
        newNode.blur();
      })
    }

  }

  _addNewTextNodeToTextList: (textNode:textNode) => void;
  _createNewNode: (x:number, y:number, innerText?:string) => HTMLElement;
  _updateTextNode: (text:string, ringId:number, textId:number, x:number, y:number) => void;
  _attachTextListener: (elem:HTMLElement, x:number, y:number) => HTMLElement;
  _removeOldNodes: () => void;
  _loadTextNodes: () => void;
  _findTextNode: (ringId:number, textId:number) => textNode;
  _removeNode: (ringId:number, textId:number) => void;
  _removeFromDOM: (id:string) => void;

   
}