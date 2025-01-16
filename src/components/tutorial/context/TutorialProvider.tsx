import { ReactNode, useState, useEffect, useCallback } from "react";
import { TOTAL_STEPS, TUTORIAL_STEPS } from "components";

import {
  TutorialTextBoxPosition,
  DEFAULT_TUTORIAL_POSITION,
  HighlightedButton,
} from "types";
import { TutorialContext } from "./TutorialContext";

interface TutorialProviderProps {
  children: ReactNode;
}

export default function TutorialProvider({ children }: TutorialProviderProps) {
  const [isTutorialActive, setIsTutorialActive] = useState(false);
  const [currentStep, setCurrentStep] = useState<TUTORIAL_STEPS>(
    TUTORIAL_STEPS.WELCOME
  );
  const [isLastStep, setIsLastStep] = useState(false);
  const [subStep, setSubStep] = useState(1);
  const [tutorialTextBoxPosition, setTutorialTextBoxPosition] =
    useState<TutorialTextBoxPosition>(DEFAULT_TUTORIAL_POSITION);
  const [highlightedButton, setHighlightedButton] =
    useState<HighlightedButton | null>(null);

  useEffect(() => {
    setIsLastStep(currentStep === TOTAL_STEPS - 1);
  }, [currentStep]);

  const startTutorial = () => {
    setIsTutorialActive(true);
    setCurrentStep(0);
  };

  const endTutorial = useCallback(() => {
    setIsTutorialActive(false);
    setCurrentStep(0);
    setSubStep(1);
    setTutorialTextBoxPosition(DEFAULT_TUTORIAL_POSITION);
    setHighlightedButton(null);
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      const next =
        prev === TOTAL_STEPS - 1 ? 0 : Math.min(prev + 1, TOTAL_STEPS - 1);
      if (next === 0) {
        endTutorial();
      }
      return next;
    });

    setSubStep(1);
  }, [endTutorial]);

  const handleSubStepClick = useCallback(
    (maxSubSteps: number) => {
      setSubStep((prev) => {
        if (prev >= maxSubSteps) {
          nextStep();
          return 1;
        }
        return prev + 1;
      });
    },
    [nextStep]
  );

  const setTutorialTextBoxPositionWithDefault = useCallback(
    (position: TutorialTextBoxPosition | null) => {
      setTutorialTextBoxPosition(position || DEFAULT_TUTORIAL_POSITION);
    },
    []
  );

  return (
    <TutorialContext.Provider
      value={{
        isTutorialActive,
        setIsTutorialActive,
        startTutorial,
        endTutorial,
        nextStep,
        subStep,
        setSubStep,
        handleSubStepClick,
        currentStep,
        isLastStep,
        tutorialTextBoxPosition,
        setTutorialTextBoxPosition: setTutorialTextBoxPositionWithDefault,
        highlightedButton,
        setHighlightedButton,
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
}
