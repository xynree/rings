export default class View_RingTitleButtons {
    constructor() {
        this.addRingTitleButton = (id) => {
            let newRingGroup = document.getElementById("newRingGroup");
            let newRingButtonGroup = document.getElementById('ringid_1').cloneNode(true);
            newRingButtonGroup.classList.add('ringtitlebuttongroup');
            newRingButtonGroup.lastElementChild.classList.remove('invisible');
            newRingButtonGroup.id = `ringid_${id}`;
            newRingGroup.appendChild(newRingButtonGroup);
        };
        this.clearRingTitleButtons = function () {
            let newRingGroup = document.getElementById("newRingGroup");
            while (newRingGroup.children.length > 1) {
                newRingGroup.removeChild(newRingGroup.lastChild);
            }
        };
        this.clearButton = (elem) => {
            elem.innerHTML = '';
            elem.remove();
        };
    }
}
//# sourceMappingURL=View_RingTitleButtons.js.map