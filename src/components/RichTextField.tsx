import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import { generateHTML } from "@tiptap/html";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Typography } from "@/lib/Typography";

interface Props {
  content: JSON;
}

export const RichTextField = ({ content }: Props) => {
  const t = useTranslations();

  const output = useMemo(() => {
    if (typeof content !== "object" || content === null) {
      return (
        <Typography variant="caption.large">
          {t("error.pageNotFound")}
        </Typography>
      );
    }

    return generateHTML(content, [
      StarterKit,
      Underline,
      Link,
      TextAlign,
      Image,
      TextStyle,
      Color,
      Highlight,
    ]);
  }, [content, t]);

  return <div dangerouslySetInnerHTML={{ __html: output }} />;
};

export default RichTextField;
