class Ring {
  constructor() {    
    this.setup = function () {
      this.attachInnerRingListeners();
      this.attachDocListeners();
    };

    this.attachInnerRingListeners = function () {
      let dragStartX;
      let dragEndX;
      let dragStartY;
      let dragEndY;
      let innerRing = document.querySelector("#iring");

      innerRing.addEventListener("mouseenter", (event) => {
        event.target.classList.add("bg-gray-200");
      });

      innerRing.addEventListener("mouseout", (event) => {
        event.target.classList.remove("bg-gray-200");
      });

      innerRing.addEventListener("drag", function (event) {}, false);

      innerRing.addEventListener("dragstart", (event) => {
        let dragShadow = event.target.cloneNode(true);
        dragShadow.style.display = 'none';
        document.body.appendChild(dragShadow);
        event.dataTransfer.setDragImage(dragShadow,0,0)
        dragStartX = event.screenX;
        dragStartY = event.screenY;
        event.target.classList.add("bg-green-200");
      });

      innerRing.addEventListener("dragend", (event) => {
        dragEndX = event.screenX;
        dragEndY = event.screenY;
        event.target.classList.remove("bg-green-200");
        
        let posX = Math.abs(dragEndX - dragStartX)
        let posY = Math.abs(dragEndY - dragStartY)

        let diam = Math.round(this.findDiam(posX, posY))

        if (diam < 770) {
          this.createInnerRing(diam);
        }
      });
    };

    this.findDiam = (posX, posY) => Math.sqrt(posX**2 + posY**2)*2

    this.attachDocListeners = function () {
      document.addEventListener(
        "dragenter",
        function (event) {
          if (event.target.classList.contains("dragzone")) {
            event.target.classList.add("bg-green-100");
          }
        },
        false
      );

      document.addEventListener(
        "dragleave",
        function (event) {
          if (event.target.classList.contains("dragzone")) {
            event.target.classList.remove("bg-green-100");
          }
        },
        false
      );

      document.addEventListener(
        "dragend",
        function (event) {
          if (event.target.classList.contains("dragzone")) {
            event.target.classList.remove("bg-green-100");
          }
        },
        false
      );
    };

    this.createInnerRing = function (value) {
      console.log(value)
      let outerRing = document.querySelector("#oring");
      let newRing = document.createElement("div");
      newRing.innerText = "+";
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

    this.ringTitle = 'Ring Title'
  }
}

function render() {
  let defRing = new Ring();
  defRing.setup();

  console.log("refreshed");
}

document.addEventListener("DOMContentLoaded", (event) => {
  render();
});
