import * as S from "./TutorialPage.styled";
import { useTutorial } from "components/tutorial/hooks";
import { TutorialSteps } from "components/tutorial/steps";
import { TUTORIAL_STEPS } from "components/tutorial/steps/constants";

export default function TutorialPage() {
  const { currentStep } = useTutorial();

  const renderCurrentStep = (): React.ReactNode => {
    const CurrentStepComponent = TutorialSteps[currentStep];
    return CurrentStepComponent ? <CurrentStepComponent /> : null;
  };

  return (
    <>
      {currentStep === TUTORIAL_STEPS.WELCOME ||
      currentStep === TUTORIAL_STEPS.FINISH ? (
        renderCurrentStep()
      ) : (
        <S.TutorialLayoutContainer>
          <S.Layout>{renderCurrentStep()}</S.Layout>
        </S.TutorialLayoutContainer>
      )}
    </>
  );
}
