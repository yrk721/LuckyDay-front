import * as S from "./TutorialLayout.styled";
import { useState } from "react";
import { useTutorial } from "components/tutorial/hooks";
import { TutorialTextBox } from "components";
import { SvgFrame } from "components/common";
import { CloseIcon, CircleBoxIcon } from "assets";
import TutorialPage from "pages/tutorial/TutorialPage";
import CloseTutorialConfirmModal from "../container/closeTutorialConfirmModal/CloseTutorialConfirmModal";

export default function TutorialLayout() {
  const { isTutorialActive, endTutorial, currentStep } = useTutorial();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleCloseClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    endTutorial();
  };

  if (!isTutorialActive) return null;

  const isSpecialStep = currentStep === 0 || currentStep === 24;

  const renderCloseButton = () => (
    <S.CloseButtonWrapper>
      <S.CloseButton onClick={handleCloseClick}>
        <SvgFrame css={S.svgFrame} icon={<CircleBoxIcon />} />
        <span>
          <CloseIcon />
        </span>
      </S.CloseButton>
    </S.CloseButtonWrapper>
  );

  const renderTutorialContent = () => (
    <S.TutorialContent>
      {renderCloseButton()}
      {isSpecialStep && <TutorialPage />}
    </S.TutorialContent>
  );

  return (
    <>
      {!isSpecialStep && (
        <S.TutorialFullPage>
          <TutorialPage />
        </S.TutorialFullPage>
      )}
      <S.TutorialOverlay>{renderTutorialContent()}</S.TutorialOverlay>
      <S.TutorialTextBoxWrapper>
        <TutorialTextBox currentStep={currentStep} />
      </S.TutorialTextBoxWrapper>
      {showConfirmModal && (
        <CloseTutorialConfirmModal
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
