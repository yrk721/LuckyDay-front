import * as S from "./Tooltip.styled";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  flow: "up" | "down" | "left" | "right";
}

export default function Tooltip({ content, flow, children }: TooltipProps) {
  return (
    <S.TooltipWrapper>
      {children}
      <S.TooltipBox flow={flow}>
        <S.TooltipArrow flow={flow} />
        <S.TooltipContent>{content}</S.TooltipContent>
      </S.TooltipBox>
    </S.TooltipWrapper>
  );
}
