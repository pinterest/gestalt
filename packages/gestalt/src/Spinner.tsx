import { useId } from 'react';
import classnames from 'classnames';
import Box from './Box';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider';
import Flex from './Flex';
import InternalIcon from './Icon/InternalIcon';
import styles from './Spinner.css';
import VRSpinner from './Spinner/VRSpinner';
import TextUI from './TextUI';
import useInExperiment from './useInExperiment';

const SIZE_NAME_TO_PIXEL = {
  sm: 32,
  md: 40,
  lg: 56,
} as const;

type Props = {
  /**
   * String that clients such as VoiceOver will read to describe the element. Always localize the label.
   */
  accessibilityLabel?: string;
  /**
   * Color of the Spinner. `grayscale` and `white` variants are available only in Visual Refresh experiment.
   */
  color?: 'default' | 'subtle' | 'grayscale' | 'white';
  /**
   * Whether or not to render with a 300ms delay. The delay is for perceived performance, so you should rarely need to remove it. See the [delay variant](https://gestalt.pinterest.systems/web/spinner#Delay) for more details.
   */
  delay?: boolean;
  /**
   * Adds a label under the spinning animation.
   */
  label?: string;
  /**
   * Indicates if Spinner should be visible. Controlling the component with this prop ensures the outro animation is played. If outro animation is not intended, prefer conditional rendering.
   */
  show: boolean;
  /**
   * sm: 32px, md: 40px, lg: 56px. 'lg' is available only in Visual Refresh experiment and is the default value.
   */
  size?: 'sm' | 'md' | 'lg';
};

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
  label,
  show,
  size = 'md',
}: Props) {
  const { accessibilityLabel: accessibilityLabelDefault } = useDefaultLabelContext('Spinner');
  const id = useId();

  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualrefresh',
    mwebExperimentName: 'web_gestalt_visualrefresh',
  });

  if (isInVRExperiment) {
    return (
      <VRSpinner
        accessibilityLabel={accessibilityLabel}
        color={color === 'subtle' ? 'default' : color} // 'subtle' maps to 'default' as it is not a VR color variant
        delay={delay}
        label={label}
        show={show}
        size={size === 'md' ? 'lg' : size} // 'md' maps to 'lg' as it doesn't exist in VR Spinner
      />
    );
  }

  return show ? (
    <Box padding={label ? 1 : undefined}>
      <Flex direction="column" gap={6}>
        <Box display="flex" justifyContent="around" overflow="hidden">
          <div className={classnames(styles.icon, { [styles.delay]: delay })}>
            <InternalIcon
              accessibilityDescribedby={label ? id : undefined}
              accessibilityLabel={accessibilityLabel ?? label ?? accessibilityLabelDefault}
              // map non-classic colors to subtle
              color={color === 'default' || color === 'subtle' ? color : 'subtle'}
              icon="knoop"
              size={SIZE_NAME_TO_PIXEL[size]}
            />
          </div>
        </Box>
        {label && (
          <Box minWidth={200}>
            <TextUI align="center" id={id} size="sm">
              {label}
            </TextUI>
          </Box>
        )}
      </Flex>{' '}
    </Box>
  ) : (
    <div />
  );
}

Spinner.displayName = 'Spinner';
