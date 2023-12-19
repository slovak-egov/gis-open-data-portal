import { BoxProps } from "@/types/props";
import { IconVariant } from "@/types/types";
import styled from "styled-components";

interface BaseProps extends BoxProps {
  viewBox?: string;
  fill?: string;
  xmlns?: string;
  transition?: string;
}

interface IconProps {
  variant: IconVariant;
  isClicked?: boolean;
}

const Base = styled.svg<BaseProps>(
  ({ viewBox, fill, xmlns, w, h, ml, mt, mr, mb, p, transition }) => ({
    display: "inline",
    viewBox,
    fill,
    xmlns,
    width: w,
    height: h,
    marginTop: mt,
    marginRight: mr,
    marginLeft: ml,
    marginBottom: mb,
    padding: p,
    transition,
    transform: "rotate(0deg)",
    "&.rotate": {
      transform: "rotate(180deg)",
    },
  })
);

const Rotating = styled(Base)({
  transform: "rotate(0deg)",
  "&.rotate": {
    transform: "rotate(180deg)",
  },
});

const Dropdown = ({ isClicked }: { isClicked: boolean }) => {
  return (
    <Rotating
      className={isClicked ? "rotate" : ""}
      transition="transform 0.2s ease-out"
      ml={8}
      mb={3}
      w={8}
      h={5}
    >
      <path d="M0.578704 1.71L3.1687 4.3C3.5587 4.69 4.1887 4.69 4.5787 4.3L7.1687 1.71C7.7987 1.08 7.3487 0 6.4587 0H1.2787C0.388704 0 -0.0512962 1.08 0.578704 1.71Z" />
    </Rotating>
  );
};

const ScrollUp = () => {
  return (
    <Base viewBox="0 0 20 15" w={20} h={15} mr={5}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 5.5984L0 15L0 9.40174L10 0L10 5.5984Z"
      />
      <path
        opacity="0.5"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 9.4016L10 0V5.59826L20 15V9.4016Z"
      />
    </Base>
  );
};

const Search = () => {
  return (
    <Base viewBox="0 0 20 19" w={20} h={19}>
      <path d="M13.3915 8.53573C13.3915 11.1546 11.2604 13.2857 8.64153 13.2857C6.02267 13.2857 3.89153 11.1546 3.89153 8.53573C3.89153 5.91687 6.02267 3.78573 8.64153 3.78573C11.2604 3.78573 13.3915 5.91687 13.3915 8.53573ZM18.8201 17.3572C18.8201 16.9967 18.6717 16.6468 18.4278 16.4029L14.7911 12.7662C15.6499 11.5257 16.1058 10.0413 16.1058 8.53573C16.1058 4.41129 12.766 1.07144 8.64153 1.07144C4.51709 1.07144 1.17725 4.41129 1.17725 8.53573C1.17725 12.6602 4.51709 16 8.64153 16C10.1471 16 11.6315 15.5441 12.872 14.6853L16.5087 18.3114C16.7526 18.5659 17.1025 18.7143 17.463 18.7143C18.2051 18.7143 18.8201 18.0993 18.8201 17.3572Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.927246 8.53573C0.927246 4.27321 4.37902 0.821442 8.64153 0.821442C12.904 0.821442 16.3558 4.27321 16.3558 8.53573C16.3558 10.0218 15.926 11.4882 15.1133 12.7349L18.6046 16.2261C18.8952 16.5168 19.0701 16.9302 19.0701 17.3572C19.0701 18.2374 18.3432 18.9643 17.463 18.9643C17.0366 18.9643 16.622 18.7897 16.3303 18.4865L12.8409 15.0073C11.5942 15.8202 10.1277 16.25 8.64153 16.25C4.37902 16.25 0.927246 12.7982 0.927246 8.53573ZM8.64153 1.32144C4.65516 1.32144 1.42725 4.54936 1.42725 8.53573C1.42725 12.5221 4.65516 15.75 8.64153 15.75C10.0971 15.75 11.5317 15.3091 12.7297 14.4797L12.901 14.3611L16.6893 18.1384C16.8851 18.3428 17.1694 18.4643 17.463 18.4643C18.0671 18.4643 18.5701 17.9613 18.5701 17.3572C18.5701 17.0631 18.4481 16.7768 18.251 16.5797L14.4668 12.7954L14.5855 12.6239C15.415 11.4259 15.8558 9.99127 15.8558 8.53573C15.8558 4.54936 12.6279 1.32144 8.64153 1.32144ZM8.64153 4.03573C6.16074 4.03573 4.14153 6.05494 4.14153 8.53573C4.14153 11.0165 6.16074 13.0357 8.64153 13.0357C11.1223 13.0357 13.1415 11.0165 13.1415 8.53573C13.1415 6.05494 11.1223 4.03573 8.64153 4.03573ZM3.64153 8.53573C3.64153 5.77879 5.8846 3.53573 8.64153 3.53573C11.3985 3.53573 13.6415 5.77879 13.6415 8.53573C13.6415 11.2927 11.3985 13.5357 8.64153 13.5357C5.8846 13.5357 3.64153 11.2927 3.64153 8.53573Z"
      />
    </Base>
  );
};

const Document = () => {
  return (
    <Base viewBox="0 0 24 24" w={24} h={24}>
      <path d="M7 17.3955H14V15.3955H7V17.3955ZM7 13.3955H17V11.3955H7V13.3955ZM7 9.39551H17V7.39551H7V9.39551ZM5 21.3955C4.45 21.3955 3.97917 21.1997 3.5875 20.808C3.19583 20.4163 3 19.9455 3 19.3955V5.39551C3 4.84551 3.19583 4.37467 3.5875 3.98301C3.97917 3.59134 4.45 3.39551 5 3.39551H19C19.55 3.39551 20.0208 3.59134 20.4125 3.98301C20.8042 4.37467 21 4.84551 21 5.39551V19.3955C21 19.9455 20.8042 20.4163 20.4125 20.808C20.0208 21.1997 19.55 21.3955 19 21.3955H5ZM5 19.3955H19V5.39551H5V19.3955Z" />
    </Base>
  );
};

export const Icon = ({ variant, isClicked }: IconProps) => {
  if (variant === "dropdown") {
    return <Dropdown isClicked={isClicked || false} />;
  }
  if (variant === "scroll.up") {
    return <ScrollUp />;
  }
  if (variant === "search") {
    return <Search />;
  }
  if (variant === "document") {
    return <Document />;
  }
  return <></>;
};

export const Base64Icon = styled("img")(() => ({
  width: 25,
  height: 25,
}));
