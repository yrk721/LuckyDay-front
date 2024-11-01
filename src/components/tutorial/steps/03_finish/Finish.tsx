import * as S from "./Finish.styled";
import {
  KakaoLogin,
  LogoTooltip,
  useTutorialStep,
  TutorialStartButton,
} from "components";
import { TUTORIAL_STEPS } from "../tutorialSteps";
import { ArrowIcon } from "assets";

export default function Finish() {
  useTutorialStep(TUTORIAL_STEPS.FINISH, {
    position: {
      top: "50%",
    },
    textBoxProps: {
      isClickable: true,
    },
    highlight: {
      selector: ".kakao-login-button",
      component: (
        <>
          <S.LogoTooltipWrapper>
            <LogoTooltip />
          </S.LogoTooltipWrapper>
          <KakaoLogin />
        </>
      ),
    },
  });

  return (
    <S.FinishContainer>
      <S.ContentsBox>
        <S.TextBox>
          럭키 데이
          <br />
          무작위로 찾아오는 나만의 행운의 날
        </S.TextBox>
        <S.ImageWrapper>
          <S.LandingImage src="/images/landing/landing-01.webp" />
        </S.ImageWrapper>
        <S.ButtonContainer>
          <S.DotContainer>
            {[...Array(6)].map((_, index) => (
              <S.Dot key={index} active={index === 0} />
            ))}
          </S.DotContainer>
          <S.NextButton>
            <ArrowIcon css={S.NextArrowIcon} />
          </S.NextButton>
        </S.ButtonContainer>
      </S.ContentsBox>
      <div className="kakao-login-button">
        <KakaoLogin />
      </div>
      <TutorialStartButton />
    </S.FinishContainer>
  );
}
