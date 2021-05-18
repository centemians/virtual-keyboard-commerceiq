import { keyLayout } from "../../Constants/Keys";
import {
  backspaceKeyHandler,
  capsLockKeyHandler,
  doneKeyHandler,
  enterKeyHandler,
  normalKeyHandler,
  shiftKeyHandler,
  spaceBarKeyHandler,
  close,
} from "../../Utility/KeyboardUtils";

// Function for creating keyboard keys
export const createKeys = (
  setValue: Function,
  capsRef: any,
  shiftRef: any,
  setShift: Function,
  setCapsLock: Function
) => {
  const fragment = document.createDocumentFragment();

  keyLayout.forEach((key) => {
    const keyElement = document.createElement("button");
    const insertLineBreak =
      ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

    // Add attributes/classes
    keyElement.setAttribute("type", "button");
    keyElement.classList.add("keyboard__key");

    switch (key) {
      case "backspace":
        backspaceKeyHandler(keyElement, setValue);
        break;

      case "shift":
        shiftKeyHandler(keyElement, setShift, shiftRef);
        break;

      case "caps":
        capsLockKeyHandler(keyElement, capsRef, setCapsLock);
        break;

      case "enter":
        enterKeyHandler(keyElement, setValue);
        break;

      case "space":
        spaceBarKeyHandler(keyElement, setValue);
        break;

      case "done":
        doneKeyHandler(keyElement, close);
        break;

      default:
        normalKeyHandler(
          keyElement,
          capsRef,
          shiftRef,
          key,
          setValue,
          setShift
        );
        break;
    }

    fragment.appendChild(keyElement);

    if (insertLineBreak) {
      fragment.appendChild(document.createElement("br"));
    }
  });

  return fragment;
};
