import React from "react";
import "./index.css";
import { KeyboardContainer, MainContainer, StyledTextArea } from "./Styles/App";
import { keyLayout } from "./Utility/utils";

function useStateRef(initialValue: any) {
  const [value, setValue] = React.useState(initialValue);

  const ref = React.useRef(value);

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return [value, setValue, ref];
}

function App() {
  const [value, setValue] = React.useState("");
  const [capsLock, setCapsLock, capsRef] = useStateRef(false);
  const [shift, setShift, shiftRef] = useStateRef(false);
  const onShiftKeyLayout = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];

  function close() {
    setValue("");
    const container = document.getElementById("main");
    container?.classList.add("keyboard--hidden");
  }

  function toggleCapsLock() {
    const keys: any = document.querySelectorAll(".keyboard__key");
    for (const key of keys) {
      if (key.childElementCount === 0) {
        key.textContent = !capsRef.current
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  }

  function toggleShift() {
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
  }

  const shiftHandler = (keyElement: any) => {
    setShift((prevValue: any) => {
      return !prevValue;
    });
    keyElement.classList.toggle("keyboard__key--active", !shiftRef.current);
    toggleShift();
  };

  function createKeys() {
    const fragment = document.createDocumentFragment();
    // Creates HTML for an icon
    const createIconHTML = (icon_name: any) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayout.forEach((key) => {
      const keyElement = document.createElement("button");
      const insertLineBreak =
        ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            setValue((prevValue) => {
              return prevValue.substring(0, prevValue.length - 1);
            });
          });

          break;

        case "shift":
          keyElement.setAttribute("id", "shift__key");
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--activatable"
          );
          keyElement.innerHTML = createIconHTML("north");
          keyElement.addEventListener("click", () => shiftHandler(keyElement));

          break;

        case "caps":
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--activatable"
          );
          keyElement.innerHTML = createIconHTML("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            setCapsLock((prevValue: any) => {
              return !prevValue;
            });
            keyElement.classList.toggle(
              "keyboard__key--active",
              !capsRef.current
            );
            toggleCapsLock();
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            setValue((prevValue) => prevValue + "\n");
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            setValue((prevValue) => prevValue + " ");
          });

          break;

        case "done":
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--dark"
          );
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            close();
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener("click", () => {
            setValue((prevValue) => {
              if (
                capsRef.current ||
                (shiftRef.current && isNaN(parseInt(key)))
              ) {
                prevValue += key.toUpperCase();
              } else if (shiftRef.current && !isNaN(parseInt(key))) {
                const shiftKeylayoutIndex =
                  parseInt(key) > 0 ? parseInt(key) - 1 : 9;
                prevValue += onShiftKeyLayout[shiftKeylayoutIndex];
              } else if (!capsRef.current) {
                prevValue += key.toLowerCase();
              }
              return prevValue;
            });
            if (shiftRef.current) {
              shiftHandler(document.getElementById("shift__key"));
            }
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  }

  React.useEffect(() => {
    const container = document.getElementById("main");
    const keysContainer = document.createElement("div");
    keysContainer.classList.add("keyboard__keys");
    keysContainer?.appendChild(createKeys());
    container?.appendChild(keysContainer);
    container?.classList.add("keyboard--hidden");
  }, []);

  const inputBoxHandler = () => {
    const container = document.getElementById("main");
    container?.classList.remove("keyboard--hidden");
  };

  return (
    <MainContainer>
      <h1>Virtual Keyboard</h1>
      <StyledTextArea
        rows={4}
        cols={50}
        value={value}
        placeholder="Click here to get virtual keyboard!"
        onFocus={inputBoxHandler}
      ></StyledTextArea>
      <KeyboardContainer id="main"></KeyboardContainer>
    </MainContainer>
  );
}

export default App;
