import * as S from "./TutorialTextBox.styled";
import { useMemo } from "react";
import { useTutorial, TUTORIAL_STEPS, TUTORIAL_TEXTS } from "components";
import { ArrowIcon } from "assets";

interface TutorialTextBoxProps {
  currentStep?: TUTORIAL_STEPS;
  children?: React.ReactNode;
  showNextIcon?: boolean;
  isClickable?: boolean;
  onClick?: () => void;
}

export default function TutorialTextBox({
  currentStep,
  children,
  showNextIcon = false,
  isClickable = true,
  onClick,
}: TutorialTextBoxProps) {
  const {
    nextStep,
    currentStep: contextCurrentStep,
    endTutorial,
    isLastStep,
  } = useTutorial();

  const handleClick = () => {
    if (!isClickable) return;

    console.log(`Current Step: ${contextCurrentStep}`);
    if (onClick) {
      onClick();
    } else {
      if (isLastStep) {
        console.log("튜토리얼 종료!!");
        endTutorial();
      } else {
        nextStep();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isClickable && (e.key === "Enter" || e.key === " ")) {
      handleClick();
    }
  };

  const content = useMemo(() => {
    if (children) return children;
    if (!currentStep) return "";

    const stepText = TUTORIAL_TEXTS[currentStep as TUTORIAL_STEPS];

    if (typeof stepText === "object" && stepText !== null) {
      const subStepMatch = currentStep.toString().match(/\d+\.(\d+)/);
      if (subStepMatch) {
        return stepText[subStepMatch[1]] || "";
      }
      return stepText["1"] || "";
    }

    return stepText || "";
  }, [children, currentStep]);

  return (
    <S.Container
      onClick={handleClick}
      role={isClickable ? "button" : "text"}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={handleKeyDown}
      aria-label={isClickable ? "다음 단계로 이동" : undefined}
    >
      <S.TextBox dangerouslySetInnerHTML={{ __html: content }} />
      {showNextIcon && (
        <S.NextIconWrapper>
          <S.NextIcon>
            <ArrowIcon />
          </S.NextIcon>
        </S.NextIconWrapper>
      )}
    </S.Container>
  );
}
