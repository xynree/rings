import { ModelType } from '../Model/Model.js'
import { ViewType } from '../View/View.js'

export interface Controller_TextType {

  attachDblClickListener: () => void;
  addNewTextNodeToTextList: (textNode:textNode) => void;
  removeOldNodes: () => void;
  createNewNode: (x:number, y:number, innerText:string) => HTMLElement;
  updateTextNode: (text:string, ringId:number, textId:number) => void;
  attachTextListener: (elem:HTMLElement, x:number, y:number) => HTMLElement;


}

type textNode = {ringId:number, textId:number, body:string, x:number, y:number}

export default class Controller_Text {

  attachDblClickListener: () => void;
  addNewTextNodeToTextList: (textNode:textNode) => void;
  removeOldNodes: () => void;
  createNewNode: (x:number, y:number, innerText:string) => HTMLElement;
  loadTextNodes: () => void;
  updateTextNode: (text:string, ringId:number, textId:number) => void;
  attachTextListener: (elem:HTMLElement, x:number, y:number) => HTMLElement;


  constructor(Model:ModelType, View:ViewType){

    this.loadTextNodes = () => {
      if (!Model.textList ||Model.textList.length < 1) return;
      let loadList = Model.textList.filter((textNode) => textNode.ringId === Model.selectedId)
      loadList.forEach(({body, x, y}) => {
        let newNode = this.createNewNode(x,y, body);
        newNode.id = `${Model.selectedId}_${Model.selectedTextId}`;
        this.attachTextListener(newNode, x, y);
        newNode.blur();
      })
    }

    this.attachTextListener = (elem, x:null, y:null) => {

      elem.addEventListener('dblclick', (f:any) => {
        if(f.target.hasAttribute('id')){
          Model.selectedTextId = parseInt(f.target.id.slice(2))
        }
        f.target.setAttribute('contenteditable','');
      })

      elem.addEventListener('keydown', (d:any) => {
        if (d.code === "Enter") {
          console.log('enter was pressed', d.target, d.target.hasAttribute('id'))
          if (d.target.hasAttribute('id')){

            this.updateTextNode(d.target.textContent, Model.selectedId, Model.selectedTextId);
            console.log('updatedTextNode', Model.textList, parseInt(d.target.id.slice(2)))
            Model.storage.saveText(Model.textList);
            elem.removeAttribute('contenteditable');
            elem.blur();

          } else {
            Model.selectedTextId = Model.textList.length > 0? Model.textList[Model.textList.length-1].textId+1:1;
            elem.id = `${Model.selectedId}_${Model.selectedTextId}`
            this.addNewTextNodeToTextList({ringId:Model.selectedId, textId:Model.selectedTextId, body:d.target.textContent, x, y})
            elem.removeAttribute('contenteditable');

            elem.blur();


            console.log(Model.textList)
          }
        }
      })

       elem.addEventListener('dragstart', (e)=> {
         console.log(e)
       })

       elem.addEventListener('dragend', (e) => {
         console.log(e)
       })
      


      return elem;
    }

    

    /**
     * @remarks
     * attaches dblclick to the whole document -> create new node with specific e.clientX and e.clientY coordinates
     * calls attachTextListener to make text editable.
     */
    

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
          console.log((node.id.slice(0,1)))
          if(!node.id || parseInt(node.id.slice(0,1)) !== Model.selectedId ){
            node.remove();
          }
        })

    }
  }
}