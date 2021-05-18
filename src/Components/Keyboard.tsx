import * as React from "react";
import { KeyboardContainer } from "../Styles/App";
import { createKeys } from "./Utility/Utils";

function useStateRef(initialValue: any) {
  const [value, setValue] = React.useState(initialValue);

  const ref = React.useRef(value);

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return [value, setValue, ref];
}

interface KeyboardProps {
  setValue: Function;
}

const Keyboard: React.FC<KeyboardProps> = ({ setValue }) => {
  const [capsLock, setCapsLock, capsRef] = useStateRef(false);
  const [shift, setShift, shiftRef] = useStateRef(false);

  React.useEffect(() => {
    const container = document.getElementById("main");
    const keysContainer = document.createElement("div");
    keysContainer.setAttribute("id", "main_keyboard");
    keysContainer.classList.add("keyboard__keys");
    keysContainer?.appendChild(
      createKeys(setValue, capsRef, shiftRef, setShift, setCapsLock)
    );
    container?.appendChild(keysContainer);
    container?.classList.add("keyboard--hidden");
  }, []);

  return <KeyboardContainer id="main"></KeyboardContainer>;
};

export default Keyboard;
