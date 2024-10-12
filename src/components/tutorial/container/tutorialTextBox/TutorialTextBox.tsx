import * as S from "./TutorialTextBox.styled";
import { useTutorial } from "components/tutorial/hooks";
import { tutorialTexts } from "components/tutorial/steps/tutorialTexts";

interface TutorialTextBoxProps {
  currentStep?: number;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function TutorialTextBox({
  currentStep,
  children,
  onClick,
}: TutorialTextBoxProps) {
  const {
    nextStep,
    currentStep: contextCurrentStep,
    endTutorial,
  } = useTutorial();

  const handleClick = () => {
    console.log(`Current Step: ${contextCurrentStep}`);
    if (onClick) {
      onClick();
    } else if (contextCurrentStep === 24) {
      endTutorial();
    } else {
      nextStep();
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
    </S.Container>
  );
}
