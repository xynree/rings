export default class Controller_Default {
    constructor(View) {
        this.loadDefaults = (attachRingTitleButtonListener, loadDisplayedTitle) => {
            this.styleDefaultRingButton();
            this.loadDefaultRingTitleButtonListener(attachRingTitleButtonListener, loadDisplayedTitle);
        };
        this.loadDefaultRingTitleButtonListener = (attachRingTitleButtonListener, loadDisplayedTitle) => {
            let ringListButton = document.querySelector('#ringlistbutton');
            let id = parseInt(ringListButton.parentNode.id.slice(7));
            attachRingTitleButtonListener(ringListButton, id, loadDisplayedTitle);
        };
        this.styleDefaultRingButton = () => {
            let ringListButton = document.querySelector('#ringlistbutton');
            ringListButton.classList.add(View.Default.styles.highlight);
        };
    }
}
//# sourceMappingURL=Controller_Default.js.map