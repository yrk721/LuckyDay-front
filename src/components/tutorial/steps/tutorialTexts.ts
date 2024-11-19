import { TUTORIAL_STEPS } from "components";

type TutorialTextType = {
  [key in TUTORIAL_STEPS]?: string | { [key: string]: string };
};

export const TUTORIAL_TEXTS: TutorialTextType = {
  [TUTORIAL_STEPS.WELCOME]: `안녕하세요! <br />
            럭키 데이에 오신 것을 환영해요. <br /> <br />
            제가 럭키 데이를 만드는 방법을 보여드릴까요? <br />
            말풍선을 누르면 튜토리얼을 시작할 수 있어요.`,

  [TUTORIAL_STEPS.CREATE_CYCLE_BEFORE_BOARD]: `지금은 럭키보드가 비어있어요.<br />
            아래 플러스 버튼을 클릭하면<br />
            럭키 데이를 만들 수 있어요.`,

  // NOTE: createCycle 단계는 추후 추가 예정

  [TUTORIAL_STEPS.CHECK_AFTER_BOARD]: {
    "1": `짜잔~! 럭키 보드가 채워졌어요!<br />
          아직은 럭키 데이가 언제 올지 알 수 없어요.`,
    "2": `며칠 뒤,<br />
          이메일 알림을 받고 럭키 데이 당일에 접속해보면?`,
    "3": `럭키 볼이 보라색으로 바뀌었어요!<br /><br />
          럭키 볼을 클릭해서<br />
          오늘의 럭키 데이 활동을 확인해볼까요?`,
  },

  [TUTORIAL_STEPS.CHECK_VIEW_ACTIVITY]: `혼자 영화관 가기!<br />
              요즘 너무 바빴는데, 오랜만에 여유를 즐기러 가야겠어요.<br /><br />
              럭키 데이를 확인한 후,<br />
              아래 기록하기 버튼을 클릭하면 짧은 기록을 남길 수 있어요.`,

  [TUTORIAL_STEPS.CHECK_REVIEW]: `나의 기록은 [럭키 데이 보관함]에서<br />
              언제든지 찾아볼 수 있어요.<br /><br />
              럭키 데이 튜토리얼은 여기까지예요!`,

  [TUTORIAL_STEPS.FINISH]: `저와 함께해 주셔서 감사해요!<br /><br />
            이제 여러분만의<br />
            럭키 데이를 즐길 시간이에요.<br />
            <br />아래 로그인 버튼을 클릭하면 시작할 수 있어요.`,
};
