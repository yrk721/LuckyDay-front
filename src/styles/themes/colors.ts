export const colors = {
  black: "#323232",
  beige: "#FDF3CE",
  lightBeige: "#FAF8F2",
  lightBeige_opacity: "rgba(250, 248, 242, 0.9)",
  gray: "#ABAAAA",
  lightGray: "rgb(207, 207, 207)", //NOTE: 임시 추가
  orange: "#FF532C",
  lightOrange: "#FFB43E",
  purple: "#BD7DFF",
  lightPurple: "#EEDFF5",
  white: "#FFFFFF",
  background: "#FAF7F3",
} as const;

export type Colors = typeof colors;
