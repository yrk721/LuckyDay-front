import * as S from "./Layout.styled";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./header";
import { TutorialLayout, useTutorial } from "components/tutorial";

export default function Layout() {
  const { pathname } = useLocation();
  const { isTutorialActive } = useTutorial();

  const isHeaderVisible = !(pathname === "/404" || pathname === "/loading");

  return (
    <S.LayoutContainer>
      <S.Layout>
        {isHeaderVisible && (
          <S.HeaderContainer>
            <Header />
          </S.HeaderContainer>
        )}
        <S.Content>
          <Outlet />
        </S.Content>
        {isTutorialActive && <TutorialLayout />}
      </S.Layout>
    </S.LayoutContainer>
  );
}
