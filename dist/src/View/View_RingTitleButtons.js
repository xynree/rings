export default class View_RingTitleButtons {
    constructor() {
        this.addRingTitleButton = (id) => {
            let newRingGroup = document.getElementById("newRingGroup");
            let ringButton1 = document.getElementById('ringid_1');
            let newButton = ringButton1.cloneNode(true);
            newButton.classList.add('ringlistbutton');
            newButton.id = `ringid_${id}`;
            newRingGroup.appendChild(newButton);
        };
        this.clearRingTitleButtons = function () {
            let newRingGroup = document.getElementById("newRingGroup");
            while (newRingGroup.children.length > 1) {
                newRingGroup.removeChild(newRingGroup.lastChild);
            }
        };
        this.clearButton = (elem) => {
            elem.remove();
        };
    }
}
//# sourceMappingURL=View_RingTitleButtons.js.map