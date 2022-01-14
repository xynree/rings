class UIElements{
  constructor(){
    this.id = 

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
      this.attachRingButtonListeners();
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


  }
}