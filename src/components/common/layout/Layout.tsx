import * as S from "./Layout.styled";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./header";
import { useTutorial } from "components/tutorial/hooks";
import { TutorialLayout } from "components/tutorial/layout";

export default function Layout() {
  const { pathname } = useLocation();
  const { isTutorialActive } = useTutorial();

  return (
    <S.LayoutContainer>
      <S.Layout>
        {!(pathname === "/loading" || pathname === "/404") && <Header />}
        <Outlet />
        {isTutorialActive && <TutorialLayout />}
      </S.Layout>
    </S.LayoutContainer>
  );
}
