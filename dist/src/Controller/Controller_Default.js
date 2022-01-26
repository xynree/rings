export default class Controller_Default {
    constructor(View) {
        this.loadDefaults = (attachRingTitleButtonListener) => {
            this.styleDefaultRingButton();
            this.loadDefaultRingTitleButtonListener(attachRingTitleButtonListener);
        };
        this.loadDefaultRingTitleButtonListener = (attachRingTitleButtonListener) => {
            let ringListButton = document.querySelector('.ringlistbutton');
            ringListButton.addEventListener('click', (e) => {
                attachRingTitleButtonListener(parseInt(ringListButton.id.slice(7)), e);
            });
        };
        this.styleDefaultRingButton = () => {
            let ringListButton = document.querySelector('.ringlistbutton');
            View.styleBackground(ringListButton, "white");
        };
    }
}
//# sourceMappingURL=Controller_Default.js.map