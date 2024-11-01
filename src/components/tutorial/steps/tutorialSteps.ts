import React from "react";

export const TUTORIAL_STEPS = {
  WELCOME: "0",
  CREATE_CYCLE: {
    BEFORE_BOARD: "1",
    SELECT_ACTIVITY: "2",
    SET_DATE: "3",
    SET_NUMBER: "4",
    EXCEPT_DATE: "5",
    CONFIRM: "6",
  },
  CHECK: {
    AFTER_BOARD: "7",
    VIEW_ACTIVITY: "8",
    REVIEW: "9",
  },
  FINISH: "10",
} as const;

export const TUTORIAL_STEP_ORDER = [
  TUTORIAL_STEPS.WELCOME,
  TUTORIAL_STEPS.CREATE_CYCLE.BEFORE_BOARD,
  // TUTORIAL_STEPS.CREATE_CYCLE.SELECT_ACTIVITY,
  // TUTORIAL_STEPS.CREATE_CYCLE.SET_DATE,
  // TUTORIAL_STEPS.CREATE_CYCLE.SET_NUMBER,
  // TUTORIAL_STEPS.CREATE_CYCLE.EXCEPT_DATE,
  // TUTORIAL_STEPS.CREATE_CYCLE.CONFIRM,
  TUTORIAL_STEPS.CHECK.AFTER_BOARD,
  // TUTORIAL_STEPS.CHECK.VIEW_ACTIVITY,
  // TUTORIAL_STEPS.CHECK.REVIEW,
  TUTORIAL_STEPS.FINISH,
];

export type TutorialStepKey = (typeof TUTORIAL_STEP_ORDER)[number];

// 컴포넌트 매핑
export const TUTORIAL_COMPONENTS: Record<TutorialStepKey, React.ComponentType> =
  {
    "0": React.lazy(() => import("./00_welcome/Welcome")),
    "1": React.lazy(
      () => import("./01_createCycle/01_beforeBoard/BeforeBoard")
    ),
    // "2": React.lazy(
    //   () => import("./01_createCycle/02_selectActivity/SelectActivity")
    // ),
    // "3": React.lazy(() => import("./01_createCycle/03_setDate/SetDate")),
    // "4": React.lazy(() => import("./01_createCycle/04_setNumber/SetNumber")),
    // "5": React.lazy(() => import("./01_createCycle/05_exceptDate/ExceptDate")),
    // "6": React.lazy(() => import("./01_createCycle/06_confirm/Confirm")),
    "7": React.lazy(() => import("./02_check/01_afterBoard/AfterBoard")),
    // "8": React.lazy(() => import("./02_check/02_viewActivity/ViewActivity")),
    // "9": React.lazy(() => import("./02_check/03_review/Review")),
    "10": React.lazy(() => import("./03_finish/Finish")),
  };
