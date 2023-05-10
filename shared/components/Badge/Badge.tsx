import React, { useMemo } from "react";
import styles from "./badge.module.css";

export interface BadgeProps {
  /**
   * 顯示在徽章上的數字或內容。它可以是一個React元素，例如一個圖標，或者一個字符串或數字。默認值為null。
   */
  count?: React.ReactNode;
  /**
   * 當count的值大於overflowCount時，顯示在徽章上的數字會被截斷，以 ${overflowCount}+ 代替。默認值為99。
   */
  overflowCount?: number;
  /**
   * 如果為true，則徽章將只顯示一個點，而不是數字或內容。如果為false，徽章將顯示count的內容。默認為false。
   */
  dot?: boolean;
  /**
   * 徽章的背景顏色。可以是CSS顏色值或任何合法的CSS背景值。默認為#f85149。
   */
  color?: string;
  /**
   * 徽章的位置。可以是"top-left"，"top-right"，"bottom-left"或"bottom-right"。默認為"top-right"。
   */
  placement?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  /**
   * 用於設置徽章的CSS樣式的對象。這是一個可選的屬性。
   */
  style?: React.CSSProperties;
  /**
   * 用於包裝徽章內容的元素。這可以是一個React元素或一個包含其他元素的數組。
   */
  children?: React.ReactNode;
  /**
   * 如果為true，即使count的值為0，徽章也會顯示。如果為false，當count的值為0時，徽章將不會顯示。默認為false。
   */
  showZero?: boolean;
}

const InternalBadge: React.ForwardRefRenderFunction<
  HTMLSpanElement,
  BadgeProps
> = (props, ref) => {
  const {
    children,
    count = null,
    overflowCount = 99,
    dot = false,
    style,
    color = "#f85149",
    placement = "top-right",
    showZero,
    ...restProps
  } = props;

  const displayCount =
    count && (count as number) > overflowCount ? `${overflowCount}+` : count; // 處理過後的數字
  const hidden = !showZero && (displayCount === 0 || displayCount === "0"); // 是否隱藏
  const isZero = displayCount === "0" || displayCount === 0; // 是否為零
  const showAsDot = dot && !isZero; // 如果數字為零且剛好又是dot模式顯示，就不用顯示dot了

  const badgeWrapperClassName = useMemo(() => styles["badge-wrapper"], []);
  const badgeClassName = useMemo(() => {
    const baseClassName = styles[placement];
    const dotClassName = showAsDot ? ` ${styles["badge-dot"]}` : "";
    const countClassName = !showAsDot ? ` ${styles["badge-count"]}` : "";
    const hiddenClassName = hidden ? ` ${styles["badge-hidden"]}` : "";
    return baseClassName + dotClassName + countClassName + hiddenClassName;
  }, [placement, showAsDot, hidden]);

  return (
    <div>
      <span className={badgeWrapperClassName} ref={ref} {...restProps}>
        {children}
        <div
          className={badgeClassName}
          style={{ backgroundColor: color, ...style }}
        >
          {!showAsDot && !hidden && <span>{displayCount}</span>}
        </div>
      </span>
    </div>
  );
};

/**
 * `Badge` 可以讓我們在其 children element 的右上角(預設位置)顯示一個小徽章，
 * 通常用來表示需要處理的訊息數量，透過醒目的視覺形式來吸引用戶處理，
 * 在遊戲微服務被用來表示用戶狀態(上線、閒置、繁忙)
 */
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(InternalBadge);
export default Badge;
