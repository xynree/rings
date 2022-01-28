export default class Controller_Text {
    constructor(Model, View) {
        this.loadTextNodes = () => {
            if (!Model.textList || Model.textList.length < 1)
                return;
            let loadList = Model.textList.filter((textNode) => textNode.ringId === Model.selectedId);
            loadList.forEach(({ body, x, y }) => {
                let newNode = this.createNewNode(x, y, body);
                newNode.id = `${Model.selectedId}_${Model.selectedTextId}`;
                this.attachTextListener(newNode, x, y);
                newNode.blur();
            });
        };
        this.attachTextListener = (elem, x, y) => {
            elem.addEventListener('click', (f) => {
                if (f.target.hasAttribute('id')) {
                    Model.selectedTextId = parseInt(f.target.id.slice(2));
                }
            });
            elem.addEventListener('keydown', (d) => {
                if (d.code === "Enter") {
                    console.log('enter was pressed', d.target, d.target.hasAttribute('id'));
                    if (d.target.hasAttribute('id')) {
                        this.updateTextNode(d.target.textContent, Model.selectedId, parseInt(d.target.id.slice(2)));
                        console.log('updatedTextNode', Model.textList, parseInt(d.target.id.slice(2)));
                        Model.storage.saveText(Model.textList);
                        elem.blur();
                    }
                    else {
                        Model.selectedTextId = Model.textList.length > 0 ? Model.textList[Model.textList.length - 1].textId + 1 : 1;
                        elem.id = `${Model.selectedId}_${Model.selectedTextId}`;
                        this.addNewTextNodeToTextList({ ringId: Model.selectedId, textId: Model.selectedTextId, body: d.target.textContent, x, y });
                        elem.blur();
                        console.log(Model.textList);
                    }
                }
            });
            return elem;
        };
        this.attachDblClickListener = () => {
            document.addEventListener('dblclick', (e) => {
                if (e.target.id !== 'oring' && e.target.id !== 'innerring')
                    return;
                this.removeOldNodes();
                let newTextNode = this.createNewNode(e.clientX, e.clientY, '');
                this.attachTextListener(newTextNode, e.clientX, e.clientY);
            });
        };
        this.updateTextNode = (text, ringId, textId) => {
            Model.textList.forEach((node) => {
                if (node.ringId === ringId && node.textId === textId) {
                    node.body = text;
                }
            });
        };
        this.addNewTextNodeToTextList = ({ ringId, textId, body, x, y }) => {
            Model.textList.push({ ringId, textId, body, x, y });
            Model.storage.saveText(Model.textList);
        };
        this.createNewNode = (x, y, innerText = '') => {
            let newTextNode = document.createElement('span');
            newTextNode.classList.add('ringtext', 'p-2', 'absolute', 'min-w-4', 'h-8', 'focus:outline', `focus:outline-${View.color}-800`, `focus:bg-${View.color}-50`, 'bg-transparent', 'focus:ring-stone-900', `${View.Default.styles.hover}`, `${View.Default.styles.text2}`, 'text-base');
            newTextNode.style.left = `${x}px`;
            newTextNode.style.top = `${y}px`;
            newTextNode.setAttribute('draggable', 'true');
            newTextNode.setAttribute('contenteditable', '');
            newTextNode.innerText = innerText;
            document.body.appendChild(newTextNode);
            newTextNode.focus();
            return newTextNode;
        };
        this.removeOldNodes = () => {
            let oldNodes = document.querySelectorAll('.ringtext');
            if (!oldNodes)
                return;
            oldNodes.forEach((node) => {
                console.log((node.id.slice(0, 1)));
                if (!node.id || parseInt(node.id.slice(0, 1)) !== Model.selectedId) {
                    node.remove();
                }
            });
        };
    }
}
//# sourceMappingURL=Controller_Text.js.map