export default class Model_ViewCommands {
    constructor(View) {
        this.loadAllSelectedInnerRingsToDOM = (ringList, selectedId) => ringList.forEach(({ id, innerRings }) => id === selectedId
            ? innerRings.forEach((value) => View.InnerRings.addInnerRing(value))
            : "");
        this.loadRingTitleButtonsToDOM = (ringList) => ringList.forEach(({ id }) => id !== 1 ? View.RingTitleButtons.addRingTitleButton(id) : "");
    }
}
//# sourceMappingURL=Model_ViewCommands.js.map