import Ring from './Ring.js'

export default class RingHandler extends Ring {

  constructor(id){
    super(id);
    this.handlerSetup = function() {
      this.attachListeners();

      if (this.hasStoredRings()){
        this.loadStorage();
      } else {
        this.saveFullListStorage();
      }
    }



    this.hasStoredRings = function() {
      return window.localStorage.length !== 0 ? true: false
    }

    this.loadStorage = function() {

      let savedRings = JSON.parse(window.localStorage.getItem('savedRings'));
      this.idIndex = JSON.parse(window.localStorage.getItem('idIndex'));
      this.selectedRing = JSON.parse(window.localStorage.getItem('selectedRing'));

      this.ringList = savedRings;

      savedRings.forEach(({title, id, ringList}) => {
        if (id === this.selectedRing) {
          {
            ringList.forEach((value) => {
              this.loadInnerRing(value);
            })
          }
          this.title = title;
        } 
      })
    }



    this.saveFullListStorage = function() {
      window.localStorage.setItem('savedRings', JSON.stringify(this.ringList))
    }


    this.addNewRing = function(){
      this.idIndex++;
      let newRing = new Ring(this.idIndex);
      this.selectedRing = this.idIndex;
      this.newRingButton();
      this.ringList.push({id: newRing.id, title: newRing.title, ringList: newRing.innerRings});
      console.log(this)
    }



    this.newRingButton = function() {
      let ringButton1 = document.getElementById('ringid_1');
      let newButton = ringButton1.cloneNode(true);
      newButton.id = `ringid_${this.idIndex}`
      ringButton1.insertAdjacentElement('afterend',newButton);
    }


    this.ringList = [{id:this.id, title:this.title, ringList: this.innerRings}];

    this.selectedRing = 1;
    this.idIndex = 1;

    this.attachListeners = function() {
      this.attachNewRingListener();
      this.attachDocListeners();
      this.attachInnerRingListeners();
      this.attachClearStorageListener();
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

    this.attachClearStorageListener = function() {
      document.getElementById('clear').addEventListener('click', (e) => {
        e.preventDefault();
       localStorage.clear();
        console.log('storage cleared!', localStorage)
      })
    }

  }

}