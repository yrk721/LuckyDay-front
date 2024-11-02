import { ReactNode } from "react";
import { TUTORIAL_STEPS } from "components";

export interface TutorialStepConfig {
  stepNumber?: TUTORIAL_STEPS;
  content: string | string[];
  position?: TutorialTextBoxPosition;
  textBoxProps?: TutorialTextBoxProps;
  highlight?: {
    selector?: string;
    component?: ReactNode;
  };
}

export interface TutorialStep {
  stepNumber?: TUTORIAL_STEPS;
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
  textBoxProps?: TutorialTextBoxProps;
  highlightTarget?: {
    selector?: string;
    component?: ReactNode;
  };
}

export interface TutorialTextBoxProps {
  currentStep?: TUTORIAL_STEPS;
  children?: React.ReactNode;
  showNextIcon?: boolean;
  isClickable?: boolean;
  onClick?: () => void;
}

export interface TutorialTextBoxPosition {
  top?: string;
  bottom?: string;
  left?: string;
  transform?: string;
}

export const DEFAULT_TUTORIAL_POSITION: TutorialTextBoxPosition = {
  top: "15%",
  left: "50%",
  transform: "translate(-50%, -50%)",
} as const;
