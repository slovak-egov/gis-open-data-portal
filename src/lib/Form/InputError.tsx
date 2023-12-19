import React from "react";
import styled from "styled-components";

const Base = styled.div(({ theme }) => ({
  color: "#ff0000",
  marginTop: theme.spacing(2),
}));

type Props = {
  children?: string;
};

export const InputError = ({ children }: Props) => {
  return typeof children === "string" ? <Base>{children}</Base> : null;
};
