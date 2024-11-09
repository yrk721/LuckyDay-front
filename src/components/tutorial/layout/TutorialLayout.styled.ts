import styled from "@emotion/styled";
import { css, Theme } from "@emotion/react";

export const TutorialFullPage = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 430px;
  height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
  z-index: 100;
`;

export const TutorialOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 430px;
  height: calc(var(--vh, 1vh) * 100);
  background: rgba(160, 159, 159, 0.5);
  z-index: 200;
`;

export const TutorialContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const TutorialTextBoxWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 300;
`;

export const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 3%;
  right: 5%;
  z-index: 400;
`;

export const CloseButton = styled.button`
  position: relative;
  width: 35px;
  height: 35px;

  & > div {
    width: 100%;
    height: 100%;
  }

  & > span {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const HighlightedButtonWrapper = styled.div`
  position: absolute;
  cursor: pointer;
  z-index: 300;
`;

export const svgFrame = (theme: Theme) => css`
  path {
    fill: ${theme.colors.lightBeige};
  }
`;

export const LogoBox = styled.div`
  ${({ theme }) => css`
    position: fixed;
    top: 3%;
    left: 1%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${theme.fonts.logo};
    color: ${theme.colors.black};
  `}
`;

export const Logo_Basic = styled.div`
  width: 30px;
  height: 30px;
  margin: 0px 10px 0px 24px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url("/images/logo.webp");
`;
