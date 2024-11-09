import { css, Theme } from "@emotion/react";
import styled from "@emotion/styled";
import * as S from "pages/viewLuckyActivity/ViewLuckyActivityPage.styled";

export const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ViewActivity = styled(S.ViewLuckyActivityPage)`
  position: relative;
  width: 100%;
  height: 50vh;
  margin-bottom: 25%;
`;

export const LuckydayDetailInfo = styled(S.LuckydayDetailInfo)`
  p:last-of-type {
    white-space: pre-line;
    width: 100%;
  }
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
`;

export const Button = styled(S.Button)`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    & > span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      text-align: center;
      ${theme.fonts.headline2};
    }

    svg {
      width: 100px;
      height: auto;
    }
  `}
`;

export const Img = styled(S.Img)``;
export const LuckydayInfo = styled(S.LuckydayInfo)``;
export const svgFrame = S.svgFrame;
export const HighlightButtonWrapper = styled(ButtonContainer)``;

export const BackButton = styled.button`
  position: absolute;
  bottom: 5%;
  left: 8%;
`;

export const svgFrameBack = (theme: Theme) => css`
  width: 40px;
  height: 40px;

  path {
    fill: ${theme.colors.beige};
  }
`;

export const arrowIcon = css`
  position: absolute;
  top: 8px;
  left: 8px;
  rotate: 270deg;
  width: 24px;
  height: 24px;
`;
