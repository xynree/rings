export default class Ring {
  constructor(id) {
    this.id = id;
    this.title = 'Ring Title'

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
        event.preventDefault
        dragEndX = event.screenX;
        dragEndY = event.screenY;
        event.target.classList.remove("bg-green-200");
        
        let posX = Math.abs(dragEndX - dragStartX)
        let posY = Math.abs(dragEndY - dragStartY)

        let diam = Math.round(this.findDiam(posX, posY))

        if (diam < 770) {
          this.loadInnerRing(diam);
        }
      });
    };

    this.loadInnerRing = function (value) {
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
      this.innerRings.push(value);
      outerRing.appendChild(newRing);
      this.storeInnerRings();
    };
    this.findDiam = (posX, posY) => Math.sqrt(posX**2 + posY**2)*2

    this.innerRings = []


  }


}


