import { css, Theme } from "@emotion/react";
import styled from "@emotion/styled";
import * as S from "pages/luckyBoard/luckyBoardAfter/LuckyBoardAfterPage.styled";
import * as LuckyBallsS from "components/domain/luckyBoard/luckyBalls/LuckyBalls.styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 10%;
  margin: 20px 0px -50px 0px;
  background: transparent;
`;

export const Button = styled.button`
  position: relative;
  width: 90px;
`;

export const ButtonBox = styled.div<{ isSecond?: boolean }>`
  ${({ theme, isSecond }) => css`
    ${theme.fonts.headline2};
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 10px;
    left: ${isSecond ? "28px" : "10px"};
  `}
`;

export const beigeIcon = (theme: Theme) => css`
  path {
    fill: ${theme.colors.beige};
  }
`;

export const lightOrangeIcon = (theme: Theme) => css`
  path {
    fill: ${theme.colors.lightOrange};
  }
`;

export const LuckyMachine = styled(S.LuckyMachine)``;
export const TextBox = styled(S.TextBox)``;

export const LuckyBallsContainer = styled(LuckyBallsS.Container)``;
export const LuckyBallFace = styled(LuckyBallsS.LuckyBallFace)``;
export const RowBox = styled(LuckyBallsS.RowBox)``;

export const svgFrame = LuckyBallsS.svgFrame;
export const LuckyBall_Dday = LuckyBallsS.LuckyBall_Dday;
export const LuckyBall_unknown = LuckyBallsS.LuckyBall_unknown;
