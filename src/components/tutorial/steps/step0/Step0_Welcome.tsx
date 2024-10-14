import { LogoTooltip, TutorialTextBox } from "components/tutorial";

export default function Step0_Welcome() {
  return (
    <>
      <LogoTooltip />
      <TutorialTextBox currentStep={0} />
    </>
  );
}
