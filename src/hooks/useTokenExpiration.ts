import { useEffect } from "react";
import { useToast } from "hooks";
import { logout } from "apis/users";

export default function useTokenExpiration() {
  const { addToast } = useToast();

  useEffect(() => {
    const handleTokenExpiration = async () => {
      try {
        await logout();
        sessionStorage.clear();
        addToast({
          content: "토큰이 만료되었습니다. 다시 로그인해 주세요.",
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } catch (e) {
        console.error("로그아웃 처리 실패", e);
        addToast({
          content: "로그아웃 처리 중 오류가 발생했습니다.",
        });
      }
    };

    window.addEventListener("TOKEN_EXPIRED", handleTokenExpiration);
    return () => {
      window.removeEventListener("TOKEN_EXPIRED", handleTokenExpiration);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {};
}
