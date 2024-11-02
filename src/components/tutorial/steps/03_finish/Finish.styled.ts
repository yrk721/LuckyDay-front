import { css } from "@emotion/react";
import styled from "@emotion/styled";
import * as S from "components/domain/landing/carousel/Carousel.styled";

export const FinishContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1vh; 

  @media (min-height: 780px) {
    gap: 4vh;
  }

  @media (min-height: 945px) {
    gap: 8vh;
`;

export const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 260px;
  aspect-ratio: 1;
  margin: 1vh; 

  @media (min-height: 780px) {
    margin: 6vh; 

  @media (min-height: 920px) {
    margin: 8vh; 
  }
`;

export const LandingImage = styled.img`
  position: absolute;
  max-width: 260px;
`;

export const TextBox = styled.div`
  ${({ theme }) => css`
    width: 315px;
    text-align: center;
    white-space: pre-wrap;
    margin-top: 8%;
    ${theme.fonts.logo};
    color: ${theme.colors.black};
  `}
`;

export const LogoTooltipWrapper = styled.div`
  position: fixed;
  top: 41%;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 0px 20px 15px;
`;

export const NextButton = styled(S.NextButton)``;
export const DotContainer = styled(S.DotContainer)``;
export const Dot = styled(S.Dot)``;

export const button = S.button;
export const NextArrowIcon = S.NextArrowIcon;
