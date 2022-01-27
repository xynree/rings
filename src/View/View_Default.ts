export interface View_DefaultType {
  defaultView: string;
  loadDefaultView: () => void;
  styles: {text1: string, text2:string, border: string, highlight: string, hover: string, focus: string, selection: string, caret: string, bg:string};

}

export default class View_Default implements View_DefaultType{ 
  defaultView: string;
  loadDefaultView: () => void;
  styles: {text1: string, text2:string, border: string, highlight: string, hover: string, focus: string, selection: string, caret: string, bg:string};

  constructor(color:string){

  this.styles = {
    text1: `text-${color}-900`, 
    text2: `text-${color}-600`, 
    border: `border-${color}-800`, 
    highlight: `bg-${color}-100`, 
    hover: `hover:bg-${color}-200`,
    focus: `focus:ring-${color}-900`, 
    selection: `selection:ring-${color}-200`, 
    caret: `caret-${color}-800`,
    bg: `bg-${color}-800` }

  
  this.defaultView = `<div class="flex left-0 right-0 m-auto w-2/3 md:w-4/5 h-screen  justify-center items-center">
    <div
      class="w-1/4 h-full flex flex-col justify-center "
    >
      <div>
      <input type='text' class="text-4xl bg-transparent text-left ${this.styles.caret} ${this.styles.selection} mb-4 focus:outline-none ${this.styles.focus} ${this.styles.text1}" id='textdisplaytitle'  required value='My Ring Title'/>
      </div>
      <div id='newRingGroup' class=' overflow-hidden hover:overflow-scroll h-1/3 scroll-smooth'>
        <button
          id="ringid_1"
          class="ringlistbutton border border-dotted ${this.styles.border} hover:border-solid ${this.styles.text1} w-full mt-2 mb-2 flex justify-between text-center items-center "
        >
          <div class="p-2 m-auto w-full h-full text-left text-sm  ringlisttitle bg-transparent ${this.styles.text2} ">Ring Title</div>
          <div id="ringlistdelete" class="w-1/5 h-100 p-2 ${this.styles.highlight} ${this.styles.hover} ">
            <span class="${this.styles.text2} bg-transparent">x</span>
          </div>
        </button>
      </div>
      <button
        id="newring"
        class="m-8 mt-0 mb-1  border ${this.styles.border} p-2 ${this.styles.text1} w-4/5 ${this.styles.hover}"
      >
        <span class="${this.styles.text2} text-sm ">+ </span> New Ring
      </button>
      <button
      id="clear"
      class="m-8 mt-1 mb-2   border ${this.styles.border} p-2 ${this.styles.text1} w-4/5 ${this.styles.hover}"
    >
      <span class="${this.styles.text2} text-sm ">x </span> Clear Save
    </button>
    <button id='colorbutton' class='m-8 mt-1 p-2 border w-4 h-4 ${this.styles.border} ${this.styles.bg}'/></button>
  
    </div>
    <div class="w-screen flex flex-col justify-between items-between">
      <div class="w-full h-full flex justify-center items-center gap-8">
        <div
          id="oring"
          class="oring w-3/4 h-3/4 ml-12 rounded-full dragzone border ${this.styles.border} flex justify-center items-center "
        >
          <div
            draggable="true"
            id="iring"
            class="iring z-50 w-9 h-9 rounded-full border ${this.styles.border} ${this.styles.text1} flex text-center items-center justify-center cursor-grab"
          >
            +
          </div>
        </div>

        <div class="self-start pt-16 justify-self-end">
  
        </div>
      </div>
  
    </div>
    </div>`
  
  this.loadDefaultView = () => {
      document.querySelector("body").innerHTML = this.defaultView;
    }
  }

  

  
}