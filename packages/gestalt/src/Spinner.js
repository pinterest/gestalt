// @flow strict
import { type Node } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
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
  accessibilityLabel: string,
  /**
   * String that clients such as VoiceOver will read to describe the element. Always localize the label.
   */
  color?: 'default' | 'subtle',
  /**
   * Whether or not to render with a 300ms delay. The delay is for perceived performance, so you should rarely need to remove it.
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
 */
export default function Spinner({
  accessibilityLabel,
  color = 'subtle',
  delay = true,
  show,
  size = 'md',
}: Props): Node {
  return show ? (
    <Box display="flex" justifyContent="around" overflow="hidden">
      <div className={classnames(styles.icon, { [styles.delay]: delay })}>
        <Icon
          color={color}
          icon="knoop"
          accessibilityLabel={accessibilityLabel}
          size={SIZE_NAME_TO_PIXEL[size]}
        />
      </div>
    </Box>
  ) : (
    <div />
  );
}
