import {
  ReactNode,
  useState,
  useEffect,
  useCallback,
  createContext,
} from "react";
import { TUTORIAL_CONFIG } from "../config";
import { TUTORIAL_STEP_ORDER } from "../steps/tutorialSteps";
import { HighlightedButton, TutorialTextBoxPosition } from "types";

const TOTAL_STEPS = TUTORIAL_STEP_ORDER.length;

interface TutorialContextType {
  isTutorialActive: boolean;
  setIsTutorialActive: (value: boolean) => void;
  startTutorial: () => void;
  endTutorial: () => void;
  nextStep: () => void;
  subStep: number;
  setSubStep: (value: number) => void;
  handleSubStepClick: (maxSubSteps: number) => void;
  currentStep: number;
  isLastStep: boolean;
  tutorialTextBoxPosition: TutorialTextBoxPosition;
  setTutorialTextBoxPosition: (
    position: TutorialTextBoxPosition | null
  ) => void;
  highlightedButton: HighlightedButton | null;
  setHighlightedButton: (button: HighlightedButton | null) => void;
}

export const TutorialContext = createContext<TutorialContextType>({
  isTutorialActive: false,
  setIsTutorialActive: () => {},
  startTutorial: () => {},
  endTutorial: () => {},
  nextStep: () => {},
  subStep: 1,
  setSubStep: () => {},
  handleSubStepClick: () => {},
  currentStep: 0,
  isLastStep: false,
  tutorialTextBoxPosition: TUTORIAL_CONFIG.position.default,
  setTutorialTextBoxPosition: () => {},
  highlightedButton: null,
  setHighlightedButton: () => {},
});

interface TutorialProviderProps {
  children: ReactNode;
}

export default function TutorialProvider({ children }: TutorialProviderProps) {
  const [isTutorialActive, setIsTutorialActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [subStep, setSubStep] = useState(1);
  const [tutorialTextBoxPosition, setTutorialTextBoxPosition] =
    useState<TutorialTextBoxPosition>(TUTORIAL_CONFIG.position.default);
  const [highlightedButton, setHighlightedButton] =
    useState<HighlightedButton | null>(null);

  useEffect(() => {
    setIsLastStep(currentStep === TOTAL_STEPS - 1);
  }, [currentStep]);

  const startTutorial = () => {
    setIsTutorialActive(true);
    setCurrentStep(0);
  };

  const endTutorial = useCallback(() => {
    setIsTutorialActive(false);
    setCurrentStep(0);
    setSubStep(1);
    setTutorialTextBoxPosition(TUTORIAL_CONFIG.position.default);
    setHighlightedButton(null);
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      const next =
        prev === TOTAL_STEPS - 1 ? 0 : Math.min(prev + 1, TOTAL_STEPS - 1);
      if (next === 0) {
        endTutorial();
      }
      return next;
    });
  }, [endTutorial]);

  const handleSubStepClick = useCallback(
    (maxSubSteps: number) => {
      setSubStep((prev) => {
        if (prev >= maxSubSteps) {
          nextStep();
          return 1;
        }
        return prev + 1;
      });
    },
    [nextStep]
  );

  const setTutorialTextBoxPositionWithDefault = useCallback(
    (position: TutorialTextBoxPosition | null) => {
      setTutorialTextBoxPosition(position || TUTORIAL_CONFIG.position.default);
    },
    []
  );

  return (
    <TutorialContext.Provider
      value={{
        isTutorialActive,
        setIsTutorialActive,
        startTutorial,
        endTutorial,
        nextStep,
        subStep,
        setSubStep,
        handleSubStepClick,
        currentStep,
        isLastStep,
        tutorialTextBoxPosition,
        setTutorialTextBoxPosition: setTutorialTextBoxPositionWithDefault,
        highlightedButton,
        setHighlightedButton,
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
}
