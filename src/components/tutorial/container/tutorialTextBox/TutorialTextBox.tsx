import * as S from "./TutorialTextBox.styled";
import { useTutorial } from "components/tutorial/hooks";
import { tutorialTexts } from "components/tutorial/steps/tutorialTexts";
import { ArrowIcon } from "assets";

interface TutorialTextBoxProps {
  currentStep?: number;
  children?: React.ReactNode;
  showNextIcon?: boolean;
  onClick?: () => void;
}

export default function TutorialTextBox({
  currentStep,
  children,
  showNextIcon = false,
  onClick,
}: TutorialTextBoxProps) {
  const {
    nextStep,
    currentStep: contextCurrentStep,
    endTutorial,
    isLastStep,
  } = useTutorial();

  const handleClick = () => {
    console.log(`Current Step: ${contextCurrentStep}`);
    if (onClick) {
      onClick();
    } else {
      nextStep();
      if (isLastStep) {
        console.log("튜토리얼 종료!!");
        endTutorial();
      }
    }
  };

  const content =
    children ||
    (currentStep !== undefined ? tutorialTexts[currentStep] || "" : "");

  return (
    <S.Container onClick={handleClick}>
      {typeof content === "string" ? (
        <S.TextBox dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <S.TextBox>{content}</S.TextBox>
      )}
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
