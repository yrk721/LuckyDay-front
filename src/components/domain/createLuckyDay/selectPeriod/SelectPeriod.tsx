import dayjs from "dayjs";
import { useFormContext } from "react-hook-form";

import { SvgFrame } from "components";
import { LUCKYDAY_PERIODS, LongBoxIcon } from "assets";
import type { CreateLuckyDayForm } from "types";
import * as S from "./SelectPeriod.styled";

function SelectPeriod() {
  const { watch, setValue } = useFormContext<CreateLuckyDayForm>();

  const selectPeriod = LUCKYDAY_PERIODS.find(
    (item) => item.period === watch("period")
  );

  const handleSelectPeriod = (period: string) => (): void => {
    const selectPeriod = LUCKYDAY_PERIODS.find((item) => item.label === period);

    setValue("period", selectPeriod?.period ?? 0);

    if (+period !== watch("period")) {
      setValue("cnt", 1);
      setValue("expDate", []);
    }
  };

  return (
    <>
      <S.HeadLine>
        <span>럭키 데이가 배정될 기간을 선택하세요.</span>
        <S.SubHeadLine>
          {dayjs().format("YYYY년 MM월 DD일")} 오늘로부터...
        </S.SubHeadLine>
      </S.HeadLine>
      <S.PeriodWrapper>
        {LUCKYDAY_PERIODS.map((period) => (
          <S.ActivityButton
            className={period.period === 30 ? "period" : ""}
            key={period.label}
            onClick={handleSelectPeriod(period.label)}
          >
            <SvgFrame
              css={S.icon(watch("period") === period.period)}
              icon={<LongBoxIcon />}
            />
            <S.ActivityInfo>
              <S.ActivityTitle>{period.label}</S.ActivityTitle>
            </S.ActivityInfo>
          </S.ActivityButton>
        ))}
      </S.PeriodWrapper>
      {!!watch("period") && (
        <S.SelectInfo>
          최대 <strong>{selectPeriod?.cnt}개</strong>의 럭키 데이를 선택할 수
          있어요.
        </S.SelectInfo>
      )}
    </>
  );
}

export default SelectPeriod;
