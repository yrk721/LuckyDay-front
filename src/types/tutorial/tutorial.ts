import { ReactNode } from "react";

export interface TutorialStepConfig {
  stepNumber?: string;
  content: string | string[];
  position?: {
    top?: string;
    bottom?: string;
    left?: string;
    transform?: string;
  };
  textBoxProps?: {
    isClickable?: boolean;
    showNextIcon?: boolean;
    onClick?: () => void;
  };
  highlight?: {
    selector?: string;
    component?: ReactNode;
  };
}

export interface TutorialStep {
  stepNumber: number;
  config: TutorialStepConfig;
}

export interface HighlightedButton {
  component?: ReactNode;
  selector?: string;
  position?: {
    top?: string;
    left?: string;
    width?: string;
    height?: string;
  };
  textBoxes?: string[];
  textBoxProps?: {
    isClickable?: boolean;
    showNextIcon?: boolean;
    onClick?: () => void;
  };
  highlightTarget?: {
    selector?: string;
    component?: ReactNode;
  };
}

export interface TutorialTextBoxPosition {
  top?: string;
  bottom?: string;
  left?: string;
  transform?: string;
}
