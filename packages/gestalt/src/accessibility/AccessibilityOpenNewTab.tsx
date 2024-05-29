import { ComponentProps } from 'react';
import classnames from 'classnames';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';
import Icon from '../Icon';
import styles from '../Icon.css';
import icons from '../icons/index';

type Props = {
  color: ComponentProps<typeof Icon>['color'];
  size: ComponentProps<typeof Icon>['size'];
};

export default function AccessibilityOpenNewTab({ size, color }: Props) {
  const cs = classnames(styles.rtlSupport, styles[color ?? 'default'], styles.icon);
  const { accessibilityNewTabLabel } = useDefaultLabelContext('Link');

  return (
    <svg className={cs} height={size} role="img" viewBox="0 0 24 24" width={size}>
      <title>, {accessibilityNewTabLabel}</title>
      <path d={icons.visit} />
    </svg>
  );
}
