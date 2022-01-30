export default class Controller_Default {
    constructor(View, attachRingTitleButtonListener, loadDisplayedTitle, refreshNodes) {
        this.loadDefaults = () => {
            this._styleDefaultRingButton();
            this._loadDefaultRingTitleButtonListener();
        };
        this._loadDefaultRingTitleButtonListener = () => {
            let ringListButton = document.querySelector('#ringlistbutton');
            let id = parseInt(ringListButton.parentNode.id.slice(7));
            attachRingTitleButtonListener(ringListButton, id);
        };
        this._styleDefaultRingButton = () => {
            let ringListButton = document.querySelector('#ringlistbutton');
            ringListButton.classList.add(View.Default.styles.highlight);
        };
    }
}
//# sourceMappingURL=Controller_Default.js.map