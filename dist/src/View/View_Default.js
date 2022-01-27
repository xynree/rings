export default class View_Default {
    constructor() {
        this.defaultView = `<div class="flex left-0 right-0 m-auto w-2/3 md:w-4/5 h-screen bg-stone-100 justify-center items-center">
    <div
      class="w-1/4 h-full flex flex-col justify-center "
    >
      <div>
      <input type='text' class="text-4xl bg-transparent text-left caret-brown-800 selection:bg-stone-200 focus:outline-none focus:ring-stone-900" id='textdisplaytitle' required value='My Ring Title'/>
      </div>
      <div id='newRingGroup' class=' overflow-hidden hover:overflow-scroll h-1/3 scroll-smooth'>
        <button
          id="ringid_1"
          class="ringlistbutton border border-dotted border-stone-800 hover:border-solid text-stone-800 w-full mt-2 mb-2 flex justify-between text-center items-center "
        >
          <div class="p-2 m-auto w-full h-full text-left text-sm ringlisttitle bg-transparent">Ring Title</div>
          <div id="ringlistdelete" class="w-1/5 h-100 p-2 bg-stone-200 ">
            <span class="text-stone-500 bg-transparent">x</span>
          </div>
        </button>
      </div>
      <button
        id="newring"
        class="m-8 mt-0 mb-1  border border-stone-700 p-2 text-stone-500 w-4/5"
      >
        <span class="text-stone-800 text-sm">+ </span> New Ring
      </button>
      <button
      id="clear"
      class="m-8 mt-1 mb-2   border border-stone-700 p-2 text-stone-500 w-4/5"
    >
      <span class="text-stone-800 text-sm">x </span> Clear Save
    </button>
  
    </div>
    <div class="w-screen flex flex-col justify-between items-between">
      <div class="w-full h-full flex justify-center items-center gap-8">
        <div
          id="oring"
          class="oring w-3/4 h-3/4 ml-12 rounded-full dragzone border border-slate-700 flex justify-center items-center "
        >
          <div
            draggable="true"
            id="iring"
            class="iring z-50 w-9 h-9 rounded-full border border-slate-700 text-black flex text-center items-center justify-center cursor-grab"
          >
            +
          </div>
        </div>

        <div class="self-start pt-16 justify-self-end">
  
        </div>
      </div>
  
    </div>
    </div>`;
        this.loadDefaultView = () => {
            document.querySelector("body").innerHTML = this.defaultView;
        };
    }
}
//# sourceMappingURL=View_Default.js.map