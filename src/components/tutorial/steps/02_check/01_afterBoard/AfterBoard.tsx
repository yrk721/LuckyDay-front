import * as S from "./AfterBoard.styled";
import {
  useTutorial,
  useTutorialStep,
  SvgFrame,
  CenteredSvgFrame,
} from "components";
import { CircleBoxIcon, ShortBoxIcon } from "assets";
import dayjs from "dayjs";

export default function AfterBoard() {
  const { handleSubStepClick } = useTutorial();

  useTutorialStep(7, {
    position: {
      top: "17%",
    },
    textBoxProps: {
      isClickable: true,
      showNextIcon: true,
      onClick: () => handleSubStepClick(3),
    },
  });

  const renderLuckyBall = (type: string, index: number) => {
    if (type.startsWith("face")) {
      const faceNumber = type.split("-")[1];
      return (
        <S.LuckyBallFace
          key={index}
          imageUrl={`/images/face-${faceNumber}.webp`}
        />
      );
    }

    return (
      <CenteredSvgFrame key={index} label="D-?">
        <SvgFrame css={S.LuckyBall_unknown} icon={<CircleBoxIcon />} />
      </CenteredSvgFrame>
    );
  };

  const luckyBalls = [
    "face-01",
    "unknown",
    "face-07",
    "unknown",
    "face-02",
    "face-03",
    "face-04",
  ];

  return (
    <S.Container>
      <S.TextBox>{dayjs().format("YYYY년 MM월 DD일")}</S.TextBox>
      <S.LuckyMachine>
        <S.LuckyBallsContainer>
          <S.RowBox>
            {luckyBalls
              .slice(0, 2)
              .map((type, index) => renderLuckyBall(type, index))}
          </S.RowBox>
          <S.RowBox>
            {luckyBalls
              .slice(2, 5)
              .map((type, index) => renderLuckyBall(type, index + 2))}
          </S.RowBox>
          <S.RowBox>
            {luckyBalls
              .slice(5, 7)
              .map((type, index) => renderLuckyBall(type, index + 5))}
          </S.RowBox>
        </S.LuckyBallsContainer>
      </S.LuckyMachine>
      <S.ButtonWrapper>
        <S.Button>
          <SvgFrame css={S.beigeIcon} icon={<ShortBoxIcon />} />
          <S.ButtonBox>지난 럭키데이</S.ButtonBox>
        </S.Button>
        <S.Button>
          <SvgFrame css={S.lightOrangeIcon} icon={<ShortBoxIcon />} />
          <S.ButtonBox isSecond>더보기</S.ButtonBox>
        </S.Button>
      </S.ButtonWrapper>
    </S.Container>
  );
}
