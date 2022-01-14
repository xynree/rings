import RingSkeleton  from '/RingSkeleton.js'


function render() {
  let idcounter=0;
  let defRing = new RingSkeleton(idcounter);

  defRing.setup();

}

document.addEventListener("DOMContentLoaded", (event) => {

  render();
});
