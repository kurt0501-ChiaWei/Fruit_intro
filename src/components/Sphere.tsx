import type { CSSProperties } from "react";

type Props = {
  colors: [string, string, string];
  className?: string;
};

/** 玻璃亮面質感的水果色球 */
export default function Sphere({ colors, className = "" }: Props) {
  const style = {
    "--l": colors[0],
    "--b": colors[1],
    "--d": colors[2],
  } as CSSProperties;

  return <span aria-hidden className={`sphere block shrink-0 ${className}`} style={style} />;
}
