import { useEffect, useState } from 'react';
import classnames from 'classnames';
import vrLightDesignTokens from 'gestalt-design-tokens/dist/json/vr-theme/variables-light.json';
import styles from './VRSpinner.css';
import Box from '../Box';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';

const SIZE_NAME_TO_PIXEL = {
  sm: 32,
  lg: 56,
} as const;

type SpinnerBodyProps = {
  accessibilityLabel: string;
  delay: boolean;
  show: boolean;
  size: 'sm' | 'lg';
  color: 'default' | 'grayscale' | 'white';
  onExitAnimationEnd: () => void;
};

function SpinnerBody({
  accessibilityLabel,
  delay,
  show,
  size,
  color,
  onExitAnimationEnd,
}: SpinnerBodyProps) {
  const colorWhite = color === 'white' && vrLightDesignTokens['sema-color-background-light'];
  const colorGrayscale = color === 'grayscale' && vrLightDesignTokens['base-color-grayscale-350'];
  const nonDefaultSpinnerColor =
    colorWhite || colorGrayscale
      ? ({
          '--comp-spinner-color-background-1': colorWhite || colorGrayscale,
          '--comp-spinner-color-background-2': colorWhite || colorGrayscale,
          '--comp-spinner-color-background-3': colorWhite || colorGrayscale,
        } as React.CSSProperties)
      : {};

  return (
    <Box display="flex" justifyContent="around">
      <div
        aria-label={accessibilityLabel}
        className={classnames(styles.spinner, {
          [styles.exit]: !show,
        })}
        onAnimationEnd={onExitAnimationEnd}
        style={
          {
            '--g-enter-delay': delay ? '300ms' : undefined,
            '--g-size': `${SIZE_NAME_TO_PIXEL[size]}px`,
            ...nonDefaultSpinnerColor,
          } as React.CSSProperties
        }
      >
        <svg fill="none" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="28"
            cy="12"
            r="8"
            style={{ '--g-start-x': '0px', '--g-start-y': '16px' } as React.CSSProperties}
          />
          <circle
            cx="14"
            cy="36"
            r="8"
            style={{ '--g-start-x': '14px', '--g-start-y': '-8px' } as React.CSSProperties}
          />
          <circle
            cx="42"
            cy="36"
            r="8"
            style={{ '--g-start-x': '-14px', '--g-start-y': '-8px' } as React.CSSProperties}
          />
        </svg>
      </div>
    </Box>
  );
}

type Props = {
  accessibilityLabel?: string;
  delay?: boolean;
  show: boolean;
  size?: 'sm' | 'lg';
  color?: 'default' | 'grayscale' | 'white';
};

export default function Spinner({
  accessibilityLabel,
  delay = true,
  show: showProp,
  size = 'lg',
  color = 'default',
}: Props) {
  const [show, setShow] = useState(showProp);
  const { accessibilityLabel: accessibilityLabelDefault } = useDefaultLabelContext('Spinner');

  const unmountSpinner = () => {
    if (!showProp) setShow(false);
  };

  useEffect(() => {
    if (showProp) setShow(showProp);
  }, [showProp]);

  if (!show) return null;

  return (
    <SpinnerBody
      accessibilityLabel={accessibilityLabel || accessibilityLabelDefault}
      color={color}
      delay={delay}
      onExitAnimationEnd={unmountSpinner}
      show={showProp}
      size={size}
    />
  );
}

Spinner.displayName = 'Spinner';
