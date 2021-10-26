import type { AbstractEventHandler } from "./AbstractEventHandler";
import "./AbstractEventHandler";
export type ActionDataType = {
  accessibilityLabel: string;
  disabled?: boolean;
  href?: string;
  label: string;
  onClick?: AbstractEventHandler<
    | React.MouseEvent<HTMLButtonElement>
    | React.MouseEvent<HTMLAnchorElement>
    | React.KeyboardEvent<HTMLAnchorElement>
    | React.KeyboardEvent<HTMLButtonElement>,
    {
      dangerouslyDisableOnNavigation: () => void;
    }
  >;
  rel?: "none" | "nofollow";
  target?: null | "self" | "blank";
};
export type DismissButtonType = {
  accessibilityLabel: string;
  onDismiss: () => void;
};