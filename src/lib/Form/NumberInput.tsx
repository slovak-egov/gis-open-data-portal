import { InputBase } from "./InputBase";
import { BaseInputProps } from "./defaults";

export const NumberInput = ({ ...rest }: BaseInputProps) => {
  return <InputBase type="number" {...rest} />;
};
