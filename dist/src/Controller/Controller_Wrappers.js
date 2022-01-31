export default class Controller_Wrappers {
    constructor(Model, View) {
        this.saveAllStorageWrapper = (func) => {
            return function () {
                func.apply(this, ...arguments);
                Model.Storage.saveAllStorage(Model.ringList, Model.selectedId, View.color);
                console.log('the wrapper was applied!');
            };
        };
        this.resetModelViewWrapper = (func) => {
            return function () {
                func.apply(this, ...arguments);
                Model.Storage.clearStorage();
                Model.resetModelToDefault();
                View.InnerRings.clearInnerRings();
                View.RingTitleButtons.clearRingTitleButtons();
            };
        };
    }
}
//# sourceMappingURL=Controller_Wrappers.js.map