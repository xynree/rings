import { ModelType } from '../Model/Model.js'
import { ViewType } from '../View/View.js'

export interface Controller_TextType {

  attachDblClickListener: () => void;
  selectedTextId: number;
  textNodeList: textNode[];
  addNewTextNodeToTextList: (textNode:textNode) => void;
  removeOldNodes: () => void;
  createNewNode: (x:number, y:number) => HTMLElement;
}

type textNode = {ringId:number, textId:number, body:string, x:number, y:number}

export default class Controller_Text {

  attachDblClickListener: () => void;
  selectedTextId: number;
  textNodeList: textNode[];
  addNewTextNodeToTextList: (textNode:textNode) => void;
  removeOldNodes: () => void;
  createNewNode: (x:number, y:number) => HTMLElement;


  constructor(Model:ModelType, View:ViewType){

    this.selectedTextId=0;
    this.textNodeList = []

    this.attachDblClickListener = () => {
      document.addEventListener('dblclick', (e:any) => {

        if (e.target.id !== 'oring' && e.target.id !== 'innerring') return;

        this.removeOldNodes();

        let newTextNode = this.createNewNode(e.clientX, e.clientY);

  
        newTextNode.addEventListener('keydown', (d:any) => {
          if (d.code === "Enter") {  
          this.selectedTextId++;
          newTextNode.id = `${Model.selectedId}_${this.selectedTextId}`
          this.addNewTextNodeToTextList({ringId:Model.selectedId, textId:this.selectedTextId, body:d.target.textContent, x:e.clientX, y:e.clientY  })
          newTextNode.blur();

          }
        })
      })
    }

    this.addNewTextNodeToTextList= ({ringId, textId, body, x, y}) => {
      this.textNodeList.push({ ringId, textId, body, x, y })
      console.log(this.textNodeList)
    }

    this.createNewNode = (x,y) => {

      let newTextNode = document.createElement('span');
      newTextNode.classList.add('ringtext', 'p-2', 'absolute', 'min-w-4', 'h-8', 'focus:outline', 'focus:outline-slate-800','focus:bg-slate-50', 'bg-transparent', 'focus:ring-stone-900', 'hover:bg-slate-50', 'text-base');
      newTextNode.style.left=`${x}px`;
      newTextNode.style.top=`${y}px`;
      newTextNode.setAttribute('draggable', 'true')
      newTextNode.setAttribute('contenteditable', '');
      document.body.appendChild(newTextNode);
      newTextNode.focus();
      return newTextNode;
    }

    this.removeOldNodes = () =>{

      let oldNodes = document.querySelectorAll('.ringtext');
      oldNodes.forEach((node) => {
        if(!node.id){
          node.remove();
        }
      })
    }
  }
}