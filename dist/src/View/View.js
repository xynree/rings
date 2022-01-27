import View_InnerRings from './View_InnerRings.js';
import View_Default from './View_Default.js';
import View_RingTitleButtons from './View_RingTitleButtons.js';
export default class View {
    constructor() {
        this.colorList = ['slate', 'stone', 'red', 'orange', 'amber', 'lime', 'emerald', 'teal', 'sky', 'indigo', 'purple', 'fuchsia', 'rose'];
        this.color = 'amber';
        this.InnerRings = new View_InnerRings(this.color);
        this.RingTitleButtons = new View_RingTitleButtons();
        this.Default = new View_Default(this.color);
        this.styleBackground = (elem, color) => elem.style.background = color;
    }
}
//# sourceMappingURL=View.js.map