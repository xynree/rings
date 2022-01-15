
export default class RingSkeleton  {

  constructor(idcounter){

    this.selectedRing = 1;
    this.idIndex = 1;
    this.id = 0
    this.genId = () => {
      idcounter++;
      this.id = idcounter;};
    this.title = 'Ring Title'
    this.innerRings = []
    this.ringList = [{id:this.id, title:this.title, innerRings: this.innerRings}];


    this.setup = function() {
      this.attachListeners();
      if (this.hasStoredRings()){
        this.loadStorage();
        this.loadRingTitleButtons(this.ringList);
      } else {
        this.saveFullListStorage();
        this.genId();
      }
    }

    this.hasStoredRings = function() {
      return window.localStorage.length !== 0 ? true: false
    }

    this.loadStorage = function() {

      let ringList = JSON.parse(window.localStorage.getItem('ringList'));
      this.idIndex = JSON.parse(window.localStorage.getItem('idIndex'));
      this.selectedRing = JSON.parse(window.localStorage.getItem('selectedRing'));

      this.ringList = ringList;

      this.loadAllInnerRings(ringList);
    }

    this.loadAllInnerRings = function(ringList) {
      this.clearInnerRings();
      ringList.forEach(({title, id, innerRings}) => {
        if (id == this.selectedRing) {
          {
            innerRings.forEach((innerRing) => {
              this.loadInnerRing(innerRing);
            })
          }
          this.title = title;
        } 
      })

    }

    this.saveFullListStorage = function() {
      window.localStorage.setItem('ringList', JSON.stringify(this.ringList))
      window.localStorage.setItem('idIndex', JSON.stringify(this.idIndex))
      window.localStorage.setItem('selectedRing', JSON.stringify(this.selectedRing))
    }

    this.storeInnerRings = function() {
      let ringList = JSON.parse(window.localStorage.getItem('ringList'));

      let adjustedRingList = ringList.map((ring) => {
        if (ring.id === this.id){
          return {...ring, innerRings: this.innerRings};
        }
        else return ring
      })

      this.ringList = adjustedRingList;
      console.log(ringList, adjustedRingList)
      window.localStorage.setItem('ringList', JSON.stringify(adjustedRingList));

    }

    this.addNewRing = function(){
      this.idIndex++;
      this.ringList.push({id: this.idIndex, title: "placeholder title", innerRings: []});
      this.loadRingTitleButtons(this.ringList)
      console.log(this)
      this.saveFullListStorage();
    }

    this.loadRingTitleButtons = function(ringList) {
      let newRingGroup = document.getElementById('newRingGroup')
      let ringButton1 = document.getElementById('ringid_1');


      while(newRingGroup.children.length >1){
        newRingGroup.removeChild(newRingGroup.lastChild);
      }

      ringList.forEach(({id, title, innerRings}) => {
        if (id !== 1){
          let newButton = ringButton1.cloneNode(true);
          newButton.id = `ringid_${id}`
          ringButton1.insertAdjacentElement('afterend',newButton);

        }
      })

      this.attachRingButtonListeners();

    }

    this.loadSelectedRing = function(ringId) {
      this.selectedRing = ringId;
      this.id = ringId;
      this.loadAllInnerRings(this.ringList);
    }



    this.clearInnerRings = function() {
      let outerRing = document.querySelector("#oring");
      while (outerRing.firstChild && outerRing.firstChild.id !== 'iring') {
        outerRing.removeChild(outerRing.firstChild);
    }
    }

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

    this.attachListeners = function() {
      this.attachNewRingListener();
      this.attachDocListeners();
      this.attachInnerRingListeners();
      this.attachClearStorageListener();
      this.attachRingButtonListeners();
    }

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

    this.attachNewRingListener = function() {
      let newRing = document.getElementById('newring');
      newRing.addEventListener('click', (e) => {
        e.preventDefault();
        this.addNewRing();
      })
    }

    this.attachRingButtonListeners = function() {
      let ringListButtons = document.querySelectorAll('.ringlistbutton')

      ringListButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          this.loadSelectedRing(button.id.slice(-1))
        })
      })


  }


    this.attachClearStorageListener = function() {
      document.getElementById('clear').addEventListener('click', (e) => {
        e.preventDefault();
       localStorage.clear();
        window.location.reload();
        console.log('storage cleared!', localStorage)

      })
    }

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

    this.findDiam = (posX, posY) => Math.sqrt(posX**2 + posY**2)*2



  }



}