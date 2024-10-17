import InternalIcon from './Icon/InternalIcon';
import compactIconsVR from './icons-vr-theme/compact/index';

export type IconColor =
  | 'default'
  | 'disabled'
  | 'subtle'
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'recommendation'
  | 'inverse'
  | 'shopping'
  | 'brandPrimary'
  | 'light'
  | 'dark';

type Props = {
  /**
   * Label for screen readers to announce Icon. This populates the `aria-label` attribute. If the label is hidden, use an empty string for the label (`accessibilityLabel=""`) to set `aria-hidden`.
   *
   * See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/icon#Accessibility) for details on proper usage.
   */
  accessibilityLabel: string;
  /**
   * The colors available to apply to Icon.
   *
   * See the [color variant](https://gestalt.pinterest.systems/web/icon#Colors) to learn more.
   */
  color?: IconColor;
  /**
   * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
   */
  dataTestId?: string;
  /**
   * SVG icon from the Gestalt icon library to use within Icon.
   *
   * See the [icon library](https://gestalt.pinterest.systems/foundations/iconography/library) to explore available options.
   */
  icon?: keyof typeof compactIconsVR;
  /**
   * Defines a new icon different from the built-in Gestalt icons.
   *
   * See the [custom icon](https://gestalt.pinterest.systems/web/icon#Custom-icon) variant to learn more.
   */
  dangerouslySetSvgPath?: {
    __path: string;
  };
  /**
   * Properly positions Icon relative to an inline element, such as Text using the inline property.
   */
  inline?: boolean;
};

// @ts-expect-error - TS2322 - Type 'string[]' is not assignable to type 'readonly ("replace" | "search" | "link" | "text" | "dash" | "3D" | "3D-move" | "360" | "accessibility" | "ad" | "ad-group" | "add" | "add-circle" | "add-layout" | "add-pin" | "add-section" | ... 317 more ... | "wave")[]'.
const IconNames: ReadonlyArray<keyof typeof compactIconsVR> = Object.keys(compactIconsVR);

/**
 * [Icons](https://gestalt.pinterest.systems/web/icon) are the symbolic representation of an action or information, providing visual context and improving usability.
 *
 * See the [Iconography and SVG guidelines](https://gestalt.pinterest.systems/foundations/iconography/library) to explore the full icon library.
 *
 * ![Icon light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Icon-list.spec.ts-snapshots/Icon-list-chromium-darwin.png)
 * ![Icon dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Icon-list-dark.spec.ts-snapshots/Icon-list-dark-chromium-darwin.png)
 *
 */

function IconCompact({
  accessibilityLabel,
  color = 'subtle',
  dangerouslySetSvgPath,
  dataTestId,
  icon,
  inline = false,
}: Props) {
  return (
    <InternalIcon
      accessibilityLabel={accessibilityLabel}
      color={color}
      dangerouslySetSvgPath={dangerouslySetSvgPath}
      dataTestId={dataTestId}
      icon={icon}
      inline={inline}
      size={16}
    />
  );
}

IconCompact.icons = IconNames;

IconCompact.displayName = 'IconCompact';

export default IconCompact;
