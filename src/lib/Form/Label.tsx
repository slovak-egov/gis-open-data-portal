import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import styled from "styled-components";

const LabelBase = styled.label(({ theme }) => ({
  padding: "0 0 3px 0",
  display: "flex",
  alignItems: "center",
  ...theme.typography.captionMedium,
  "&.isRequired::after": {
    content: " ' *'",
    paddingLeft: theme.spacing(0.5),
  },
}));

type Props = {
  children: string | string[] | ReactNode | ReactNode[];
  className?: string;
  isRequired?: boolean;
};

export const Label = ({ className, isRequired, children }: Props) => {
  const t = useTranslations();
  return (
    <LabelBase className={isRequired ? "isRequired" : "" + className}>
      {typeof children === "string" ? t(children) : children}
    </LabelBase>
  );
};
