export default class View {
  constructor() {

    this.defaultView = `<div class="flex left-0 right-0 m-auto w-2/3 md:w-4/5 h-screen bg-stone-100 justify-center items-center">
  <div
    class="w-1/4 h-full flex flex-col justify-center"
  >
    <div>
    <input type='text' class="text-2xl bg-transparent text-center" id='textdisplaytitle' value='My Ring Title'/>
    </div>
    <div id='newRingGroup' class='m-6 ml-12'>
      <button
        id="ringid_1"
        class="ringlistbutton border border-stone-800 text-stone-800 w-4/5 m-2 flex justify-between text-center items-center "
      >
        <div class="p-2 text-center text-sm ringlisttitle bg-transparent">Ring Title</div>
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
        class="oring  rounded-full dragzone border border-slate-700 flex justify-center items-center"
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
  <div id="control" class="absolute w-full h-6 bg-stone-400 bottom-0"></div>

    </div>`

    this.loadDefaultView = () => {
      document.querySelector("body").innerHTML = this.defaultView;
    }

    this.addInnerRing = function (value) {
      let outerRing = document.querySelector("#oring");
      let newRing = document.createElement("div");
      newRing.innerText = "";
      newRing.classList.add(
        "absolute",
        "rounded-full",
        "border",
        "border-stone-700",
        "bg-transparent",
        "m-12",
        "flex",
        "justify-center",
        "items-center"
      );
      newRing.style.width = `${value}px`;
      newRing.style.height = `${value}px`;
      outerRing.appendChild(newRing);
    };


    this.addRingTitleButton = (id) => {
      let newRingGroup = document.getElementById("newRingGroup");
      let ringButton1 = document.getElementById('ringid_1')
      let newButton = ringButton1.cloneNode(true);
      newButton.classList.add('ringlistbutton')
      newButton.id = `ringid_${id}`;
      newRingGroup.appendChild(newButton);
    }

    this.clearInnerRings = function () {
      let outerRing = document.querySelector("#oring");
      while (outerRing.lastElementChild && outerRing.lastElementChild.id !== "iring") {
        outerRing.removeChild(outerRing.lastElementChild);
      }
    };

    this.clearRingTitleButtons = function() {
      let newRingGroup = document.getElementById("newRingGroup");
      while (newRingGroup.children.length > 1) {
        newRingGroup.removeChild(newRingGroup.lastChild);
      }
    }

    this.styleBackground = (elem, color) => elem.style.background = color


    this.removeInnerRingDragPreview = (e) => {
      let dragShadow = e.target.cloneNode(true);
      dragShadow.style.display = "none";
      document.body.appendChild(dragShadow);
      e.dataTransfer.setDragImage(dragShadow, 0, 0);
      e.target.classList.add("bg-stone-200");
    }



  }

  



}