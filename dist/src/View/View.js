import View_InnerRings from './View_InnerRings.js';
import View_RingTitleButtons from './View_RingTitleButtons.js';
import View_Default from './View_Default.js';
export default class View {
    constructor() {
        this.color = 'amber';
        this.colorList = ['amber', 'slate', 'blue'];
        this.innerRings = new View_InnerRings(this.color);
        this.ringTitleButtons = new View_RingTitleButtons();
        this.default = new View_Default(this.color);
        this.styleBackground = (elem, color) => elem.style.background = color;
    }
}
//# sourceMappingURL=View.js.map