import * as S from "./TutorialLayout.styled";
import React, { useState, useContext } from "react";
import { TutorialContext } from "../context/TutorialContext";
import { useTutorial } from "components/tutorial/hooks";
import { TutorialTextBox, CloseTutorialConfirmModal } from "components";
import { CloseIcon, CircleBoxIcon } from "assets";
import { SvgFrame } from "components/common";
import TutorialPage from "pages/tutorial/TutorialPage";

export default function TutorialLayout() {
  const { isTutorialActive, endTutorial, currentStep } = useTutorial();
  const { tutorialTextBoxPosition, highlightedButton } =
    useContext(TutorialContext);
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

  const renderTutorialTextBox = () => (
    <S.TutorialTextBoxWrapper
      style={isSpecialStep ? undefined : tutorialTextBoxPosition}
    >
      <TutorialTextBox currentStep={currentStep} />
    </S.TutorialTextBoxWrapper>
  );

  const renderHighlightedButton = () => {
    console.log("Rendering highlighted button:", highlightedButton);
    if (!highlightedButton) return null;

    let style: React.CSSProperties = {
      position: "absolute",
      zIndex: 999,
    };

    if (highlightedButton.selector) {
      const element = document.querySelector(highlightedButton.selector);
      if (element) {
        const rect = element.getBoundingClientRect();
        style = {
          ...style,
          top: `${rect.top}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
        };
      } else {
        console.log(
          "Element not found with selector:",
          highlightedButton.selector
        );
      }
    } else if (highlightedButton.position) {
      style = { ...style, ...highlightedButton.position };
    }

    return (
      <S.HighlightedButtonWrapper style={style}>
        {React.cloneElement(highlightedButton.component as React.ReactElement, {
          style: { width: "100%", height: "100%" },
        })}
      </S.HighlightedButtonWrapper>
    );
  };

  return (
    <>
      {!isSpecialStep && (
        <S.TutorialFullPage>
          <TutorialPage />
        </S.TutorialFullPage>
      )}
      <S.TutorialOverlay>
        {renderTutorialContent()}
        {isSpecialStep && renderTutorialTextBox()}
      </S.TutorialOverlay>
      {!isSpecialStep && renderTutorialTextBox()}
      {!isSpecialStep && renderHighlightedButton()}
      {showConfirmModal && (
        <CloseTutorialConfirmModal
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleConfirm}
        />
      )}
    </>
  );
}
