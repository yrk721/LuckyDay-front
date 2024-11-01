import { TUTORIAL_STEP_ORDER } from "./steps/tutorialSteps";

export const TUTORIAL_CONFIG = {
  position: {
    default: {
      top: "15%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  },
  steps: TUTORIAL_STEP_ORDER,
} as const;
