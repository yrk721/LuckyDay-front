import { css, Theme } from "@emotion/react";
import styled from "@emotion/styled";

export const BackButton = styled.button`
  position: absolute;
  bottom: 5%;
  left: 8%;
`;

export const svgFrame = (theme: Theme) => css`
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
