// @flow strict
import { type Node } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider.js';
import Icon from './Icon.js';
import styles from './Spinner.css';

const SIZE_NAME_TO_PIXEL = {
  sm: 32,
  md: 40,
};

type Props = {|
  /**
   * String that clients such as VoiceOver will read to describe the element. Always localize the label.
   */
  accessibilityLabel?: string,
  /**
   * Color of the Spinner.
   */
  color?: 'default' | 'subtle',
  /**
   * Whether or not to render with a 300ms delay. The delay is for perceived performance, so you should rarely need to remove it. See the [delay variant](https://gestalt.pinterest.systems/web/spinner#Delay) for more details.
   */
  delay?: boolean,
  /**
   * Indicates if Spinner should be visible.
   */
  show: boolean,
  /**
   * sm: 32px, md: 40px
   */
  size?: 'sm' | 'md',
|};

/**
 * [Spinner](https://gestalt.pinterest.systems/web/spinner ) helps indicate that a surface's content or portion of content is currently loading.
 *
 * ![Spinner](https://raw.githubusercontent.com/pinterest/gestalt/master/docs/graphics/general/Spinner.svg)
 *
 */
export default function Spinner({
  accessibilityLabel,
  color = 'subtle',
  delay = true,
  show,
  size = 'md',
}: Props): Node {
  const { accessibilityLabel: accessibilityLabelDefault } = useDefaultLabelContext('Spinner');
  return show ? (
    <Box display="flex" justifyContent="around" overflow="hidden">
      <div className={classnames(styles.icon, { [styles.delay]: delay })}>
        <Icon
          color={color}
          icon="knoop"
          accessibilityLabel={accessibilityLabel ?? accessibilityLabelDefault}
          size={SIZE_NAME_TO_PIXEL[size]}
        />
      </div>
    </Box>
  ) : (
    <div />
  );
}
