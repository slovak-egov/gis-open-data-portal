import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { getInputStyles } from "@/lib/Styles";
import { Button } from "@/lib/Button";
import { InputContainer } from "@/lib/Form/InputContainer";
import { InputError } from "@/lib/Form/InputError";
import { InputProps } from "@/types/props";
import { MdClose } from "react-icons/md";

interface BaseProps extends InputProps {
  endpoint: string;
}

interface DivProps {
  width?: number | string;
  focused?: boolean;
}

const Base = styled.input(({ theme, width }) => ({
  ...getInputStyles({ theme, size: 44, width }),
  width: "100%",
  height: "100%",
  border: "none",
  "&:focus": {
    outline: "none",
  },
  padding: 0,
  marginBottom: 0,
}));

const InputDiv = styled.div<DivProps>(({ theme, width, focused }) => ({
  ...getInputStyles({ theme, size: 44, width }),

  borderWidth: focused ? 4 : 2,
  borderStyle: "solid",
  outline: focused ? `3px solid ${theme.palette.focus}` : "none",
  outlineOffset: focused ? 0 : 3,

  display: "flex",
  alignItems: "center",
}));

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "row",
  gap: 0,
});

const StyledClearButton = styled.button(({}) => ({
  border: "none",
  background: "none",
  cursor: "pointer",
  transform: "scale(1.5)",
  display: "flex",
}));

export const SearchInput = ({ label, errors, width, endpoint }: BaseProps) => {
  const router = useRouter();
  const t = useTranslations();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (router.query && router.query.q) {
      setQuery(router.query.q as string);
    }
  }, [router.query]);

  const handleSearch = () => {
    router.push(`/${endpoint}?q=${encodeURIComponent(query)}`);
  };
  const handleClick = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClear = () => {
    setQuery("");
    if (!router.query?.q) return;

    router.push(`/${endpoint}?q=`);
  };

  return (
    <InputContainer>
      <Wrapper>
        <InputDiv tabIndex={0} width={width} focused={isFocused}>
          <Base
            onClick={() => handleClick()}
            onBlur={() => handleBlur()}
            width={width}
            placeholder={label && t(label)}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <StyledClearButton onClick={() => handleClear()}>
            <MdClose />
          </StyledClearButton>
        </InputDiv>
        <Button variant="search" onClick={() => handleSearch()} />
      </Wrapper>
      {errors && errors.length > 0 ? (
        <InputError>{errors?.join(", ")}</InputError>
      ) : null}
    </InputContainer>
  );
};
