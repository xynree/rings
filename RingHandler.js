import Ring from './Ring.js'

export default class RingHandler extends Ring {

  constructor(id){
    super(id);

    this.ringList = [{id:this.id, title:this.title, innerRings: this.innerRings}];
    this.selectedRing = 1;
    this.idIndex = 1;

    this.setup = function() {
      this.attachListeners();
      if (this.hasStoredRings()){
        this.loadStorage();
        this.loadRingButtons(this.ringList);
      } else {
        this.saveFullListStorage();
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

      ringList.forEach(({title, id, innerRings}) => {
        if (id === this.selectedRing) {
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

      window.localStorage.setItem('ringList', JSON.stringify(adjustedRingList));

    }

    this.addNewRing = function(){
      this.idIndex++;
      let newRing = new Ring(this.idIndex);
      this.ringList.push({id: newRing.id, title: newRing.title, innerRings: newRing.innerRings});
      this.loadRingButtons(this.ringList)
      console.log(this)
      this.saveFullListStorage();
    }

    this.loadRingButtons = function(ringList) {
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

    }

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
        window.location.reload();
        console.log('storage cleared!', localStorage)

      })
    }

  }

}