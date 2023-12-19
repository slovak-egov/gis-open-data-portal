import { CustomDataType } from "@/types/types";
import { Typography } from "./Typography";
import { Box } from "./Box";
import theme from "@/config/theme";
import { FieldType } from "@/types/enums";
import { useTranslations } from "next-intl";

interface Props {
  data: CustomDataType;
  idx: number;
}

export const CustomData = ({ data, idx }: Props) => {
  const t = useTranslations();
  return (
    <>
      <Box
        backgroundColor={idx % 2 === 0 ? "white" : theme.palette.grey[100]}
        p={2}
      >
        <Typography variant="caption.medium">
          {data.field.alias} :{" "}
          {data.field.type === FieldType.BOOLEAN
            ? data.value === "true"
              ? t("general.yes")
              : t("general.no")
            : data.value}
        </Typography>
      </Box>
    </>
  );
};
