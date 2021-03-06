import { View_DefaultType } from '../Types/Types.js'

export default class View_Default implements View_DefaultType{ 
  defaultView: string;
  styles: {text1: string, text2:string, border: string, highlight: string, hover: string, focus: string, selection: string, caret: string, bg:string};


  loadDefaultView = () => document.querySelector("body").innerHTML = this.defaultView;
  
  constructor(color:string){

  this.styles = {
    text1: `text-${color}-900`, 
    text2: `text-${color}-600`, 
    border: `border-${color}-800`, 
    highlight: `bg-${color}-50`, 
    hover: `hover:bg-${color}-200`,
    focus: `focus:ring-${color}-900`, 
    selection: `selection:bg-${color}-200`, 
    caret: `caret-${color}-800`,
    bg: `bg-${color}-800` 
  }

  
  this.defaultView = `<div class="flex  h-screen p-12 justify-center items-center">
  <div class='w-[600px] flex-shrink-0 flex justify-end'>
    <div class="w-1/2 mr-12  flex flex-col justify-center flex-shrink-0">
        <input type='text' class="text-4xl  text-left p-1 w-full bg-transparent ${this.styles.caret} ${this.styles.selection}  mb-4 focus:outline-none ${this.styles.focus} ${this.styles.text1}" id='textdisplaytitle'  required value='My Ring Title'/>
        <div id='newRingGroup' class='overflow-scroll h-64 scroll-smooth flex-shrink-0'>
          <div id="ringid_1" class='ringtitlebuttongroup z-0 flex w-5/6 h-10 m-2 items-center justify-between'>
            <button
            id='ringlistbutton'
              class="{this.styles.text2} border border-dotted ${this.styles.border}  ${this.styles.text1} w-full  h-10 p-2 justify-between text-center items-center "
            >
          Ring Title
            </button>
            <button class="ringlistdelete flex-0 p-2 h-10 z-10 hover:bg-${color}-100 invisible ${this.styles.text2} ">
            x
            </button>
         </div>
        </div>
      <button
        id="newring"
        class="m-2 mb-1 p-2 border w-5/6 ${this.styles.border}  ${this.styles.text1}  ${this.styles.hover}"
      >
          <span class="${this.styles.text2} text-sm ">+ </span> New Ring
      </button>
      <button
        id="clear"
        class="m-2 mt-1 p-2 w-5/6  border ${this.styles.border}  ${this.styles.text1}  ${this.styles.hover}"
      >
        <span id='ringlistdeletespan' class="${this.styles.text2} text-sm ">x </span> Clear
      </button>
      <div class='flex items-center'>
      <button id='colorbutton' class='m-1 mr-3 p-1 w-8 h-8 '/>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="28" viewBox="0 0 33.19 37.49"><path d="M13.41,5.11c.21-2-1.75-3.63-3.71-4.08A8.2,8.2,0,0,0,.29,6.7c-1.35,5.08,2.49,10.2,2.18,15.45-.15,2.56-1.3,5.15-.57,7.61a7.77,7.77,0,0,0,2.32,3.4c5,4.55,12.54,5,19.17,3.7a12.64,12.64,0,0,0,4-1.33,10,10,0,0,0,3.5-3.7c3-5.21,2.71-11.83.74-17.53A23.78,23.78,0,0,0,24.79,3.71,14.88,14.88,0,0,0,12.92.19a6.69,6.69,0,0,0-4.4,2.43,8.36,8.36,0,0,0-1.14,3,43.39,43.39,0,0,0-.06,18.5c.43,2,1.24,4.2,3.16,4.86a6.43,6.43,0,0,0,3.42-.13,12,12,0,0,0,4.19-1.51c2.68-1.83,3.38-5.46,3.41-8.71a15.33,15.33,0,0,0-1.12-6.47A7.13,7.13,0,0,0,15.53,8a2.14,2.14,0,0,0-2.06.46A2.46,2.46,0,0,0,13,9.75a26.09,26.09,0,0,0,1.79,14.44c.85,2,2.67,4.13,4.69,3.43" class='fill-${color}-800'  />
        </svg>
      </button>
      <button class='${this.styles.text2} text-3xl'>
      ?
      </button>
      <button id='deletetext' class='${this.styles.text2}  ml-3 text-4xl w-10 h-10'>
      X
      </button>
      </div>
    </div>
    </div>

    <div class="w-full flex flex-col justify-center items-start ">
        <div
          id="oring"
          class="oring rounded-full dragzone border ${this.styles.border} flex justify-center items-center "
        >
          <div
            draggable="true"
            id="center_ring"
            class="iring z-50 w-9 h-9 rounded-full border ${this.styles.border} ${this.styles.text1} flex text-center items-center justify-center cursor-grab"
          >
            +
          </div>
        </div>  
    </div>
  
    </div>
    </div>`
  

  }

  

  
}