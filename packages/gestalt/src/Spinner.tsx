import classnames from 'classnames';
import Box from './Box';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider';
import Icon from './Icon';
import styles from './Spinner.css';

const SIZE_NAME_TO_PIXEL = {
  sm: 32,
  md: 40,
} as const;

type Props = {
  /**
   * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
   */
  dataTestId?: string;
  /**
   * String that clients such as VoiceOver will read to describe the element. Always localize the label.
   */
  accessibilityLabel?: string;
  /**
   * Color of the Spinner.
   */
  color?: 'default' | 'subtle';
  /**
   * Whether or not to render with a 300ms delay. The delay is for perceived performance, so you should rarely need to remove it. See the [delay variant](https://gestalt.pinterest.systems/web/spinner#Delay) for more details.
   */
  delay?: boolean;
  /**
   * Indicates if Spinner should be visible.
   */
  show: boolean;
  /**
   * sm: 32px, md: 40px
   */
  size?: 'sm' | 'md';
};

/**
 * [Spinner](https://gestalt.pinterest.systems/web/spinner ) helps indicate that a surface's content or portion of content is currently loading.
 *
 * ![Spinner](https://raw.githubusercontent.com/pinterest/gestalt/master/docs/graphics/general/Spinner.svg)
 *
 */
export default function Spinner({
  accessibilityLabel,
  dataTestId,
  color = 'subtle',
  delay = true,
  show,
  size = 'md',
}: Props) {
  const { accessibilityLabel: accessibilityLabelDefault } = useDefaultLabelContext('Spinner');
  return show ? (
    <Box display="flex" justifyContent="around" overflow="hidden" data-test-id={dataTestId}>
      <div className={classnames(styles.icon, { [styles.delay]: delay })}>
        <Icon
          accessibilityLabel={accessibilityLabel ?? accessibilityLabelDefault}
          color={color}
          icon="knoop"
          size={SIZE_NAME_TO_PIXEL[size]}
        />
      </div>
    </Box>
  ) : (
    <div />
  );
}

Spinner.displayName = 'Spinner';
