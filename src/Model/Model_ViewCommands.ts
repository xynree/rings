import { ring, ViewType, Model_ViewCommandsType } from "../Types/Types";

export default class Model_ViewCommands implements Model_ViewCommandsType {
  loadAllSelectedInnerRingsToDOM: (
    ringList: ring[],
    selectedId: number
  ) => void;
  loadRingTitleButtonsToDOM: (ringList: ring[]) => void;

  constructor(View: ViewType) {
    this.loadAllSelectedInnerRingsToDOM = (ringList, selectedId) =>
      ringList.forEach(({ id, innerRings }) =>
        id === selectedId
          ? innerRings.forEach((value) => View.InnerRings.addInnerRing(value))
          : ""
      );

    this.loadRingTitleButtonsToDOM = (ringList) =>
      ringList.forEach(({ id }) =>
        id !== 1 ? View.RingTitleButtons.addRingTitleButton(id) : ""
      );
  }
}
