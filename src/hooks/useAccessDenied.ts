import { useEffect } from "react";
import { useToast } from "hooks";

export default function useAccessDenied() {
  const { addToast } = useToast();

  useEffect(() => {
    const handleAccessDenied = () => {
      addToast({
        content: "접근 권한이 없습니다.",
      });
      setTimeout(() => {
        window.history.back();
      }, 1000);
    };

    window.addEventListener("ACCESS_DENIED", handleAccessDenied);
    return () => {
      window.removeEventListener("ACCESS_DENIED", handleAccessDenied);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {};
}
