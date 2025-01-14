import { createContext } from "react";
import {
  HighlightedButton,
  TutorialTextBoxPosition,
  DEFAULT_TUTORIAL_POSITION,
} from "types";

interface TutorialContextType {
  isTutorialActive: boolean;
  setIsTutorialActive: (value: boolean) => void;
  startTutorial: () => void;
  endTutorial: () => void;
  nextStep: () => void;
  subStep: number;
  setSubStep: (value: number) => void;
  handleSubStepClick: (maxSubSteps: number) => void;
  currentStep: number;
  isLastStep: boolean;
  tutorialTextBoxPosition: TutorialTextBoxPosition;
  setTutorialTextBoxPosition: (
    position: TutorialTextBoxPosition | null
  ) => void;
  highlightedButton: HighlightedButton | null;
  setHighlightedButton: (button: HighlightedButton | null) => void;
}

export const TutorialContext = createContext<TutorialContextType>({
  isTutorialActive: false,
  setIsTutorialActive: () => {},
  startTutorial: () => {},
  endTutorial: () => {},
  nextStep: () => {},
  subStep: 1,
  setSubStep: () => {},
  handleSubStepClick: () => {},
  currentStep: 0,
  isLastStep: false,
  tutorialTextBoxPosition: DEFAULT_TUTORIAL_POSITION,
  setTutorialTextBoxPosition: () => {},
  highlightedButton: null,
  setHighlightedButton: () => {},
});
