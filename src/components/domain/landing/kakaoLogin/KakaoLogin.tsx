import { BASE_URL } from "config";
import { useTheme } from "@emotion/react";
import { SvgButton } from "components/common";
import { LongBoxIcon } from "assets";

export default function KakaoLogin() {
  const theme = useTheme();

  const handleLogin = () => {
    window.location.href = `${BASE_URL}/users/sign-in`;
  };

  return (
    <SvgButton
      label="카카오로 로그인"
      onClick={handleLogin}
      icon={<LongBoxIcon />}
      fillColor={theme.colors.lightOrange}
    />
  );
}
