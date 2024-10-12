import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";

// 튜토리얼의 총 단계 수를 상수로 정의
const TOTAL_STEPS = 25; // 0부터 24까지 (0: 시작, 24: 종료)

interface TutorialContextType {
  isTutorialActive: boolean;
  setIsTutorialActive: (value: boolean) => void;
  startTutorial: () => void;
  endTutorial: () => void;
  nextStep: () => void;
  prevStep: () => void;
  currentStep: number;
  isLastStep: boolean;
}

export const TutorialContext = createContext<TutorialContextType>({
  isTutorialActive: false,
  setIsTutorialActive: () => {},
  startTutorial: () => {},
  endTutorial: () => {},
  nextStep: () => {},
  prevStep: () => {},
  currentStep: 0,
  isLastStep: false,
});

interface TutorialProviderProps {
  children: ReactNode;
}

export default function TutorialProvider({ children }: TutorialProviderProps) {
  const [isTutorialActive, setIsTutorialActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);

  // NOTE: currentStep이 변경될 때마다 isLastStep 업데이트
  useEffect(() => {
    setIsLastStep(currentStep === TOTAL_STEPS - 1);
  }, [currentStep]);

  const startTutorial = useCallback(() => {
    setIsTutorialActive(true);
    setCurrentStep(0);
  }, []);

  const endTutorial = useCallback(() => {
    setIsTutorialActive(false);
    setCurrentStep(0);
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      if (prev === TOTAL_STEPS - 1) {
        console.log("튜토리얼 종료!!");
        endTutorial();
        return 0;
      }
      return Math.min(prev + 1, TOTAL_STEPS - 1);
    });
  }, [endTutorial]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  return (
    <TutorialContext.Provider
      value={{
        isTutorialActive,
        setIsTutorialActive,
        startTutorial,
        endTutorial,
        nextStep,
        prevStep,
        currentStep,
        isLastStep,
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
}
