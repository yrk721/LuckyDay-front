import * as S from "./TutorialPage.styled";
import { useTutorial } from "components/tutorial/hooks";
import { TutorialSteps } from "components/tutorial/steps";

export default function TutorialPage() {
  const { currentStep } = useTutorial();

  const renderCurrentStep = (): React.ReactNode => {
    if (currentStep === 0) {
      return <TutorialSteps.Step0_Welcome />;
    } else if (currentStep === 24) {
      return <TutorialSteps.Step24_Finish />;
    } else {
      const StepComponent =
        TutorialSteps[
          `Step${currentStep}_CreateCycle1` as keyof typeof TutorialSteps
        ];
      return StepComponent ? <StepComponent /> : null;
    }
  };

  return (
    <>
      {currentStep === 0 || currentStep === 24 ? (
        renderCurrentStep()
      ) : (
        <S.TutorialLayoutContainer>
          <S.Layout>{renderCurrentStep()}</S.Layout>
        </S.TutorialLayoutContainer>
      )}
    </>
  );
}
