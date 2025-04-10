import classnames from 'classnames';
import { flipOnRtlIconNames, swapOnRtlIconNames } from './RTLIconList';
import styles from '../Icon.css';
import compactIconsClassic from '../icons/compact/index';
import icons from '../icons/index';

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

type IconName = keyof typeof icons | keyof typeof compactIconsClassic;
type Props = {
  accessibilityDescribedby?: string;
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

function InternalIcon({
  accessibilityDescribedby,
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

  const getIconPath = (iconToUse?: IconName) => {
    const iconName = iconToUse;

    if (!iconName) return undefined;

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
  if (iconToUse && iconToUse in compactIconsClassic) {
    viewBox = '0 0 16 16';
  }

  return (
    // @ts-expect-error - TS2322 - Type '{ children: Element; "aria-hidden": true | null; "aria-label": string; className: string; height: string | number; role: "img"; viewBox: string; width: string | number; }' is not assignable to type 'SVGProps<SVGSVGElement>'.
    <svg
      aria-describedby={accessibilityDescribedby}
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

InternalIcon.displayName = 'InternalIcon';

export default InternalIcon;
