import { ModelType } from '../Model/Model.js'
import { ViewType } from '../View/View.js'

export interface Controller_TextType {

  attachDblClickListener: () => void;
  selectedTextId: number;
  textList: textNode[];
  addNewTextNodeToTextList: (textNode:textNode) => void;



}

type textNode = {ringId:number, textId:number, body:string, x:number, y:number}

export default class Controller_Text {

  attachDblClickListener: () => void;
  selectedTextId: number;
  textList: textNode[];
  addNewTextNodeToTextList: (textNode:textNode) => void;


  constructor(Model:ModelType, View:ViewType){

    this.selectedTextId=0;
    this.textList = []

    this.attachDblClickListener = () => {
      document.addEventListener('dblclick', (e) => {

        if (e.target.id !== 'oring' && e.target.id !== 'innerring') return;

        let oldNodes = document.querySelectorAll('.ringtext');

        console.log(e.target)
        oldNodes.forEach((node) => {
          if(!node.id){
            node.remove();
          }
        })

        let newInput = document.createElement('input');

          newInput.classList.add('ringtext', 'p-2', 'absolute', 'w-auto', 'min-w-36', 'h-8', 'focus:outline', 'focus:outline-slate-800','focus:bg-slate-50', 'bg-transparent', 'focus:ring-stone-900', 'hover:bg-slate-50');
          newInput.style.left=`${e.clientX}px`;
          newInput.style.top=`${e.clientY}px`;
          newInput.setAttribute('draggable', 'true')
          document.body.appendChild(newInput);
          newInput.focus();
          console.log('a child was appended', newInput, e.clientX, e.clientY)
  
          newInput.addEventListener('keydown', (d) => {
            if (d.code === "Enter") {  

            d.preventDefault();

            this.selectedTextId++;
            newInput.id = `${Model.selectedId}_${this.selectedTextId}`
            this.addNewTextNodeToTextList({ringId:Model.selectedId, textId:this.selectedTextId, body:(<HTMLInputElement>d.target).value, x:e.clientX, y:e.clientY  })
            newInput.blur();

            }
          })

        


      })
    }

    this.addNewTextNodeToTextList= ({ringId, textId, body, x, y}) => {
      this.textList.push({ ringId, textId, body, x, y })
      console.log(this.textList)
    }

  }
}