import * as React from "react";
import styled from "styled-components";

interface ProgressBarContainerProps {
  progressBarWidth: number;
}

const ProgressBarContainer = styled.div<ProgressBarContainerProps>`
  display: flex;
  width: ${(props) => `${props.progressBarWidth}px`};
  height: 50px;
  background-color: grey;
`;

interface ProgressBarCompProps {
  percentage: number;
  progressBarColor: string;
}

const ProgressBarComp = styled.div<ProgressBarCompProps>`
  display: flex;
  width: ${(props) => `${props.percentage * 5}px`};
  background-color: ${(props) => props.progressBarColor};
`;

interface ProgressBarProps {
  progressBarColor: string;
  percentage: number;
  progressBarWidth: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progressBarColor,
  percentage,
  progressBarWidth,
}) => {
  return (
    <ProgressBarContainer progressBarWidth={progressBarWidth}>
      <ProgressBarComp
        percentage={percentage}
        progressBarColor={progressBarColor}
      />
    </ProgressBarContainer>
  );
};

export default ProgressBar;
