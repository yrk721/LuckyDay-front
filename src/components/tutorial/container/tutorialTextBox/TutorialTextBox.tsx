import * as S from "./TutorialTextBox.styled";
import { useTutorial } from "components/tutorial/hooks";

interface TutorialTextBoxProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function TutorialTextBox({
  children,
  onClick,
}: TutorialTextBoxProps) {
  const { nextStep } = useTutorial();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      nextStep();
    }
  };

  return (
    <S.Container onClick={handleClick}>
      <S.TextBox>{children}</S.TextBox>
    </S.Container>
  );
}
