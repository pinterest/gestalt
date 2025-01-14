import classnames from 'classnames';
import Box from './Box';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider';
import Icon, { IconColor } from './Icon';
import styles from './Spinner.css';
import VRSpinner from './Spinner/VRSpinner';
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
   * Indicates if Spinner should be visible. Controlling the component with this prop ensures the outro animation is played. If outro animation is not intended, prefer conditional rendering.
   */
  show: boolean;
  /**
   * sm: 32px, md: 40px, lg: 56px. 'lg' is available only in Visual Refresh experiment.
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
  show,
  size = 'md',
}: Props) {
  const { accessibilityLabel: accessibilityLabelDefault } = useDefaultLabelContext('Spinner');

  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  if (isInVRExperiment) {
    return (
      <VRSpinner
        accessibilityLabel={accessibilityLabel}
        // 'subtle' maps to 'default' as it is not a VR color variant
        color={color === 'subtle' ? 'default' : color}
        delay={delay}
        show={show}
        // 'md' maps to 'lg' as it doesn't exist in VR Spinner
        size={size === 'md' ? 'lg' : size}
      />
    );
  }

  return show ? (
    <Box display="flex" justifyContent="around" overflow="hidden">
      <div className={classnames(styles.icon, { [styles.delay]: delay })}>
        <Icon
          accessibilityLabel={accessibilityLabel ?? accessibilityLabelDefault}
          // Casting color type as classic and VR color variants types conflict.
          color={color as IconColor}
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
