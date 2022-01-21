import Model from './src/Model/Model.js';
import View from './src/View/View.js';
import Controller from './src/Controller/Controller.js';
function render() {
    let MyView = new View();
    let RingSkeleton = new Model(MyView);
    let MyController = new Controller(RingSkeleton, MyView);
    MyController.setup();
}
document.addEventListener("DOMContentLoaded", (event) => {
    render();
});
//# sourceMappingURL=index.js.map