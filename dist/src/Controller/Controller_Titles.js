export default class Controller_Titles {
    constructor(Model, View) {
        this.attachDisplayedTitleListener = (loadRingListButtonTitles) => {
            let node = document.getElementById('textdisplaytitle');
            node.addEventListener("keydown", (e) => {
                if (e.code === "Enter") {
                    console.log('you pressd enter', e.target.value);
                    Model.ringList.forEach((ring) => {
                        if (ring.id === Model.selectedId) {
                            console.log(e.target.value);
                            ring.title = e.target.value;
                            Model.storage.saveAllStorage(Model.ringList, Model.selectedId, View.color);
                        }
                    });
                    node.blur();
                    loadRingListButtonTitles();
                }
            });
        };
        this.loadDisplayedTitle = () => {
            let index = Model.ringList.findIndex((ring) => ring.id === Model.selectedId);
            if (~index) {
                document.getElementById('textdisplaytitle').value = Model.ringList[index].title;
            }
        };
    }
}
//# sourceMappingURL=Controller_Titles.js.map