export default class Model_Storage {
    constructor() {
        this.hasStoredRings = () => window.localStorage.length !== 0 ? true : false;
        this.hasColor = () => window.localStorage.getItem('color') ? true : false;
        this.loadSelectedIdFromStorage = () => {
            return JSON.parse(window.localStorage.getItem("selectedId"));
        };
        this.loadColorFromStorage = () => {
            return window.localStorage.getItem('color');
        };
        this.loadRingListFromStorage = () => {
            return JSON.parse(window.localStorage.getItem("ringList"));
        };
        this.loadText = () => {
            return JSON.parse(window.localStorage.getItem('textList'));
        };
        this.saveText = (textNodeList) => {
            window.localStorage.setItem('textList', JSON.stringify(textNodeList));
            console.log(localStorage);
        };
        this.saveAllStorage = (ringList, selectedId, color) => {
            window.localStorage.setItem("ringList", JSON.stringify(ringList));
            window.localStorage.setItem("selectedId", JSON.stringify(selectedId));
            window.localStorage.setItem('color', color);
            // console.log('Storage Saved!', localStorage)
        };
        this.saveColor = (color) => {
            window.localStorage.setItem('color', color);
        };
        this.clearStorage = () => {
            localStorage.clear();
            window.location.reload();
        };
    }
}
//# sourceMappingURL=Model_Storage.js.map