import { ComponentProps } from 'react';
import classnames from 'classnames';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';
import Icon from '../Icon';
import styles from '../Icon.css';
import icons from '../icons/index';
import vrIcons from '../icons-vr-theme/index';
import useExperimentalTheme from '../utils/useExperimentalTheme';

type Props = {
  color?: ComponentProps<typeof Icon>['color'];
  size: ComponentProps<typeof Icon>['size'];
  icon?: 'visit' | 'directional-arrow-right' | 'download';
};

export default function AccessibilityLinkActionIcon({ size, color, icon = 'visit' }: Props) {
  const { accessibilityNewTabLabel, accessibilityDownloadLabel } = useDefaultLabelContext('Link');

  const theme = useExperimentalTheme();

  const classNames = classnames(
    styles.rtlSupport,
    color ? styles[color] : styles.inherit,
    styles.icon,
  );

  let titleLabel = '';

  if (icon === 'visit') {
    titleLabel = accessibilityNewTabLabel;
  }

  if (icon === 'download') {
    titleLabel = accessibilityDownloadLabel;
  }

  titleLabel = `, ${titleLabel}`;

  return (
    <svg className={classNames} height={size} role="img" viewBox="0 0 24 24" width={size}>
      <title>{titleLabel}</title>
      <path d={(theme.MAIN ? vrIcons : icons)[icon ?? 'visit']} />
    </svg>
  );
}
