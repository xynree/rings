import Model_Storage from './Model_Storage.js';
import Model_ViewCommands from './Model_ViewCommands.js';
export default class Model {
    constructor(View) {
        this.viewCommands = new Model_ViewCommands(View);
        this.selectedId = 1;
        this.textList = [];
        this.selectedTextId = this.textList.length > 0 ? this.textList[this.textList.length - 1].textId : 0;
        this.selectedTitle = "Ring Title";
        this.ringList = [
            { id: 1, title: "Ring Title", innerRings: [] },
        ];
        this.storage = new Model_Storage();
        this.addNewInnerRingToRingList = (val) => {
            this.ringList.forEach(({ id, innerRings }) => {
                if (id === this.selectedId) {
                    innerRings.push(val);
                }
            });
        };
        this.addNewRingToRingListFromSelectedId = (id) => {
            this.ringList.push({
                id: id,
                title: "New Ring",
                innerRings: [],
            });
        };
        this.resetModelToDefault = () => {
            this.selectedId = 1;
            this.selectedTitle = "Ring Title";
            this.ringList = [
                { id: 1, title: "Ring Title", innerRings: [] },
            ];
        };
    }
}
//# sourceMappingURL=Model.js.map