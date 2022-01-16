export default class Controller {
  constructor(Model, View) {

    this.setup = function() {
      View.loadDefaultView();
      this.attachAddNewRingListener();
      this.attachDragListener_Styles();
      this.attachDragListener_NewInnerRing();
      this.attachClickListener_ClearStorage();

      if (Model.storage.hasStoredRings()){
        Model.setSelectedIdFromStorage();
        Model.setRingListFromStorage();

        View.clearRingTitleButtons();
        Model.loadRingTitleButtonsToDOM();
        Model.loadAllSelectedInnerRingsToDOM();

        this.attachAllRingTitleButtonListeners();
        this.clearSelectedRingButton();
        this.styleSelectedRingButton(Model.selectedId);
      } else{
        this.styleDefaultRingButton();
        this.loadDefaultRingTitleButtonListener();

        Model.storage.saveAllStorage(Model.ringList, Model.selectedId);
      }
    }


    this.attachAddNewRingListener = function () {
      let newRing = document.getElementById("newring");
      newRing.addEventListener("click", (e) => {
        e.preventDefault();
        Model.incrementSelectedId();
        Model.addNewRingToRingListFromSelectedId();
        View.clearInnerRings();
        console.log(Model.ringList)
        View.addRingTitleButton(Model.selectedId);
        this.clearSelectedRingButton();
        this.styleSelectedRingButton(Model.selectedId)
        Model.saveStorage();

        // event listener for new ring title button
        let newRingTitleButton = this.findNewRingTitleButton(Model.selectedId);
        newRingTitleButton.addEventListener('click', (e) => this.attachRingTitleButtonListener(e.target.parentNode.id.slice(7), e))
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
      Model.selectedId = id
      Model.saveStorage();
      View.clearInnerRings();
      Model.loadAllSelectedInnerRingsToDOM();
      this.clearSelectedRingButton(id);
      this.styleSelectedRingButton(id);
    }

    this.attachAllRingTitleButtonListeners = function () {
      let ringListButtons = document.querySelectorAll(".ringlistbutton");
      ringListButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          this.attachRingTitleButtonListener(button.id.slice(7), e)
        })
      })
    }

    // STYLES

    this.HIGHLIGHT = "rgb(242, 255, 207)"

    this.clearSelectedRingButton = function() {
      let ringListButtons = document.querySelectorAll('.ringlistbutton')
      ringListButtons.forEach((button) => {
        if (button.id.slice(7) !== this.selectedId){
          View.styleBackground(button, "white")
        }
      })
    }
  
    this.styleSelectedRingButton = function(id){
      if (id !== 1){
        let ringListButtons = document.querySelectorAll('.ringlistbutton')
        ringListButtons.forEach((button) => {
          console.log(id, 'checked a button', button.id.slice(7))
          if (button.id.slice(7) == id){
            console.log('i am the selected one:',button.id)
            View.styleBackground(button, this.HIGHLIGHT )
          }
        })
      } else {
        let ringListButton = document.querySelector('.ringlistbutton')
        if (ringListButton.id.slice(7) == id){
          console.log('i am the selected one:',button.id )
          View.styleBackground(ringListButton, this.HIGHLIGHT)
        }
      }
    }
  
    // for initial loaded ring
    this.styleDefaultRingButton = function(id) {
      let ringListButton = document.querySelector('.ringlistbutton')
      View.styleBackground(ringListButton, this.HIGHLIGHT)
    }

    this.loadDefaultRingTitleButtonListener = function(){
      let ringListButton = document.querySelector('.ringlistbutton');
      ringListButton.addEventListener('click', (e) =>{
        this.attachRingTitleButtonListener(ringListButton.id.slice(7), e)
    })
    }

    this.findNewRingTitleButton = (id) => document.getElementById(`ringid_${id}`);

    this.findDiam = (posX, posY) => Math.sqrt(posX ** 2 + posY ** 2) * 2;


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
        dragStartX = event.screenX;
        dragStartY = event.screenY;
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


  }
}