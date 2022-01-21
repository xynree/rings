export default class Model_UpdateModel {
    constructor() {
        this.incrementSelectedId = (selectedId) => selectedId++;
        this.addNewInnerRingToRingList = (val, ringList, selectedId) => {
            ringList.forEach(({ id, innerRings }) => {
                if (id == selectedId) {
                    innerRings.push(val);
                }
            });
        };
        this.addNewRingToRingListFromSelectedId = (id, ringList) => {
            ringList.push({
                id: id,
                title: "placeholder title",
                innerRings: [],
            });
        };
        this.resetModelToDefault = (selectedId, selectedTitle, ringList) => {
            selectedId = 1;
            selectedTitle = "Ring Title";
            ringList = [
                { id: 1, title: "Ring Title", innerRings: [] },
            ];
        };
    }
}
//# sourceMappingURL=Model_UpdateModel.js.map