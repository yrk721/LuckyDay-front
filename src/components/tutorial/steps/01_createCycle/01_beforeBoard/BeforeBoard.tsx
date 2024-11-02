import * as S from "./BeforeBoard.styled";
import { useTutorial, useTutorialStep, TUTORIAL_STEPS } from "components";
import { CreateLuckyDayButton } from "components/domain/luckyBoard/createLuckyDayButton/CreateLuckyDayButton.styled";
import { PlusIcon } from "assets";

export default function BeforeBoard() {
  const { nextStep } = useTutorial();

  useTutorialStep(TUTORIAL_STEPS.CREATE_CYCLE_BEFORE_BOARD, {
    position: {
      top: "40%",
    },
    textBoxProps: {
      isClickable: true,
    },
    highlight: {
      selector: ".create-cycle-button",
      component: (
        <CreateLuckyDayButton onClick={nextStep}>
          <PlusIcon />
        </CreateLuckyDayButton>
      ),
    },
  });

  return (
    <S.Container>
      <S.TextBox>
        아직 만들어진 럭키 데이가 없어요. <br />
        클릭해서 럭키 데이를 만들어 보세요.
      </S.TextBox>
      <S.LuckyMachine>
        <div className="create-cycle-button">
          <CreateLuckyDayButton onClick={nextStep}>
            <PlusIcon />
          </CreateLuckyDayButton>
        </div>
      </S.LuckyMachine>
    </S.Container>
  );
}
