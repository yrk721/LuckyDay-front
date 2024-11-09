import * as S from "./BackButton.styled";
import { SvgFrame } from "components";
import { CircleBoxIcon, ArrowIcon } from "assets";

export default function BackButton() {
  return (
    <S.BackButton>
      <SvgFrame css={S.svgFrame} icon={<CircleBoxIcon />} />
      <ArrowIcon css={S.arrowIcon} />
    </S.BackButton>
  );
}
