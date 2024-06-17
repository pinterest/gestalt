import classnames from 'classnames';
import styles from '../Icon.css';
import icons from '../icons/index';
import vrIcons from '../icons-vr-theme/index';
import useInExperiment from '../useInExperiment';

type IconColor =
  | 'default'
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

type HoveredIconColor =
  | 'neutral-hover'
  | 'success-hover'
  | 'error-hover'
  | 'warning-hover'
  | 'info-hover'
  | 'recommendation-hover'
  | 'light-hover'
  | 'dark-hover';

type Props = {
  accessibilityLabel: string;
  color?: IconColor | HoveredIconColor;
  icon?: keyof typeof icons;
  dangerouslySetSvgPath?: {
    __path: string;
  };
  inline?: boolean;
  size?: number | string;
};

const flipOnRtlIconNames: Partial<keyof typeof icons>[] = [
  'ads-stats',
  'ads-overview',
  'arrow-back',
  'arrow-circle-forward',
  'arrow-end',
  'arrow-forward',
  'arrow-start',
  'arrow-up-right',
  'compose',
  'directional-arrow-left',
  'directional-arrow-right',
  'flip-vertical',
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

function InternalIcon({
  accessibilityLabel,
  color = 'subtle',
  dangerouslySetSvgPath,
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
  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });
  const path =
    (icon && (isInVRExperiment ? vrIcons : icons)[icon]) ||
    /* eslint-disable-next-line no-underscore-dangle */
    (dangerouslySetSvgPath && dangerouslySetSvgPath.__path) ||
    undefined;

  const ariaHidden = accessibilityLabel === '' ? true : null;

  return (
    // @ts-expect-error - TS2322 - Type '{ children: Element; "aria-hidden": true | null; "aria-label": string; className: string; height: string | number; role: "img"; viewBox: string; width: string | number; }' is not assignable to type 'SVGProps<SVGSVGElement>'.
    <svg
      aria-hidden={ariaHidden}
      aria-label={accessibilityLabel}
      className={cs}
      height={size}
      role="img"
      viewBox="0 0 24 24"
      width={size}
    >
      <path d={path} />
    </svg>
  );
}

export default InternalIcon;
