import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px 10px;
  padding: 20px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;

  @media (max-width: 405px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const TitleBox = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 60px;
    padding: 30px;
    color: ${theme.colors.black};
    ${theme.fonts.headline1}
    border-top: 1px  solid ${theme.colors.gray};
  `}
`;

export const ErrorBox = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50vh;
    padding: 5px;
    color: ${theme.colors.black};
    ${theme.fonts.headline1}
  `}
`;

export const Logo_Sad = styled.div`
  width: 100px;
  height: 100px;
  margin: 30px 0px 30px 0px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("/images/logo-sad-blue.webp");
`;
