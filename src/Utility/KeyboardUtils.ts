import { alphabetsIndex, keyLayout, onShiftKeyLayout } from "../Constants/Keys";
import { insertAt, shuffle } from "./utils";

// Function for shuffling keyboard keys
export const shuffleKeyboardKeys = () => {
  const keyboardContainer = document.getElementById("main_keyboard");
  const allKeys: any = keyboardContainer?.childNodes;

  const shuffledAlphabetsIndex = shuffle(alphabetsIndex);
  const newDomStructure = [] as any;

  for (let i = 0; i < shuffledAlphabetsIndex.length; i++) {
    newDomStructure.push(allKeys[shuffledAlphabetsIndex[i]]);
  }

  for (let i = 0; i < 49; i++) {
    if (alphabetsIndex.indexOf(i) < 0) {
      insertAt(newDomStructure, i, allKeys[i]);
    }
  }

  //@ts-ignore
  keyboardContainer?.replaceChildren(...newDomStructure);
};

// Function for closing keyboard
export const close = (setValue: Function) => {
  setValue(() => "");
  const container = document.getElementById("main");
  container?.classList.add("keyboard--hidden");
};

// Function for handling caps lock toggle
export const toggleCapsLock = (capsRef: any) => {
  const keys: any = document.querySelectorAll(".keyboard__key");
  for (const key of keys) {
    if (key.childElementCount === 0) {
      key.textContent = !capsRef.current
        ? key.textContent.toUpperCase()
        : key.textContent.toLowerCase();
    }
  }
};

// Function for handling shift toggle
export const toggleShift = (shiftRef: any) => {
  const keys: any = document.querySelectorAll(".keyboard__key");
  for (const key of keys) {
    if (key.childElementCount === 0) {
      if (!shiftRef.current && !isNaN(parseInt(key.textContent))) {
        const shiftKeylayoutIndex =
          parseInt(key.textContent) > 0 ? parseInt(key.textContent) - 1 : 9;
        key.textContent = onShiftKeyLayout[shiftKeylayoutIndex];
      } else if (!shiftRef.current) {
        key.textContent = key.textContent.toUpperCase();
      } else {
        const index = onShiftKeyLayout.findIndex(
          (symbol) => symbol === key.textContent
        );
        if (index >= 0) {
          key.textContent = index < 9 ? index + 1 : 0;
        } else {
          key.textContent = key.textContent.toLowerCase();
        }
      }
    }
  }
};

export const shiftHandler = (
  keyElement: any,
  setShift: Function,
  shiftRef: any
) => {
  setShift((prevValue: any) => {
    return !prevValue;
  });
  keyElement.classList.toggle("keyboard__key--active", !shiftRef.current);
  toggleShift(shiftRef);
};

// Function for creating HTML icon.
export const createIconHTML = (icon_name: any) => {
  return `<i class="material-icons">${icon_name}</i>`;
};

// Function for handling backspace key logic
export const backspaceKeyHandler = (
  keyElement: HTMLButtonElement,
  setValue: Function
) => {
  keyElement.classList.add("keyboard__key--wide");
  keyElement.innerHTML = createIconHTML("backspace");

  keyElement.addEventListener("click", () => {
    setValue((prevValue: string) => {
      return prevValue.substring(0, prevValue.length - 1);
    });
    shuffleKeyboardKeys();
  });
};

// Function for handling shift key logic
export const shiftKeyHandler = (
  keyElement: HTMLButtonElement,
  setShift: Function,
  shiftRef: any
) => {
  keyElement.setAttribute("id", "shift__key");
  keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
  keyElement.innerHTML = createIconHTML("north");
  keyElement.addEventListener("click", () => {
    shiftHandler(keyElement, setShift, shiftRef);
    shuffleKeyboardKeys();
  });
};

// Function for handling capslock key logic
export const capsLockKeyHandler = (
  keyElement: HTMLButtonElement,
  capsRef: any,
  setCapsLock: Function
) => {
  keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
  keyElement.innerHTML = createIconHTML("keyboard_capslock");

  keyElement.addEventListener("click", () => {
    setCapsLock((prevValue: any) => {
      return !prevValue;
    });
    keyElement.classList.toggle("keyboard__key--active", !capsRef.current);
    toggleCapsLock(capsRef);
    shuffleKeyboardKeys();
  });
};

// Function for handling enter key logic
export const enterKeyHandler = (
  keyElement: HTMLButtonElement,
  setValue: Function
) => {
  keyElement.classList.add("keyboard__key--wide");
  keyElement.innerHTML = createIconHTML("keyboard_return");

  keyElement.addEventListener("click", () => {
    setValue((prevValue: string) => prevValue + "\n");
    shuffleKeyboardKeys();
  });
};

// Function for handling spacebar key logic
export const spaceBarKeyHandler = (
  keyElement: HTMLButtonElement,
  setValue: Function
) => {
  keyElement.classList.add("keyboard__key--extra-wide");
  keyElement.innerHTML = createIconHTML("space_bar");

  keyElement.addEventListener("click", () => {
    setValue((prevValue: string) => prevValue + " ");
    shuffleKeyboardKeys();
  });
};

// Function for handling done key logic
export const doneKeyHandler = (
  keyElement: HTMLButtonElement,
  setValue: Function
) => {
  keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
  keyElement.innerHTML = createIconHTML("check_circle");

  keyElement.addEventListener("click", () => {
    close(setValue);
  });
};

// Function for handling other keys logic
export const normalKeyHandler = (
  keyElement: HTMLButtonElement,
  capsRef: any,
  shiftRef: any,
  key: string,
  setValue: Function,
  setShift: Function
) => {
  keyElement.textContent = key.toLowerCase();
  keyElement.addEventListener("click", () => {
    setValue((prevValue: any) => {
      if (capsRef.current || (shiftRef.current && isNaN(parseInt(key)))) {
        prevValue += key.toUpperCase();
      } else if (shiftRef.current && !isNaN(parseInt(key))) {
        const shiftKeylayoutIndex = parseInt(key) > 0 ? parseInt(key) - 1 : 9;
        prevValue += onShiftKeyLayout[shiftKeylayoutIndex];
      } else if (!capsRef.current) {
        prevValue += key.toLowerCase();
      }
      return prevValue;
    });
    if (shiftRef.current) {
      shiftHandler(document.getElementById("shift__key"), setShift, shiftRef);
    }
    shuffleKeyboardKeys();
  });
};
