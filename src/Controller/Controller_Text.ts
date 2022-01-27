import { ModelType } from '../Model/Model.js'
import { ViewType } from '../View/View.js'

export interface Controller_TextType {

  attachDblClickListener: () => void;
  addNewTextNodeToTextList: (textNode:textNode) => void;
  removeOldNodes: () => void;
  createNewNode: (x:number, y:number, innerText:string) => HTMLElement;
}

type textNode = {ringId:number, textId:number, body:string, x:number, y:number}

export default class Controller_Text {

  attachDblClickListener: () => void;
  addNewTextNodeToTextList: (textNode:textNode) => void;
  removeOldNodes: () => void;
  createNewNode: (x:number, y:number, innerText:string) => HTMLElement;
  loadTextNodes: () => void;


  constructor(Model:ModelType, View:ViewType){

    this.loadTextNodes = () => {
      if (!Model.textList ||Model.textList.length < 1) return;
      let loadList = Model.textList.filter((textNode) => textNode.ringId === Model.selectedId)
      loadList.forEach(({body, x, y}) => {
        this.createNewNode(x,y, body);
      })
    }


    this.attachDblClickListener = () => {
      document.addEventListener('dblclick', (e:any) => {

        if (e.target.id !== 'oring' && e.target.id !== 'innerring') return;

        this.removeOldNodes();

        let newTextNode = this.createNewNode(e.clientX, e.clientY, '');
  
        newTextNode.addEventListener('keydown', (d:any) => {
          if (d.code === "Enter") {  
          Model.selectedTextId++;
          newTextNode.id = `${Model.selectedId}_${Model.selectedTextId}`
          this.addNewTextNodeToTextList({ringId:Model.selectedId, textId:Model.selectedTextId, body:d.target.textContent, x:e.clientX, y:e.clientY  })
          newTextNode.blur();
          }
        })
      })
    }

    this.addNewTextNodeToTextList= ({ringId, textId, body, x, y}) => {
      Model.textList.push({ ringId, textId, body, x, y })
      Model.storage.saveText(Model.textList);
    }

    this.createNewNode = (x,y, innerText='') => {
      let newTextNode = document.createElement('span');
      newTextNode.classList.add('ringtext', 'p-2', 'absolute', 'min-w-4', 'h-8', 'focus:outline', `focus:outline-${View.color}-800`,`focus:bg-${View.color}-50`, 'bg-transparent', 'focus:ring-stone-900', `${View.Default.styles.hover}`, `${View.Default.styles.text2}`,'text-base');
      newTextNode.style.left=`${x}px`;
      newTextNode.style.top=`${y}px`;
      newTextNode.setAttribute('draggable', 'true')
      newTextNode.setAttribute('contenteditable', '');
      newTextNode.innerText = innerText;
      document.body.appendChild(newTextNode);
      newTextNode.focus();
      return newTextNode;
    }

    this.removeOldNodes = () =>{
      let oldNodes = document.querySelectorAll('.ringtext');

      if (!oldNodes) return;
        oldNodes.forEach((node) => {
          if(!node.id || parseInt(node.id.slice(0,1)) !== Model.selectedId ){
            node.remove();
          }
        })



    }
  }
}