import { ComponentProps } from 'react';
import classnames from 'classnames';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';
import Icon from '../Icon';
import styles from '../Icon.css';
import icons from '../icons/index';
import vrIcons from '../icons-vr-theme/index';
import useInExperiment from '../useInExperiment';

type Props = {
  color?: ComponentProps<typeof Icon>['color'];
  size: ComponentProps<typeof Icon>['size'];
  icon?: 'visit' | 'directional-arrow-right' | 'download';
};

export default function AccessibilityLinkActionIcon({ size, color, icon }: Props) {
  const { accessibilityNewTabLabel } = useDefaultLabelContext('Link');

  const isInExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  const classNames = classnames(
    styles.rtlSupport,
    color ? styles[color] : styles.inherit,
    styles.icon,
  );

  return (
    <svg className={classNames} height={size} role="img" viewBox="0 0 24 24" width={size}>
      <title>, {accessibilityNewTabLabel}</title>
      <path d={(isInExperiment ? vrIcons : icons)[icon ?? 'visit']} />
    </svg>
  );
}
