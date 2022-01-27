export default class Model_ViewCommands {
    constructor(View) {
        this.loadAllSelectedInnerRingsToDOM = function (ringList, selectedId) {
            console.log('selectedId:', selectedId);
            ringList.forEach(({ id, innerRings }) => {
                if (id === selectedId) {
                    innerRings.forEach((value) => {
                        View.InnerRings.addInnerRing(value);
                    });
                }
            });
        };
        this.loadRingTitleButtonsToDOM = function (ringList) {
            ringList.forEach(({ id }) => {
                if (id !== 1) {
                    View.RingTitleButtons.addRingTitleButton(id);
                }
            });
        };
    }
}
//# sourceMappingURL=Model_ViewCommands.js.map