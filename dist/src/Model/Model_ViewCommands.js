export default class Model_ViewCommands {
    constructor(View) {
        this.loadAllSelectedInnerRingsToDOM = function (ringList, selectedId) {
            ringList.forEach(({ title, id, innerRings }) => {
                if (id === selectedId) {
                    innerRings.forEach((value) => {
                        View.innerRings.addInnerRing(value);
                    });
                }
            });
        };
        this.loadRingTitleButtonsToDOM = function (ringList) {
            ringList.forEach(({ id }) => {
                if (id !== 1) {
                    View.ringTitleButtons.addRingTitleButton(id);
                }
            });
        };
    }
}
//# sourceMappingURL=Model_ViewCommands.js.map