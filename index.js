import RingHandler  from '/RingHandler.js'

function render() {
  let defRing = new RingHandler(1);
  defRing.setup();

}

document.addEventListener("DOMContentLoaded", (event) => {
  render();
});
