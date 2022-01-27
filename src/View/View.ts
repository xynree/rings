import View_InnerRings, { View_InnerRingsType } from './View_InnerRings.js'
import View_Default, { View_DefaultType } from './View_Default.js'
import View_RingTitleButtons, {View_RingTitleButtonsType} from './View_RingTitleButtons.js'

export interface ViewType {
  color: string;
  colorList: string[];

  innerRings: View_InnerRingsType;
  ringTitleButtons: View_RingTitleButtonsType;
  default: View_DefaultType;
  styleBackground: (elem:HTMLElement, color:string) => void;
}

export default class View implements ViewType {
  color: string;
  colorList: string[];


  innerRings: View_InnerRingsType;
  ringTitleButtons: View_RingTitleButtonsType;
  default: View_DefaultType;
  styleBackground: (elem:HTMLElement, color:string) => void;

  constructor() {
    this.colorList=['slate', 'stone', 'red', 'orange', 'amber', 'lime', 'emerald', 'teal', 'sky', 'indigo', 'purple', 'fuchsia', 'rose'];
    this.color = 'amber';
  

    this.innerRings = new View_InnerRings(this.color);
    this.ringTitleButtons = new View_RingTitleButtons();
    this.default = new View_Default(this.color);
    this.styleBackground = (elem, color) => elem.style.background = color
  }


}