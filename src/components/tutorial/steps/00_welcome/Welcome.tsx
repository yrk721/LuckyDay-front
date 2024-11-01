import { useTutorialStep, LogoTooltip } from "components";
import { TUTORIAL_STEPS } from "../tutorialSteps";

export default function Welcome() {
  useTutorialStep(TUTORIAL_STEPS.WELCOME, {
    position: {
      top: "50%",
    },
    textBoxProps: {
      isClickable: true,
    },
  });

  return <LogoTooltip />;
}
