import { type ComponentProps } from 'react';
import classnames from 'classnames';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';
import type Icon from '../Icon';
import styles from '../Icon.css';
import icons from '../icons/index';
import vrIcons from '../icons-vr-theme/index';
import useInExperiment from '../useInExperiment';

type Props = {
  color?: ComponentProps<typeof Icon>['color'];
  size: ComponentProps<typeof Icon>['size'];
};

export default function AccessibilityOpenNewTab({ size, color }: Props) {
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
      <path d={(isInExperiment ? vrIcons : icons).visit} />
    </svg>
  );
}
