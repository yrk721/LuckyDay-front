import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import type { UseFormHandleSubmit, UseFormWatch } from "react-hook-form";

import { ConfirmModal } from "components";
import { useModal, useToast } from "hooks";
import { useCreateLuckyDay } from "services";
import { formatDate } from "utils";
import type { CreateLuckyDayForm } from "types";
import * as S from "./CreateLuckyDayModal.styled";

interface CreateLuckyDayModalProps {
  watch: UseFormWatch<CreateLuckyDayForm>;
  handleSubmit: UseFormHandleSubmit<CreateLuckyDayForm>;
}

function CreateLuckyDayModal({
  watch,
  handleSubmit,
}: CreateLuckyDayModalProps) {
  const navigate = useNavigate();

  const { mutate: createLuckyDayMutate } = useCreateLuckyDay();

  const { handleModalClose } = useModal();
  const { addToast } = useToast();

  const EndOfDate = dayjs(dayjs())
    .add(+watch("period"), "day")
    .subtract(1, "day")
    .format("YYYY년 MM월 DD일");

  const handleClick = handleSubmit((data) => {
    const filteredActs = data.acts
      .flatMap((item) => item.selectedActs)
      .filter((item): item is number => item !== undefined);

    const addCustomActs = Array.from(
      { length: data.customActs?.length ?? 0 },
      () => 0
    );

    const req = {
      body: {
        actList: [...filteredActs, ...addCustomActs],
        customActList: data.customActs,
        period: data.period,
        cnt: data.cnt,
        expDate: data.expDate,
      },
    };

    createLuckyDayMutate(req, {
      onSuccess: (res) => {
        if (res.code !== "SU") {
          return addToast({ content: res.message });
        }

        handleModalClose();
        sessionStorage.setItem("hasLuckyday", "1");
        sessionStorage.setItem("isExperienced", "1");
        navigate("/loading", { state: "create" });
      },
    });
  });

  const expDatesFormatted = watch("expDate")
    ?.map((item) => `${formatDate(item, "YYYY-MM-DD")}\n`)
    .join("")
    .replace(/,/g, "");

  const subTitle = (
    <p>
      생성 옵션:
      <br />
      {dayjs().format("YYYY년 MM월 DD일")}
      <br />~ {EndOfDate}
      <br />
      {<strong>{watch("period")}</strong>}일 동안{" "}
      <strong>{watch("cnt")}</strong>개의 럭키 데이
      <br />
      {expDatesFormatted ? `\n제외 날짜:\n${expDatesFormatted}` : ""}
    </p>
  );

  return (
    <ConfirmModal
      css={S.modal(!!expDatesFormatted?.length)}
      title="럭키 데이를 생성하시겠어요?"
      subTitle={subTitle}
      desc={`한 번 제출한 럭키 데이 옵션은 수정할 수 없으며,\n활동과 날짜는 랜덤 배정됩니다.`}
      baseLabel="생성하기"
      handleBaseClick={handleClick}
    />
  );
}

export default CreateLuckyDayModal;
