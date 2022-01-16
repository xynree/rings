import Model from '/src/Model.js'
import View from '/src/View.js'
import Controller from '/src/Controller.js'


function render() {
  let MyView = new View();
  let RingSkeleton = new Model(MyView);
  let MyController = new Controller(RingSkeleton, MyView);

  MyController.setup();

}

document.addEventListener("DOMContentLoaded", (event) => {
  render();
});
