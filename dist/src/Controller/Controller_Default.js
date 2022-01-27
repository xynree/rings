export default class Controller_Default {
    constructor(View) {
        this.loadDefaults = (attachRingTitleButtonListener, loadDisplayedTitle) => {
            this.styleDefaultRingButton();
            this.loadDefaultRingTitleButtonListener(attachRingTitleButtonListener, loadDisplayedTitle);
        };
        this.loadDefaultRingTitleButtonListener = (attachRingTitleButtonListener, loadDisplayedTitle) => {
            let ringListButton = document.querySelector('.ringlistbutton');
            ringListButton.addEventListener('click', (e) => {
                attachRingTitleButtonListener(parseInt(ringListButton.id.slice(7)), e, loadDisplayedTitle);
            });
        };
        this.styleDefaultRingButton = () => {
            let ringListButton = document.querySelector('.ringlistbutton');
            View.styleBackground(ringListButton, "white");
        };
    }
}
//# sourceMappingURL=Controller_Default.js.map