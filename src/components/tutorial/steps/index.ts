import { lazy } from "react";

export const TutorialSteps = [
  lazy(() => import("./00_welcome/Welcome")),
  lazy(() => import("./01_createCycle/01_beforeBoard/BeforeBoard")),
  lazy(() => import("./01_createCycle/02_selectActivity/SelectActivity")),
  lazy(() => import("./01_createCycle/03_setDate/SetDate")),
  lazy(() => import("./01_createCycle/04_setNumber/SetNumber")),
  lazy(() => import("./01_createCycle/05_exceptDate/ExceptDate")),
  lazy(() => import("./01_createCycle/06_confirm/Confirm")),
  lazy(() => import("./02_check/01_afterBoard/AfterBoard")),
  lazy(() => import("./02_check/02_viewActivity/ViewActivity")),
  lazy(() => import("./02_check/03_review/Review")),
  lazy(() => import("./03_finish/Finish")),
];
