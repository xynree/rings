export default class Controller {
  constructor(Model, View) {


    this.setup = function() {
      View.loadDefaultView();
      this.attachAddNewRingListener();
      this.attachDragListener_Styles();
      this.attachDragListener_NewInnerRing();
      this.attachClickListener_ClearStorage();

      if (Model.storage.hasStoredRings()){
        Model.selectedId = Model.storage.loadSelectedIdFromStorage();
        Model.ringList = Model.storage.loadRingListFromStorage();

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
      this.loadDisplayedTitle();
      this.attachDisplayedTitleListener();
      this.loadRingListButtonTitles();
    }


    this.attachDisplayedTitleListener = () => {
      let node = document.getElementById('textdisplaytitle')

      node.addEventListener("keydown", (e) =>{
        if (e.code === "Enter") {  //checks whether the pressed key 
          console.log('you pressd enter', e.target.value)
          Model.ringList.forEach((ring) => {
            if (ring.id == Model.selectedId){
              console.log(e.target.value)
              ring.title = e.target.value;
              Model.storage.saveAllStorage(Model.ringList, Model.selectedId);

            }
            })
            node.blur();
            this.loadRingListButtonTitles();
            }
          })
    }

    this.loadDisplayedTitle = () => {
      console.log('load displayed title run')
      let selectedTitle = Model.ringList.filter((ringList) => ringList.id == Model.selectedId)[0].title
      document.getElementById('textdisplaytitle').value = selectedTitle;
    }

    this.attachAddNewRingListener = function () {
      let newRing = document.getElementById("newring");
      newRing.addEventListener("click", (e) => {
        e.preventDefault();
        Model.incrementSelectedId();
        Model.addNewRingToRingListFromSelectedId();
        View.clearInnerRings();
        View.addRingTitleButton(Model.selectedId);
        this.clearSelectedRingButton();
        this.styleSelectedRingButton(Model.selectedId)
        Model.storage.saveAllStorage(Model.ringList, Model.selectedId);
        this.loadRingListButtonTitles();

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


    this.loadRingListButtonTitles = () => {

      let ringListButtons = document.querySelectorAll(".ringlistbutton");
      ringListButtons.forEach((button) => {
  
        let selectedTitle = Model.ringList.filter((ring)=> ring.id == button.id.slice(7))[0].title
  
        button.firstElementChild.innerText = selectedTitle;
        console.log(button.id.slice(7), button.firstElementChild.innerText, selectedTitle)
  
      })
  
    }
    this.attachRingTitleButtonListener = function(id, e) {
      e.preventDefault();
      Model.selectedId = id
      Model.storage.saveAllStorage(Model.ringList, Model.selectedId)
      View.clearInnerRings();
      Model.loadAllSelectedInnerRingsToDOM();
      this.clearSelectedRingButton(id);
      this.styleSelectedRingButton(id);
      this.loadDisplayedTitle();
      this.loadRingListButtonTitles();
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
          if (button.id.slice(7) == id){
            console.log('i am the selected one:',button.id)
            View.styleBackground(button, this.HIGHLIGHT )
          }
        })
      } else {
        let ringListButton = document.querySelector('.ringlistbutton')
        if (ringListButton.id.slice(7) == id){
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
          Model.storage.saveAllStorage(Model.ringList, Model.selectedId)
        }
      });
    };

  
  this.attachClickListener_ClearStorage = function () {
      document.getElementById("clear").addEventListener("click", (e) => {
        e.preventDefault();
        Model.storage.clearStorage();
        Model.resetModelToDefault();
        View.clearInnerRings();
        View.clearRingTitleButtons();
        console.log("storage cleared!", localStorage);
      });
    };


  }


}
