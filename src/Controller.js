export default class Controller {
  constructor(Model, View) {

    this.setup = function() {
      this.attachAddNewRingListener();
      this.attachDragListener_Styles();
      this.attachDragListener_NewInnerRing();
      this.attachClickListener_ClearStorage();

      if (Model.ringList.length === 1){
        View.styleDefaultRingButton(Model.selectedId);
        this.loadDefaultRingTitleButtonListener();
      } else{
        this.attachAllRingTitleButtonListeners();
      }
    }


    this.attachAddNewRingListener = function () {
      let newRing = document.getElementById("newring");
      newRing.addEventListener("click", (e) => {
        e.preventDefault();
        Model.incrementSelectedId();
        Model.addNewRingToRingListFromSelectedId();
        Model.saveStorage();
        View.clearInnerRings();
        View.addRingTitleButton(Model.selectedId);

        // event listener for new ring title button
        let newRingTitleButton = this.findNewRingTitleButton(Model.selectedId);
        newRingTitleButton.addEventListener('click', (e) => this.attachRingTitleButtonListener(Model.selectedId, e))
      }); 
    };

    this.attachDragListener_Styles = function () {
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

    this.attachRingTitleButtonListener = function(id, e) {
      e.preventDefault();
      Model.selectedId = id;
      Model.saveStorage();
      View.clearInnerRings();
      Model.loadAllSelectedInnerRingsToDOM();
      View.clearSelectedRingButton(Model.selectedId);
      View.styleSelectedRingButton(Model.selectedId);
    }

    this.findNewRingTitleButton = (id) => document.getElementById(`ringid_${id}`);

    this.loadDefaultRingTitleButtonListener = function(){
      let ringListButton = document.querySelector('.ringlistbutton');
      ringListButton.addEventListener('click', (e) =>{
        this.attachRingTitleButtonListener(ringListButton.id.slice(7), e)
    })
    }

    this.attachAllRingTitleButtonListeners = function () {
      let ringListButtons = document.querySelectorAll(".ringlistbutton");
      ringListButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          this.attachRingTitleButtonListener(button.id.slice(7), e)
        })
      })
    }


    this.attachDragListener_NewInnerRing = function () {
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
        View.removeInnerRingDragPreview(event, dragStartX, dragStartY);
      });

      innerRing.addEventListener("dragend", (event) => {
        event.preventDefault;
        dragEndX = event.screenX;
        dragEndY = event.screenY;
        event.target.classList.remove("bg-green-200");

        let posX = Math.abs(dragEndX - dragStartX);
        let posY = Math.abs(dragEndY - dragStartY);

        let diam = Math.round(this.findDiam(posX, posY));

        if (diam < 770) {
          View.addInnerRing(diam);
          Model.addNewInnerRingToRingList(diam)
          Model.saveStorage();
        }
      });
    };



    this.attachClickListener_ClearStorage = function () {
      document.getElementById("clear").addEventListener("click", (e) => {
        e.preventDefault();
        Model.clearStorage();
        Model.resetModelToDefault();
        View.clearInnerRings();
        View.clearRingTitleButtons();
        console.log("storage cleared!", localStorage);
      });
    };


//


    this.addNewRingAndUpdateStorage = function () {
      
      console.log(this.selectedId)
      this.clearInnerRings_DOM();
      this.loadAllSelectedInnerRingsToDOM();
      this.clearRingTitleButtons_DOM();
      this.loadRingTitleButtons_DOM();

      this.saveFullListStorage();
    };

    this.findDiam = (posX, posY) => Math.sqrt(posX ** 2 + posY ** 2) * 2;



  }
}
