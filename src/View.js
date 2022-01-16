export default class View {
  constructor() {

    this.defaultView = `<div class="flex w-screen h-screen bg-zinc-50">
  <div
    class="w-1/4 border border-lime-700 h-full flex flex-col justify-start bg-white"
  >
    <div>
      <div class="text-center m-12 text-4xl text-lime-500">My Rings</div>
    </div>
    <hr />
    <div id='newRingGroup'>
      <button
        id="ringid_1"
        class="ringlistbutton m-6 border border-lime-700 text-lime-500 w-4/5 flex justify-between text-center items-center justify-center"
      >
        <div class="p-3 text-center w-4/5">Ring Title</div>
        <div id="ringlistdelete" class="w-1/5 h-full p-3 bg-lime-500">
          <span class="text-white">x</span>
        </div>
      </button>
    </div>
    <button
      id="newring"
      class="m-6 border border-lime-700 p-3 text-lime-500 w-4/5"
    >
      <span class="text-lime-700">+</span> New Ring
    </button>
    <button
    id="clear"
    class="m-6 border border-lime-700 p-3 text-lime-500 w-4/5"
  >
    <span class="text-lime-700">x</span> Clear Save
  </button>

  </div>
  <div class="w-screen flex flex-col justify-between items-between">
    <div class="w-full h-full flex justify-center items-center gap-8">
      <div
        id="oring"
        class="oring min-w-96 rounded-full dragzone border border-lime-700 flex justify-center items-center"
      >
        <div
          draggable="true"
          id="iring"
          class="iring z-50 w-9 h-9 rounded-full border border-lime-700 text-lime-500 flex text-center items-center justify-center cursor-grab"
        >
          +
        </div>
      </div>
      <div class="self-start p-6 justify-self-end">
        <div
          class="flex flex-col justify-start align-start text-2xl text-lime-500"
        >
          <div class="text-2xl" id='textdisplaytitle'>My Ring Title</div>
        </div>
      </div>
    </div>

    <div id="control" class="w-full h-12 greenbar"></div>
  </div>
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
        "border-lime-700",
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
      console.log(newRingGroup, newButton)
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

      e.target.classList.add("bg-green-200");
    }



  }

  



}