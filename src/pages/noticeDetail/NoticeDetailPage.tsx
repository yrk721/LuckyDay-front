import * as S from "./NoticeDetailPage.styled";
import { useParams } from "react-router-dom";
import { SingleButtonLayout } from "components";
import { NOTICE_DETAILS } from "constants/notice";

export default function NoticeDetailPage() {
  const { id } = useParams();

  const notice = NOTICE_DETAILS.find((notice) => notice.id === id);

  if (!notice) {
    return (
      <S.ContentsBox>
        <S.NoticeTitle>공지사항을 찾을 수 없습니다.</S.NoticeTitle>
      </S.ContentsBox>
    );
  }

  return (
    <SingleButtonLayout>
      <S.TitleBox>공지사항</S.TitleBox>
      <S.ContentsBox>
        <S.NoticeTitle>
          {notice.title}
          <S.NoticeDate>{notice.date}</S.NoticeDate>
        </S.NoticeTitle>
        <S.NoticeContent>{notice.content}</S.NoticeContent>
      </S.ContentsBox>
    </SingleButtonLayout>
  );
}
