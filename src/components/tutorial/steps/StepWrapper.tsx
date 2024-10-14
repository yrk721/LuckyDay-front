import { useEffect, useContext, useRef } from "react";
import { TutorialContext } from "../context/TutorialContext";
import { HighlightedButton, TutorialTextBoxPosition } from "../type";

interface StepWrapperProps {
  children: React.ReactNode;
  stepNumber: number;
  tutorialTextBoxPosition?: TutorialTextBoxPosition;
  highlightedButton?: HighlightedButton;
}

export function StepWrapper({
  stepNumber,
  tutorialTextBoxPosition,
  highlightedButton,
  children,
}: StepWrapperProps) {
  const { setTutorialTextBoxPosition, setHighlightedButton, currentStep } =
    useContext(TutorialContext);

  const prevStepRef = useRef(currentStep);

  useEffect(() => {
    if (currentStep === stepNumber && prevStepRef.current !== currentStep) {
      setTutorialTextBoxPosition(tutorialTextBoxPosition || null);
      setHighlightedButton(highlightedButton || null);
    }

    prevStepRef.current = currentStep;

    return () => {
      if (currentStep === stepNumber) {
        setTutorialTextBoxPosition(null);
        setHighlightedButton(null);
      }
    };
  }, [currentStep, stepNumber]);

  return <>{children}</>;
}
