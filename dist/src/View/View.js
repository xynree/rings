import View_InnerRings from './View_InnerRings.js';
import View_RingTitleButtons from './View_RingTitleButtons.js';
import View_Default from './View_Default.js';
export default class View {
    constructor() {
        this.innerRings = new View_InnerRings();
        this.ringTitleButtons = new View_RingTitleButtons();
        this.default = new View_Default('amber');
        this.styleBackground = (elem, color) => elem.style.background = color;
    }
}
//# sourceMappingURL=View.js.map