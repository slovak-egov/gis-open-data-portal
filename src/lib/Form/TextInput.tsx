import { InputBase } from "./InputBase";
import { BaseInputProps } from "./defaults";

export const TextInput = ({ ...rest }: BaseInputProps) => {
  return <InputBase {...rest} />;
};
