import React from "react";
import Keyboard from "./Components/Keyboard";
import ProgressBar from "./Components/ProgressBar";
import "./index.css";
import { MainContainer, StyledTextArea } from "./Styles/App";
import styled from "styled-components";

const StyledButton = styled.button`
  margin-top: 20px;
`;

function App() {
  const [value, setValue] = React.useState("");
  const [percentage1, setPercentage1] = React.useState(0);
  // const [percentage2, setPercentage2] = React.useState(0);

  // for (var i = 0; i < 10; i++) {
  //   setPercentage(i);
  // }

  // function trigger

  const inputBoxHandler = () => {
    const container = document.getElementById("main");
    container?.classList.remove("keyboard--hidden");
  };

  return (
    <MainContainer>
      <h1>Virtual Keyboard</h1>
      <ProgressBar
        progressBarColor="red"
        percentage={percentage}
        progressBarWidth={600}
      />
      <pg2 />
      <StyledButton onClick={() => setPercentage((prev) => prev + 5)}>
        Click here
      </StyledButton>
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
