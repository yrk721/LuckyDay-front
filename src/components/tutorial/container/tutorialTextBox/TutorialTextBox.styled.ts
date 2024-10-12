import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const Container = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 330px;
    padding: 15px;
    border-radius: 15px;
    background-color: ${theme.colors.black};
    cursor: pointer;
    z-index: 500;

    @media (max-width: 375px) {
      width: 290px;
    }
  `}
`;

export const TextBox = styled.div`
  ${({ theme }) => css`
    ${theme.fonts.body1}
    color: ${theme.colors.white};
    z-index: 500;
  `}
`;
