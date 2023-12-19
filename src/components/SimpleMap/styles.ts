import ol_style_Fill from "ol/style/Fill";
import ol_style_Icon from "ol/style/Icon";
import ol_style_Style from "ol/style/Style";
import ol_style_Stroke from "ol/style/Stroke";
import ol_style_Text from "ol/style/Text";
import { StyleDefinition } from "@/types/types";
import { DeepPartial } from "@apollo/client/utilities";

export const RED_MARKER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEQ0lEQVR4nO1Z20uUQRT/uif+A1nvEpUJFRgS0UM3UggfosyHLFEzy6gelAjKLSgyysoKswffukBFF4oCuz2U1nplc91VW22zLStLd9ddy91fnHFm+zLk+9adz92iA0dE5zvn95uZc87MGUX5L/+IAJgBYC2AcwCeAmgD4OFqBfAEQAWANQCmK7EiABIAXADQD/1CY88DmBVN4DMBHOEzDASD8Foc6DlzHbYtR2FJK0bD4jymlrQS9reeszfgfd2lJuIBYCJb0Zj1WgG8734dLOuKYZ63RZcSub4HL9m3XF5M2GoASAbwjrz6336EdWOpbuCj1Zppgt/ZK0g4ASQZDX4WdwR3vQ1Ny3aNG7zQptRCDNS2ChI9AOYYBT4OQB15GahrRf3CbRGDN3OtT87BwEurejvJjwkesGzJm5btlAberFoJf/cHQaLUiKD1UNBFsuc1Y2LzYRHYlJ0SZBKgPI++e7WGgTdz7Xv4SqzCOZkVtp9mJpxUOV61pJUIAt+kVGx+PGBFSi+Ijp2nWVAGBv1M6ff2Had0f+9tDRW71TIIUMlnFVaPc9elu2OeH1yVt3XZ6Km4KT6pkEHgMVmio4CemdeS9gLtlbBtPSaGP5JBwE6W9Ox/VS4fU6iGaMdBsRjeJoOAmyw1LMnXdBzw+jQJDHt8mnYaluSL4W4ZBLyMwKJcOQTcg9oEFueJ4R4ZBFhKaFm5V84WqtXeQi2r9onhXTIIPCNL9twTmo4pVWpJe8FJTTv2vBNi+FMZBJg1uozoSqOVt8cE//7CrXDTaJkMAhlkyd1g1+WcrUTBKZZtKCZIadvomXkzV/LFJUMGgXgAgwgE0bxit24Q49Xm5UUgX8wnEB8xAU7iBll0Hr9sOAFn2RUx+9elgOcE0sUV0rwg2zgC87Ph7wrdCdJlEpgM4A1Z7SgsN4xAR2G5AN8NYIo0ApxEEduYNqcxqzA/G14r4WZSJBW86l7wlqx37qmQTqBzLzX0Qhf7OOkEOAlW430OF+qTJF7qk7bC10m4meQZAp4TmEZhQF4c+6ukEXDsrxLgHYb3TQFkkafvn/vRuHRHxOAbU7bje+9XQSDLUPCcwCQANeSt9+qjiAl8uvY4dO4h24YT4CTmUlmgitmWdWTc4K2bTKLq+snmhIBXkTCJtEqdtbADNzmHfWtIIyuM9jo7dbku3gmbgKsqdPm3T3h7XUUilS5ZtA30XPqF0rYLDgcIPP1YHhXwo7fSkOuLrqxEWWfo3Scx+6aogucEporHji93nmsSoDFczFRXlFgQAImie9F9qHpM8N2l1QI8jU1UYkkAZBKy4NAPtG44+Af41xkHEPANCQKZSiwKRp5YR94QUgt/7/3/ekqKvF1olPATK3vFcZttLNfTS47qCYn+N0OJZQEwmx+J0Xu5hqnqmDxb+RsEwCLR0eNCLbsU5W8SAOv5rJOujzae/6IYJD8BR1OVui0Dw6YAAAAASUVORK5CYII=";

const createText = (options?: {
  text?: string;
  fillColor?: string;
  font?: string;
  overflow?: boolean;
  offsetX?: number;
  offsetY?: number;
  width?: number;
  strokeColor?: string;
}) => {
  const {
    text = undefined,
    fillColor = "#000000",
    strokeColor = "#ffffff",
    width = 2,
    overflow = false,
    offsetX,
    offsetY,
    font,
  } = options || {};
  return new ol_style_Text({
    text,
    font,
    overflow,
    offsetX,
    offsetY,
    fill: new ol_style_Fill({ color: fillColor }),
    stroke: new ol_style_Stroke({ color: strokeColor, width }),
  });
};

export const getDefaultStyle = ({
  stroke,
  fill,
  point,
  text,
  zIndex,
}: DeepPartial<StyleDefinition>) =>
  new ol_style_Style({
    zIndex,
    stroke:
      stroke &&
      new ol_style_Stroke({
        color: stroke.color,
        width: stroke.width,
      }),
    fill:
      fill &&
      new ol_style_Fill({
        color: fill.color,
      }),
    image:
      point &&
      new ol_style_Icon({
        displacement:
          (point.displacement as number[]) ||
          (point?.icon && [0, (point?.radius || 10) / 2]),
        scale: point?.src ? 1 * (point?.radius || 1) : 1,
        src: point?.src,
      }),
    text: createText(text),
  });

export const mapStyle = getDefaultStyle({
  stroke: { color: "#ff0000", width: 2 },
  fill: { color: "#ff00003f" },
  point: { src: RED_MARKER, radius: 0.6 },
});
