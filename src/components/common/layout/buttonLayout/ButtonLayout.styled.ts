import { Theme, css } from "@emotion/react";
import styled from "@emotion/styled";

export const ButtonLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100 - 80px);
  min-height: calc(100% - 80px);
`;

export const Body = styled.div`
  overflow-y: auto;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 3% 5% 6% 5%;
`;

export const icon = css`
  width: 24px;
  height: 24px;
`;

export const Button = styled.button`
  position: relative;
  width: 90px;
`;

export const ButtonBox = styled.div<{
  isSecond?: boolean;
  variant: "hasIcon" | "hasColor";
}>`
  ${({ theme, isSecond, variant }) => css`
    ${theme.fonts.headline2};
    position: absolute;
    top: ${variant === "hasColor" && !isSecond ? "10px" : "8px"};
    left: ${variant === "hasColor"
      ? isSecond
        ? "28px"
        : "10px"
      : isSecond
      ? "21px"
      : "10px"};
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 6px;

    & > svg {
      ${icon};
      rotate: ${isSecond ? "90deg" : "270deg"};
    }
  `}
`;

export const Img = styled.img`
  width: 100%;
`;

export const beigeIcon = (theme: Theme) => css`
  path {
    fill: ${theme.colors.beige};
  }
`;

export const switchIcon = (hasIcon: boolean) => (theme: Theme) =>
  css`
    path {
      fill: ${hasIcon ? theme.colors.beige : theme.colors.lightOrange};
    }
  `;
