import { Global, ThemeProvider } from "@emotion/react";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTokenExpiration } from "hooks";

import { TutorialProvider, TutorialLayout, Modal, Toast } from "components";
import { globalStyle, theme } from "styles";
import Router from "router/Router";
import "./styles/fonts.css";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import "dayjs/locale/ko"; // 한국어 가져오기

dayjs.extend(relativeTime);
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.locale("ko");

const queryClient = new QueryClient();

export default function App() {
  useTokenExpiration();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Global styles={globalStyle} />
          <TutorialProvider>
            <Router>
              <Modal />
              <Toast />
            </Router>
            <TutorialLayout />
          </TutorialProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
