import classnames from 'classnames';
import { flipOnRtlIconNames, swapOnRtlIconNames } from './RTLIconList';
import styles from '../Icon.css';
import compactIconsClassic from '../icons/compact/index';
import icons from '../icons/index';
import compactIconsVR from '../icons-vr-theme/compact/index';
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

type IconName = keyof typeof icons | keyof typeof compactIconsVR;
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
    flipOnRtlIconNames.includes(icon) && styles.rtlSupport,
    styles[color],
    styles.icon,
    { [styles.iconBlock]: !inline },
  );

  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  const isInVRA = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefreshA',
    mwebExperimentName: 'web_gestalt_visualRefreshA',
  });

  const isInVR = isInVRA || isInVRExperiment;

  const getIconPath = (iconToUse?: IconName) => {
    const iconName = iconToUse;

    if (!iconName) return undefined;

    if (isInVR) {
      if (iconName in vrIcons) {
        return vrIcons[iconName as keyof typeof vrIcons];
      }

      if (iconName in compactIconsVR) {
        return compactIconsVR[iconName as keyof typeof compactIconsVR];
      }
    }

    if (iconName in compactIconsClassic) {
      return compactIconsClassic[iconName as keyof typeof compactIconsClassic];
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
  if (iconToUse && iconToUse in compactIconsVR) {
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
