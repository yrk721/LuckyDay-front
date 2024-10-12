import { LogoTooltip, TutorialTextBox } from "components/tutorial";

export default function Step0_Welcome() {
  return (
    <>
      <LogoTooltip />
      <TutorialTextBox>
        안녕하세요! <br />
        럭키 데이에 오신 것을 환영해요. <br /> <br />
        제가 럭키 데이를 만드는 방법을 보여드릴까요? <br />
        아래 버튼을 한 번 더 클릭해 보세요.
      </TutorialTextBox>
    </>
  );
}
