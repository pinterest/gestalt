import classnames from 'classnames';
import styles from '../Icon.css';
import icons from '../icons/index';
import componentIcons from '../icons-vr-theme/components/index';
import vrIcons from '../icons-vr-theme/index';
import useInExperiment from '../useInExperiment';

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

type IconName = keyof typeof icons | keyof typeof componentIcons;
type Props = {
  accessibilityLabel: string;
  color?: IconColor;
  dataTestId?: string;
  icon?: IconName;
  dangerouslySetSvgPath?: {
    __path: string;
  };
  inline?: boolean;
  size?: number | string;
};

// @ts-expect-error - TS2322 - Type 'string[]' is not assignable to type 'readonly ("replace" | "search" | "link" | "text" | "dash" | "3D" | "3D-move" | "360" | "accessibility" | "ad" | "ad-group" | "add" | "add-circle" | "add-layout" | "add-pin" | "add-section" | ... 317 more ... | "wave")[]'.
const IconNames: ReadonlyArray<IconName> = Object.keys(icons);
const swapOnRtlIconNames: ReadonlyArray<IconName> = ['list-numbered'];

const flipOnRtlIconNames = [
  'ads-stats',
  'ads-overview',
  'arrow-back',
  'arrow-circle-forward',
  'arrow-end',
  'arrow-forward',
  'arrow-start',
  'arrow-up-right',
  'compose',
  'chevron-small-left',
  'chevron-small-right',
  'chevron-left-circle',
  'chevron-right-circle',
  'directional-arrow-left',
  'directional-arrow-right',
  'flipVertical',
  'hand-pointing',
  'link',
  'mute',
  'reorder-images',
  'send',
  'sound',
  'speech',
  'speech-ellipsis',
  'switch-account',
  'text-size',
  'visit',
];

/**
 * [Icons](https://gestalt.pinterest.systems/web/icon) are the symbolic representation of an action or information, providing visual context and improving usability.
 *
 * See the [Iconography and SVG guidelines](https://gestalt.pinterest.systems/foundations/iconography/library) to explore the full icon library.
 *
 * ![Icon light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Icon-list.spec.ts-snapshots/Icon-list-chromium-darwin.png)
 * ![Icon dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Icon-list-dark.spec.ts-snapshots/Icon-list-dark-chromium-darwin.png)
 *
 */

function InternalIcon({
  accessibilityLabel,
  color = 'subtle',
  dangerouslySetSvgPath,
  dataTestId,
  icon,
  inline = false,
  size = 16,
}: Props) {
  const cs = classnames(
    // @ts-expect-error - TS2345 - Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
    flipOnRtlIconNames.includes(icon) && styles.rtlSupport,
    styles[color],
    styles.icon,
    { [styles.iconBlock]: !inline },
  );
  const isInExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  const getIconPath = (iconToUse?: IconName) => {
    let iconName = iconToUse;

    if (icon && isInExperiment) {
      iconName = icon as keyof typeof vrIcons;
      return vrIcons[iconName];
    }
    if (icon && icon in componentIcons) {
      iconName = icon as keyof typeof componentIcons;
      return componentIcons[iconName];
    }
    return icons[iconName as keyof typeof icons];
  };

  /**
   * Some RTL Icons, we need to swap to a completely new icon because they can't be flipped
   * @param iconName
   */
  function getFinalIconName(iconName?: IconName): IconName | undefined {
    if (!iconName) {
      return undefined;
    }

    if (!swapOnRtlIconNames.includes(iconName)) return iconName;

    // As a convention, text direction is defined in `dir` attribute of `html` tag of the document
    const isRTL =
      typeof document === 'undefined'
        ? false
        : document.querySelector('html')?.getAttribute('dir') === 'rtl';

    // return the RTL version of the icon
    if (isRTL && `${iconName}-rtl` in icons) {
      return `${iconName}-rtl` as keyof typeof icons;
    }
    return iconName;
  }

  const iconToUse = getFinalIconName(icon);

  const path =
    (iconToUse && getIconPath(iconToUse)) ||
    /* eslint-disable-next-line no-underscore-dangle */
    (dangerouslySetSvgPath && dangerouslySetSvgPath.__path) ||
    undefined;

  const ariaHidden = accessibilityLabel === '' ? true : null;

  let viewBox = '0 0 24 24';

  // if it's a component icon use a 16x16 view box
  if (iconToUse && iconToUse in componentIcons) {
    viewBox = '0 0 16 16';
  }

  return (
    // @ts-expect-error - TS2322 - Type '{ children: Element; "aria-hidden": true | null; "aria-label": string; className: string; height: string | number; role: "img"; viewBox: string; width: string | number; }' is not assignable to type 'SVGProps<SVGSVGElement>'.
    <svg
      aria-hidden={ariaHidden}
      aria-label={accessibilityLabel}
      className={cs}
      data-test-id={dataTestId}
      height={size}
      role="img"
      viewBox={viewBox}
      width={size}
    >
      <path d={path} />
    </svg>
  );
}

InternalIcon.icons = IconNames;

InternalIcon.displayName = 'InternalIcon';

export default InternalIcon;
