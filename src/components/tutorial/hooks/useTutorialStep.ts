import { useMemo, useEffect, useRef } from "react";
import {
  TutorialStepConfig,
  TutorialTextBoxPosition,
  HighlightedButton,
} from "types";
import { useTutorial } from ".";
import { tutorialTexts } from "../steps/tutorialTexts";
import { TUTORIAL_CONFIG } from "../config";
import { TUTORIAL_STEP_ORDER } from "../steps/tutorialSteps";

export const useTutorialStep = (
  stepNumber: number,
  config: Partial<TutorialStepConfig>
) => {
  const {
    currentStep,
    subStep,
    setHighlightedButton,
    setTutorialTextBoxPosition,
  } = useTutorial();

  const configRef = useRef(config);

  const isActiveStep = useMemo(() => {
    const currentStepValue = TUTORIAL_STEP_ORDER[currentStep];
    return currentStepValue === stepNumber.toString();
  }, [currentStep, stepNumber]);

  const { stepConfig, highlightedButton } = useMemo(() => {
    let content = "";
    const stepText = tutorialTexts[stepNumber.toString()];

    if (typeof stepText === "object" && stepText !== null) {
      content = stepText[subStep.toString()] || "";
    } else if (typeof stepText === "string") {
      content = stepText;
    }

    console.log("Step content:", {
      stepNumber,
      content,
      currentStep,
      isActiveStep,
      subStep,
    });

    const position: TutorialTextBoxPosition = {
      ...TUTORIAL_CONFIG.position.default,
      ...(configRef.current.position || {}),
    };

    const tutorialConfig: TutorialStepConfig = {
      stepNumber: stepNumber.toString(),
      content,
      position,
      textBoxProps: {
        isClickable: true,
        showNextIcon: false,
        ...configRef.current.textBoxProps,
      },
    };

    const highlightedButton: HighlightedButton = {
      textBoxes: [content],
      position,
      textBoxProps: tutorialConfig.textBoxProps,
      ...(configRef.current.highlight && {
        highlightTarget: {
          component: configRef.current.highlight.component,
          selector: configRef.current.highlight.selector,
        },
      }),
    };

    return {
      stepConfig: tutorialConfig,
      highlightedButton,
    };
  }, [stepNumber, subStep, currentStep, isActiveStep]);

  useEffect(() => {
    if (isActiveStep) {
      setHighlightedButton(highlightedButton);
      setTutorialTextBoxPosition(stepConfig.position || null);
    }

    return () => {
      if (isActiveStep) {
        setHighlightedButton(null);
        setTutorialTextBoxPosition(null);
      }
    };
  }, [
    isActiveStep,
    stepNumber,
    stepConfig,
    highlightedButton,
    setHighlightedButton,
    setTutorialTextBoxPosition,
  ]);

  return {
    stepConfig,
    highlightedButton,
  };
};
