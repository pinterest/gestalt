import type { Node } from "react";
import Controller from "./Controller";
import type { Role } from "./Contents";
import "./Contents";
type Color = "blue" | "orange" | "red" | "white" | "darkGray";
type Size = "xs" | "sm" | "md" | "lg" | "xl" | "flexible" | number;
type IdealDirection = "up" | "right" | "down" | "left";
type Props = {
  anchor: HTMLElement | null | undefined;
  children?: Node;
  color?: Color;
  handleKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
  id?: string;
  idealDirection?: IdealDirection;
  onDismiss: () => void;
  positionRelativeToAnchor?: boolean;
  role?: Role;
  shouldFocus?: boolean;
  showCaret?: boolean;
  size?: Size;
};
/**
 * https://gestalt.pinterest.systems/Popover
 */

export default function Popover(props: Props): null | Node {
  const {
    anchor,
    children,
    handleKeyDown,
    id,
    idealDirection,
    onDismiss,
    positionRelativeToAnchor = true,
    color = "white",
    role,
    shouldFocus = true,
    showCaret = false,
    size = "sm",
  } = props;

  if (!anchor) {
    return null;
  }

  return (
    <Controller
      anchor={anchor}
      bgColor={color}
      border
      caret={showCaret}
      handleKeyDown={handleKeyDown}
      id={id}
      idealDirection={idealDirection}
      onDismiss={onDismiss}
      positionRelativeToAnchor={positionRelativeToAnchor}
      role={role}
      rounding={4}
      shouldFocus={shouldFocus}
      size={size === "flexible" ? null : size}
    >
      {children}
    </Controller>
  );
}