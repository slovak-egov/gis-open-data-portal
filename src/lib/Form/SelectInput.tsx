import { useCallback } from "react";
import Select from "react-select";
import { useTheme } from "styled-components";
import { BaseInputProps, createBaseStyles } from "./defaults";
import { InputBase } from "./InputBase";
import { useTranslations } from "next-intl";

interface Option {
  label?: string;
  value: string | number;
  id: number | string;
}

interface Props extends BaseInputProps {
  maxWidth?: number;
  width?: number | string;
  size?: number;
  options?: Array<Option>;
  value?: any;
  onChange?: (value: any) => any;
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  resetValue?: any;
  setState?(value: any): any;
  isMulti?: boolean;
  isClearable?: boolean;
  mb?: number;
}

export const SelectInput = ({
  width,
  options = [],
  size = 25,
  onChange,
  // value,
  placeholder,
  isRequired,
  isDisabled,
  resetValue,
  setState,
  isMulti,
  isClearable,
  mb,
  ...rest
}: Props) => {
  const theme = useTheme();

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      ...createBaseStyles({ theme, size }),
      paddingTop: 6,
      borderColor: theme.palette.text.dark,
      fontSize: theme.typography.body.fontSize,
      boxShadow: "none",
      height: 44,
      borderWidth: state.isFocused ? 4 : 2,
      outline: state.isFocused ? `3px solid ${theme.palette.focus}` : "none",
      outlineOffset: 0,
      transition: "none",
      "&:hover": {
        borderColor: theme.palette.text.dark,
      },
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      minHeight: size,
    }),
    option: (provided: any) => ({
      ...provided,
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: 0,
    }),
    input: (provided: any) => ({
      ...provided,
      padding: 0,
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      height: size,
    }),
  };

  const handleOnChange = useCallback(
    (option: any) => {
      onChange && onChange(option);
    },
    [onChange]
  );

  const t = useTranslations();

  return (
    <InputBase
      input={
        <Select
          instanceId="select"
          isClearable={isClearable}
          isMulti={isMulti}
          isDisabled={isDisabled}
          noOptionsMessage={() => t("error.noResults")}
          placeholder={
            placeholder && placeholder.length > 30
              ? placeholder.substring(0, 30) + "..."
              : placeholder
          }
          styles={customStyles}
          getOptionLabel={(option: any) => option.value}
          getOptionValue={(option: any) => option}
          onChange={handleOnChange}
          // value={options.find((option: any) => option === value) || null}
          options={options}
        />
      }
      {...rest}
    />
  );
};
