import * as S from "./LandingPage.styled";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel, KakaoLogin, TutorialStartButton } from "components";
import { LANDING_CONTENTS } from "constants/landing";
import Cookies from "js-cookie";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      navigate("/luckyboard");
    }
  }, [navigate]);

  return (
    <S.Landing>
      <S.ContentsBox>
        <Carousel
          images={LANDING_CONTENTS.images}
          texts={LANDING_CONTENTS.texts}
        />
        {!Cookies.get("accessToken") && <KakaoLogin />}
        <TutorialStartButton />
      </S.ContentsBox>
    </S.Landing>
  );
}
