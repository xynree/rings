class Ring {
  constructor() {
    this.setup = function () {
      this.attachInnerRingListeners();
      this.attachListeners();
    };

    this.attachInnerRingListeners = function () {
      let dragStartX;
      let dragEndX;
      let innerRing = document.querySelector("#iring");
      let center = document.querySelector("#center");

      innerRing.addEventListener("mouseenter", (event) => {
        event.target.classList.add("bg-green-200");
      });

      innerRing.addEventListener("mouseout", (event) => {
        event.target.classList.remove("bg-green-200");
      });

      innerRing.addEventListener("drag", function (event) {}, false);

      innerRing.addEventListener("dragstart", (event) => {
        center.click();
        dragStartX = event.screenX;
        event.target.classList.add("bg-gray-200");
      });

      innerRing.addEventListener("dragend", (event) => {
        dragEndX = event.screenX;
        event.target.classList.remove("bg-gray-200");

        if (dragEndX - dragStartX && dragEndX - dragStartX < 320) {
          this.createInnerRing(dragEndX - dragStartX);
        }
      });
    };

    this.attachdocListeners = function () {
      document.addEventListener(
        "dragenter",
        function (event) {
          if (event.target.classList.contains("dragzone")) {
            console.log("drag entered");
            event.target.classList.add("bg-green-100");
          }
        },
        false
      );

      document.addEventListener(
        "dragleave",
        function (event) {
          if (event.target.classList.contains("dragzone")) {
            console.log("drag left");
            event.target.classList.remove("bg-green-100");
          }
        },
        false
      );

      document.addEventListener(
        "dragend",
        function (event) {
          if (event.target.classList.contains("dragzone")) {
            console.log("drag ended");
            event.target.classList.remove("bg-green-100");
          }
        },
        false
      );
    };

    this.createInnerRing = function (value) {
      let outerRing = document.querySelector("#oring");
      let newRing = document.createElement("div");
      newRing.innerText = "+";
      newRing.classList.add(
        "absolute",
        "rounded-full",
        "border",
        "border-green-500",
        "m-12",
        "flex",
        "justify-center",
        "items-center"
      );
      newRing.style.width = `${value * 2}px`;
      newRing.style.height = `${value * 2}px`;

      outerRing.appendChild(newRing);
    };
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
