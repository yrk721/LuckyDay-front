import { useMemo, useEffect, useRef } from "react";
import { useTutorial } from ".";
import {
  TUTORIAL_STEPS,
  TUTORIAL_STEP_ORDER,
  TUTORIAL_CONFIG,
  TUTORIAL_TEXTS,
} from "components";
import {
  TutorialStepConfig,
  TutorialTextBoxPosition,
  HighlightedButton,
} from "types";

export default function useTutorialStep(
  stepNumber: TUTORIAL_STEPS,
  config: Partial<TutorialStepConfig>
) {
  const {
    currentStep,
    subStep,
    setHighlightedButton,
    setTutorialTextBoxPosition,
  } = useTutorial();

  const configRef = useRef(config);

  const isActiveStep = useMemo(() => {
    const currentStepValue = TUTORIAL_STEP_ORDER[currentStep];
    return currentStepValue === stepNumber;
  }, [currentStep, stepNumber]);

  const { stepConfig, highlightedButton } = useMemo(() => {
    let content = "";
    const stepText = TUTORIAL_TEXTS[stepNumber];

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
      stepNumber,
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
}
