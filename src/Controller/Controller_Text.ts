import { ModelType } from '../Model/Model.js'
import { ViewType } from '../View/View.js'
import { textNode } from '../Types/Types.js'

export interface Controller_TextType {


  attachDblClickListener: () => void;
  addNewTextNodeToTextList: (textNode:textNode) => void;
  removeOldNodes: () => void;
  createNewNode: (x:number, y:number, innerText:string) => HTMLElement;
  updateTextNode: (text:string, ringId:number, textId:number, x:number, y:number) => void;
  attachTextListener: (elem:HTMLElement, x:number, y:number) => HTMLElement;
  findTextNode: (ringId:number, textId:number) => textNode

  refreshNodes: () => void;

}

export default class Controller_Text {




  constructor(Model:ModelType, View:ViewType){

    this.refreshNodes = () => {
      this.removeOldNodes();
      this.loadTextNodes();
    }

    this.loadTextNodes = () => {
      if (!Model.textList ||Model.textList.length < 1) return;
      let loadList = Model.textList.filter((textNode) => textNode.ringId === Model.selectedId)
      loadList.forEach((node) => {
        let newNode = this.createNewNode(node.x,node.y, node.body);
        newNode.id = `${node.ringId}_${node.textId}`;
        newNode.removeAttribute('contenteditable');
        newNode.classList.remove('cursor-text');
        this.attachTextListener(newNode, node.x, node.y);
        newNode.blur();
      })
    }

    this.attachTextListener = (elem, x:null, y:null) => {

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
          console.log('enter was pressed', d.target, d.target.hasAttribute('id'))
          if (d.target.hasAttribute('id')){

            this.updateTextNode(d.target.textContent, Model.selectedId, Model.selectedTextId, null, null);
            console.log('updatedTextNode', Model.textList, parseInt(d.target.id.slice(2)))
            Model.Storage.saveText(Model.textList);
            elem.removeAttribute('contenteditable');
            elem.classList.remove('cursor-text');

            elem.blur();

          } else {
            Model.selectedTextId = Model.textList.length > 0? Model.textList[Model.textList.length-1].textId+1:1;
            elem.id = `${Model.selectedId}_${Model.selectedTextId}`
            this.addNewTextNodeToTextList({ringId:Model.selectedId, textId:Model.selectedTextId, body:d.target.textContent, x, y})
            elem.removeAttribute('contenteditable');
            elem.classList.remove('cursor-text');
            elem.blur();
          }
        }
      })




      elem.addEventListener('dragend', (e:any) => {
        e.preventDefault();

        let foundNode = this.findTextNode(parseInt(e.target.id.slice(0,1)),parseInt(e.target.id.slice(2)));
        this.updateTextNode(null, foundNode.ringId, foundNode.textId, e.clientX, e.clientY);

        elem.style.left=`${e.clientX}px`;
        elem.style.top=`${e.clientY}px`;
        Model.Storage.saveText(Model.textList);
        
      })
      return elem;
    }

    this.attachDblClickListener = () => {
      document.addEventListener('dblclick', (e:any) => {

        if (e.target.id !== 'oring' && e.target.id !== 'innerring') return;

        this.removeOldNodes();

        let newTextNode = this.createNewNode(e.clientX, e.clientY, '');
        this.attachTextListener(newTextNode, e.clientX, e.clientY);
      })
    }

    this.updateTextNode = (text=null, ringId, textId, x=null, y=null) => {
      Model.textList.forEach((node) => {
        if(node.ringId === ringId && node.textId === textId){
          if (text) node.body = text;
          if (x) node.x = x;
          if (y) node.y = y;
        }});
    }

    this.addNewTextNodeToTextList= ({ringId, textId, body, x, y}) => {
      Model.textList.push({ ringId, textId, body, x, y })
      Model.Storage.saveText(Model.textList);
    }

    this.createNewNode = (x,y, innerText='') => {
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

    this.findTextNode = (ringId, textId) => {
      return Model.textList.find((ring) => ring.ringId === ringId && ring.textId === textId)
    }

    this.removeOldNodes = () =>{
      let oldNodes = document.querySelectorAll('.ringtext');

      if (!oldNodes) return;

      oldNodes.forEach((node) => {
        console.log((node.id.slice(0,1)))
        if(!node.id || parseInt(node.id.slice(0,1)) !== Model.selectedId ){
          node.remove();
        }
      })
    }
  }
    /**
   * attaches dblclick to the whole document -> create new node with at (e.screenX, e.screenY) -> calls attachTextListener to make text editable.
   */
     attachDblClickListener: () => void;
     addNewTextNodeToTextList: (textNode:textNode) => void;
     removeOldNodes: () => void;
     createNewNode: (x:number, y:number, innerText:string) => HTMLElement;
     loadTextNodes: () => void;
     updateTextNode: (text:string, ringId:number, textId:number, x:number, y:number) => void;
     attachTextListener: (elem:HTMLElement, x:number, y:number) => HTMLElement;
     findTextNode: (ringId:number, textId:number) => textNode
   
     refreshNodes: () => void;
}