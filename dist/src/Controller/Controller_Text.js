export default class Controller_Text {
    constructor(Model, View) {
        this.selectedTextId = 0;
        this.textNodeList = [];
        this.attachDblClickListener = () => {
            document.addEventListener('dblclick', (e) => {
                if (e.target.id !== 'oring' && e.target.id !== 'innerring')
                    return;
                this.removeOldNodes();
                let newTextNode = this.createNewNode(e.clientX, e.clientY);
                newTextNode.addEventListener('keydown', (d) => {
                    if (d.code === "Enter") {
                        this.selectedTextId++;
                        newTextNode.id = `${Model.selectedId}_${this.selectedTextId}`;
                        this.addNewTextNodeToTextList({ ringId: Model.selectedId, textId: this.selectedTextId, body: d.target.textContent, x: e.clientX, y: e.clientY });
                        newTextNode.blur();
                    }
                });
            });
        };
        this.addNewTextNodeToTextList = ({ ringId, textId, body, x, y }) => {
            this.textNodeList.push({ ringId, textId, body, x, y });
            console.log(this.textNodeList);
        };
        this.createNewNode = (x, y) => {
            let newTextNode = document.createElement('span');
            newTextNode.classList.add('ringtext', 'p-2', 'absolute', 'min-w-4', 'h-8', 'focus:outline', 'focus:outline-slate-800', 'focus:bg-slate-50', 'bg-transparent', 'focus:ring-stone-900', 'hover:bg-slate-50', 'text-base');
            newTextNode.style.left = `${x}px`;
            newTextNode.style.top = `${y}px`;
            newTextNode.setAttribute('draggable', 'true');
            newTextNode.setAttribute('contenteditable', '');
            document.body.appendChild(newTextNode);
            newTextNode.focus();
            return newTextNode;
        };
        this.removeOldNodes = () => {
            let oldNodes = document.querySelectorAll('.ringtext');
            oldNodes.forEach((node) => {
                if (!node.id) {
                    node.remove();
                }
            });
        };
    }
}
//# sourceMappingURL=Controller_Text.js.map