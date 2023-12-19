import { InputBase } from "./InputBase";
import { getInputStyles } from "../Styles";
import { InputProps } from "@/types/props";
import styled from "styled-components";

const TextAreaBase = styled.textarea(({ theme }) => ({
  ...getInputStyles({ theme, size: 100 }),
  resize: "vertical",
  minHeight: "44px",
  "&:focus": {
    borderWidth: 4,
    outline: `3px solid ${theme.palette.focus}`,
    outlineOffset: 0,
    paddingLeft: "6px",
    paddingTop: "6px",
  },
}));

export const TextArea = ({ ...rest }: InputProps) => {
  return <InputBase input={<TextAreaBase />} {...rest} />;
};
