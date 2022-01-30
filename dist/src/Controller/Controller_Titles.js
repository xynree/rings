export default class Controller_Titles {
    constructor(Model, View) {
        this.loadDisplayedTitle = () => {
            const { index, title } = this._findSelectedModelIndexAndTitle();
            ~index ? document.getElementById('textdisplaytitle').value = title : '';
        };
        this.attachDisplayedTitleListener = (loadRingListButtonTitles) => {
            document.getElementById('textdisplaytitle').addEventListener("keydown", (e) => {
                if (e.code === "Enter") {
                    this._updateTitle(e);
                    document.getElementById('textdisplaytitle').blur();
                    loadRingListButtonTitles();
                }
            });
        };
        this._updateTitle = (e) => {
            Model.ringList.forEach((ring) => {
                if (ring.id === Model.selectedId) {
                    ring.title = e.target.value;
                    Model.Storage.saveAllStorage(Model.ringList, Model.selectedId, View.color);
                }
            });
        };
        this._findSelectedModelIndexAndTitle = () => {
            let index = Model.ringList.findIndex((ring) => ring.id === Model.selectedId);
            return { index, title: Model.ringList[index].title };
        };
    }
}
//# sourceMappingURL=Controller_Titles.js.map