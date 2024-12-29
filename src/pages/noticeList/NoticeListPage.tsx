import * as S from "./NoticeListPage.styled";
import { useNavigate } from "react-router-dom";
import { SingleButtonLayout } from "components";
import { NOTICE_DETAILS } from "constants/notice";

interface NoticeMenuProps {
  id: string;
  title: string;
  date: string;
  onClick: (id: string) => void;
}

const NoticeMenu = ({ id, title, date, onClick }: NoticeMenuProps) => (
  <S.MenuBox onClick={() => onClick(id)}>
    {title}
    <S.DateBox>{date}</S.DateBox>
  </S.MenuBox>
);

export default function NoticeListPage() {
  const navigate = useNavigate();

  const handleMoveToNoticeDetail = (id: string) => {
    navigate(`/notice/${id}`);
  };

  const sortedNotices = [...NOTICE_DETAILS].sort((a, b) => {
    return Number(b.id) - Number(a.id);
  });

  return (
    <SingleButtonLayout>
      <S.TitleBox>공지사항</S.TitleBox>
      <S.ContentsBox>
        {sortedNotices.map((notice) => (
          <NoticeMenu
            key={notice.id}
            id={notice.id}
            title={notice.title}
            date={notice.date}
            onClick={handleMoveToNoticeDetail}
          />
        ))}
      </S.ContentsBox>
    </SingleButtonLayout>
  );
}
