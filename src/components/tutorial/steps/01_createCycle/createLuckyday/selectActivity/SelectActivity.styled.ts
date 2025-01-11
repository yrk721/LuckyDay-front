import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const HeadLineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 36px 0 29px;
`;

export const HeadLine = styled.span`
  ${({ theme }) => css`
    ${theme.fonts.headline1};
  `}
`;

export const Activities = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const icon = css`
  width: 12px;
  height: 12px;
  margin-right: 3px;
`;

export const Button = styled.button<{ isNotChecked: boolean }>`
  ${({ theme, isNotChecked }) => css`
    display: flex;
    align-items: center;
    border-radius: 30px;
    padding: 0 11px;
    background-color: ${isNotChecked
      ? theme.colors.lightOrange
      : theme.colors.gray};

    & > span {
      ${theme.fonts.body1};
      margin-top: 2px;
      color: ${!isNotChecked && theme.colors.white};
    }

    & > svg {
      width: 20px;
      height: 20px;

      & > path {
        fill: ${!isNotChecked && theme.colors.white};
      }
    }
  `}
`;
