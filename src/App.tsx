import React from "react";
import Keyboard from "./Components/Keyboard";
import "./index.css";
import { MainContainer, StyledTextArea } from "./Styles/App";

function App() {
  const [value, setValue] = React.useState("");

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
      <Keyboard setValue={setValue} />
    </MainContainer>
  );
}

export default App;
