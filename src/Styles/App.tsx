import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

export const KeyboardContainer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 5px 0;
  background: #696969;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
  user-select: none;
  transition: bottom 0.4s;

  .keyboard__key {
    height: 45px;
    width: 6%;
    max-width: 90px;
    margin: 3px;
    border-radius: 4px;
    border: none;
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    font-size: 1.05rem;
    outline: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: top;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
    position: relative;
  }

  .keyboard__key:active {
    background: rgba(255, 255, 255, 0.12);
  }

  .keyboard__key--wide {
    width: 20%;
  }

  .keyboard__key--extra-wide {
    width: 36%;
    max-width: 500px;
  }

  .keyboard__keys {
    text-align: center;
  }

  &.keyboard--hidden {
    bottom: -100%;
  }

  .keyboard__key--activatable::after {
    content: "";
    top: 10px;
    right: 10px;
    position: absolute;
    width: 8px;
    height: 8px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 50%;
  }

  .keyboard__key--active::after {
    background: #08ff00;
  }
`;

export const StyledTextArea = styled.textarea`
  margin-top: 50px;
`;
