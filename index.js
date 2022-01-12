import RingHandler  from '/RingHandler.js'

function render() {
  let defRing = new RingHandler(1);
  defRing.handlerSetup();

  console.log(defRing);
}

document.addEventListener("DOMContentLoaded", (event) => {
  render();
});
