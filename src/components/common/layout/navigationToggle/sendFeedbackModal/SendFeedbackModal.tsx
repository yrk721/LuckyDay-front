import * as S from "./SendFeedbackModal.styled";
import { useForm } from "react-hook-form";
import { useTheme } from "@emotion/react";
import { BaseModal, SvgButton } from "components/common";
import { ShortBoxIcon } from "assets";

interface SendFeedbackModalProps {
  onClose: () => void;
  onConfirm: (data: { feedback: string }) => void;
}

export default function SendFeedbackModal({
  onClose,
  onConfirm,
}: SendFeedbackModalProps) {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<{ feedback: string }>();

  const feedbackValue = watch("feedback", "");

  if (feedbackValue.length > 160 && !errors.feedback) {
    setError("feedback", {
      type: "manual",
      message: "피드백은 160자 이내로 작성해 주세요.",
    });
  } else if (feedbackValue.length <= 160 && errors.feedback) {
    clearErrors("feedback");
  }

  const onSubmit = (data: { feedback: string }) => {
    onConfirm(data);
  };

  const isButtonDisabled =
    feedbackValue.length === 0 || feedbackValue.length > 160;

  return (
    <BaseModal>
      <S.ModalContainer>
        <S.Text_h1>피드백을 보내주세요.</S.Text_h1>
        <S.Textarea
          {...register("feedback")}
          placeholder="개선점이나 제안사항을 보내주시면, 럭키데이 서비스 발전에 큰 도움이 됩니다."
        />
        <S.ErrorText>
          {errors.feedback ? errors.feedback.message : ""}
        </S.ErrorText>
        <S.CharCount>{feedbackValue.length}/160</S.CharCount>
        <S.ButtonBox>
          <SvgButton
            label="취소"
            onClick={onClose}
            icon={<ShortBoxIcon />}
            width="100px"
            height="42px"
          />
          <SvgButton
            label="보내기"
            onClick={handleSubmit(onSubmit)}
            icon={<ShortBoxIcon />}
            textColor={
              isButtonDisabled ? theme.colors.black : theme.colors.white
            }
            fillColor={theme.colors.purple}
            width="100px"
            height="42px"
            disabled={isButtonDisabled}
          />
        </S.ButtonBox>
      </S.ModalContainer>
    </BaseModal>
  );
}
