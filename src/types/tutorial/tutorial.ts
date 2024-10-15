import { ReactNode } from "react";

export interface HighlightedButton {
  component: ReactNode;
  selector?: string;
  onClick?: () => void;
  position?: {
    top?: string;
    left?: string;
    width?: string;
    height?: string;
  };
}

export interface TutorialTextBoxPosition {
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
  transform?: string;
}
