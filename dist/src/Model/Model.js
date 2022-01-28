import Model_Storage from './Model_Storage.js';
import Model_ViewCommands from './Model_ViewCommands.js';
export default class Model {
    constructor(View) {
        this.ViewCommands = new Model_ViewCommands(View);
        this.Storage = new Model_Storage();
        this.textList = [];
        this.ringList = [{ id: 1, title: "Ring Title", innerRings: [] }];
        this.selectedId = 1;
        this.selectedTextId = this.textList.length > 0 ? this.textList[this.textList.length - 1].textId : 1;
        this.addNewInnerRingToRingList = (val) => {
            this.ringList.forEach(({ id, innerRings }) => {
                id === this.selectedId ? innerRings.push(val) : '';
            });
        };
        this.addNewRingToRingListFromSelectedId = (id) => {
            this.ringList.push({
                id,
                title: "New Ring",
                innerRings: [],
            });
        };
        this.resetModelToDefault = () => {
            this.selectedId = 1;
            this.ringList = [
                { id: 1, title: "Ring Title", innerRings: [] },
            ];
        };
    }
}
//# sourceMappingURL=Model.js.map