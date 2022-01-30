import View_InnerRings from './View_InnerRings.js'
import View_Default from './View_Default.js'
import View_RingTitleButtons from './View_RingTitleButtons.js'
import {ViewType, View_RingTitleButtonsType, View_DefaultType, View_InnerRingsType} from '../Types/Types.js'


export default class View implements ViewType {

  Default: View_DefaultType;
  InnerRings: View_InnerRingsType;
  RingTitleButtons: View_RingTitleButtonsType;

  colorList: string[];
  color: string;

  constructor() {
    this.Default = new View_Default(this.color);
    this.InnerRings = new View_InnerRings(this.color);
    this.RingTitleButtons = new View_RingTitleButtons();

    this.colorList = ['slate', 'stone', 'red', 'orange', 'amber', 'lime', 'emerald', 'teal', 'sky', 'indigo', 'purple', 'fuchsia', 'rose'];
    this.color = 'amber';
  }


}