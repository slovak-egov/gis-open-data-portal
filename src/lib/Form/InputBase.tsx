import { InputContainer } from "./InputContainer";
import { Label } from "./Label";
import { InputError } from "./InputError";
import styled from "styled-components";
import { getInputStyles } from "../Styles";
import { InputProps } from "@/types/props";

const StyledInput = styled.input(({ theme, size = 44, width = "100%" }) => ({
  ...getInputStyles({ theme, size }),
  width,
}));

interface Props extends InputProps {
  input?: JSX.Element;
  type?: "number" | "text";
  width?: string | number;
}

export const InputBase = ({ label, errors, input, width }: Props) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      {input || <StyledInput width={width} />}
      {errors && errors.length > 0 ? (
        <InputError>{errors?.join(", ")}</InputError>
      ) : null}
    </InputContainer>
  );
};
