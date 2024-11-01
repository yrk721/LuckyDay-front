import * as S from "./TutorialLayout.styled";
import React, { useState, useContext } from "react";
import { TutorialContext } from "../context/TutorialContext";
import {
  useTutorial,
  TutorialTextBox,
  CloseTutorialConfirmModal,
  SvgFrame,
} from "components";
import { CloseIcon, CircleBoxIcon } from "assets";
import TutorialPage from "pages/tutorial/TutorialPage";

export default function TutorialLayout() {
  const { isTutorialActive, endTutorial, currentStep } = useTutorial();
  const { tutorialTextBoxPosition, highlightedButton } =
    useContext(TutorialContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleCloseClick = () => {
    setShowConfirmModal(true);
  };

  if (!isTutorialActive) return null;

  const isWelcomeStep = currentStep === 0;

  const renderHighlightedContent = () => {
    if (!highlightedButton) {
      return (
        <S.TutorialTextBoxWrapper
          style={isWelcomeStep ? undefined : tutorialTextBoxPosition}
        >
          <TutorialTextBox currentStep={currentStep} />
        </S.TutorialTextBoxWrapper>
      );
    }

    const renderHighlight = () => {
      if (!highlightedButton.highlightTarget) return null;

      let style: React.CSSProperties = {
        position: "absolute",
      };

      if (highlightedButton.highlightTarget.selector) {
        const element = document.querySelector(
          highlightedButton.highlightTarget.selector
        );
        if (element) {
          const rect = element.getBoundingClientRect();
          style = {
            ...style,
            top: `${rect.top}px`,
            left: `${rect.left}px`,
            width: `${rect.width}px`,
            height: `${rect.height}px`,
          };
        }
      }

      return (
        <S.HighlightedButtonWrapper className="with-component" style={style}>
          {highlightedButton.highlightTarget.component &&
            React.cloneElement(
              highlightedButton.highlightTarget.component as React.ReactElement,
              {
                style: { width: "100%", height: "100%" },
              }
            )}
        </S.HighlightedButtonWrapper>
      );
    };

    const renderTextBox = () => {
      const style = highlightedButton.position || {};

      return (
        <S.HighlightedButtonWrapper className="with-text-box" style={style}>
          <TutorialTextBox
            currentStep={currentStep}
            {...highlightedButton.textBoxProps}
          >
            {highlightedButton.textBoxes?.[0]}
          </TutorialTextBox>
        </S.HighlightedButtonWrapper>
      );
    };

    return (
      <>
        {renderHighlight()}
        {renderTextBox()}
      </>
    );
  };

  return (
    <>
      {showConfirmModal && (
        <CloseTutorialConfirmModal
          onClose={() => setShowConfirmModal(false)}
          onConfirm={endTutorial}
        />
      )}
      {!isWelcomeStep && (
        <S.TutorialFullPage>
          <TutorialPage />
          <S.LogoBox>
            <S.Logo_Basic />
            Lucky Day
          </S.LogoBox>
        </S.TutorialFullPage>
      )}
      <S.TutorialOverlay>
        <S.TutorialContent>
          <S.CloseButtonWrapper>
            <S.CloseButton onClick={handleCloseClick}>
              <SvgFrame css={S.svgFrame} icon={<CircleBoxIcon />} />
              <span>
                <CloseIcon />
              </span>
            </S.CloseButton>
          </S.CloseButtonWrapper>
          {isWelcomeStep && <TutorialPage />}
        </S.TutorialContent>
      </S.TutorialOverlay>
      {renderHighlightedContent()}
    </>
  );
}
