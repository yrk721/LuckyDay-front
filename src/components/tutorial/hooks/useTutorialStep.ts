import { useMemo, useEffect, useRef, useCallback } from "react";
import { useTutorial } from ".";
import {
  TUTORIAL_TEXTS,
  TUTORIAL_STEPS,
  TUTORIAL_STEP_ORDER,
} from "components";
import {
  TutorialStepConfig,
  HighlightedButton,
  DEFAULT_TUTORIAL_POSITION,
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

  useEffect(() => {
    const hasPositionChanged =
      config.position?.top !== configRef.current.position?.top;
    const hasHighlightChanged =
      config.highlight?.selector !== configRef.current.highlight?.selector ||
      config.highlight?.component !== configRef.current.highlight?.component;
    const hasTextBoxPropsChanged =
      config.textBoxProps?.isClickable !==
        configRef.current.textBoxProps?.isClickable ||
      config.textBoxProps?.showNextIcon !==
        configRef.current.textBoxProps?.showNextIcon ||
      config.textBoxProps?.onClick !== configRef.current.textBoxProps?.onClick;

    if (hasPositionChanged || hasHighlightChanged || hasTextBoxPropsChanged) {
      configRef.current = config;
    }
  }, [
    config.position?.top,
    config.highlight?.selector,
    config.highlight?.component,
  ]);

  const isActiveStep = useMemo(() => {
    const currentStepValue = TUTORIAL_STEP_ORDER[currentStep];
    return currentStepValue === stepNumber;
  }, [currentStep, stepNumber]);

  const getContent = useCallback(
    (stepNumber: TUTORIAL_STEPS, subStep: number) => {
      const stepText = TUTORIAL_TEXTS[stepNumber];
      if (typeof stepText === "object" && stepText !== null) {
        return stepText[subStep.toString()] || "";
      }
      return typeof stepText === "string" ? stepText : "";
    },
    []
  );

  useEffect(() => {
    if (!isActiveStep) return;

    const content = getContent(stepNumber, subStep);
    const position = {
      ...DEFAULT_TUTORIAL_POSITION,
      ...(configRef.current.position || {}),
    };

    // NOTE: 개발용 로그, 배포 시 제거
    console.log("Step content:", {
      stepNumber,
      content,
      currentStep,
      isActiveStep,
      subStep,
    });

    setTutorialTextBoxPosition(position);
    setHighlightedButton({
      textBoxes: [content],
      position,
      textBoxProps: {
        isClickable: true,
        showNextIcon: false,
        ...configRef.current.textBoxProps,
      },
      ...(configRef.current.highlight && {
        highlightTarget: {
          component: configRef.current.highlight.component,
          selector: configRef.current.highlight.selector,
        },
      }),
    });

    return () => {
      if (isActiveStep) {
        setHighlightedButton(null);
        setTutorialTextBoxPosition(null);
      }
    };
  }, [isActiveStep, stepNumber, subStep]);

  const { stepConfig, highlightedButton } = useMemo(() => {
    const content = getContent(stepNumber, subStep);
    const position = {
      ...DEFAULT_TUTORIAL_POSITION,
      ...(configRef.current.position || {}),
    };

    const newStepConfig: TutorialStepConfig = {
      stepNumber,
      content,
      position,
      textBoxProps: {
        isClickable: true,
        showNextIcon: false,
        ...configRef.current.textBoxProps,
      },
    };

    const newHighlightedButton: HighlightedButton = {
      textBoxes: [content],
      position,
      textBoxProps: newStepConfig.textBoxProps,
      ...(configRef.current.highlight && {
        highlightTarget: {
          component: configRef.current.highlight.component,
          selector: configRef.current.highlight.selector,
        },
      }),
    };

    return {
      stepConfig: newStepConfig,
      highlightedButton: newHighlightedButton,
    };
  }, [stepNumber, subStep, getContent]);

  return {
    stepConfig,
    highlightedButton,
  };
}
