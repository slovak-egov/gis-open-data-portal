import styled from "styled-components";

const SpinnerContainer = styled.div(({}) => ({
  display: "inline-block",
  position: "relative",
  width: "32px",
  height: "32px",
}));

const SpinnerAnimation = styled.div(({ theme }) => ({
  boxSizing: "border-box",
  display: "block",
  position: "absolute",
  width: "24px",
  height: "24px",
  border: "2px solid",
  borderRadius: "50%",
  borderColor: `${theme.palette.text.dark} transparent transparent transparent`,
  animation: "spinner 1.5s linear infinite",
  top: "calc(50% - 12px)",
  left: "calc(50% - 12px)",

  "@keyframes spinner": {
    to: { transform: "rotate(360deg)" },
  },
}));

export const Spinner = () => {
  return (
    <SpinnerContainer>
      <SpinnerAnimation />
    </SpinnerContainer>
  );
};
