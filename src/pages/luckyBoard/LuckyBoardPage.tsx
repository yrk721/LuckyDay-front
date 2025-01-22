import * as S from "./LuckyBoardPage.styled";
import { LuckyBoardAfterPage, LuckyBoardBeforePage } from ".";
import { ArchiveModal, ButtonLayout } from "components";
import { useModal, useToast } from "hooks";
import {
  useGetLuckyDayCycle,
  useGetLuckyDayCycleInfo,
  useGetLuckyDayCycleLastLuckyDays,
} from "services";

export default function LuckyBoardPage() {
  const hasLuckyday = sessionStorage.getItem("hasLuckyday")!;
  const isExperienced = sessionStorage.getItem("isExperienced")!;

  const { data } = useGetLuckyDayCycle({
    hasLuckyday: +hasLuckyday,
    query: { isCurrent: 1 },
  });
  const { data: lastLuckyDays } = useGetLuckyDayCycleLastLuckyDays({
    query: { isCurrent: 0 },
  });
  const { data: cycleInfo } = useGetLuckyDayCycleInfo(
    data?.[0].cyclNo ?? 0,
    !!data
  );

  const { handleOpenModal, handleModalClose } = useModal();
  const { addToast } = useToast();

  const handleOpenLastLuckyDayModal = () => {
    if (!lastLuckyDays && !data?.[0].cyclNo) return;

    const filteredLastInfo =
      lastLuckyDays?.filter((item) => item.dday !== 1 && item.date !== null) ||
      [];

    handleOpenModal(
      <ArchiveModal
        css={S.archiveModal}
        lastInfo={filteredLastInfo}
        isMoreInfoModal={false}
        onClose={handleModalClose}
      />
    );
  };

  const handleOpenCheckLuckyDayModal = () => {
    if (!cycleInfo) {
      return addToast({ content: "진행 중인 럭키 데이 정보가 없어요." });
    }

    handleOpenModal(
      <ArchiveModal
        css={S.archiveModal}
        cycleInfo={cycleInfo}
        isMoreInfoModal={true}
        onClose={handleModalClose}
      />
    );
  };

  return (
    <ButtonLayout
      variant="hasColor"
      firstLabel="지난 럭키데이"
      secondLabel="더보기"
      isHideButtons={isExperienced === "0"}
      handleClickFirstButton={handleOpenLastLuckyDayModal}
      handleClickSecondButton={handleOpenCheckLuckyDayModal}
    >
      {data ? <LuckyBoardAfterPage /> : <LuckyBoardBeforePage data={data} />}
    </ButtonLayout>
  );
}
