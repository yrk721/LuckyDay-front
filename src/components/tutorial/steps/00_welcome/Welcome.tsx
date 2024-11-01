import { useTutorialStep, LogoTooltip } from "components";

export default function Welcome() {
  useTutorialStep(0, {
    position: {
      top: "50%",
    },
    textBoxProps: {
      isClickable: true,
    },
  });

  return <LogoTooltip />;
}
