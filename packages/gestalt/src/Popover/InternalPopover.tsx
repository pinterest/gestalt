import { ReactNode } from 'react';
import Controller from './Controller';
import Box from '../Box';
import { Overflow } from '../boxTypes';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';
import Flex from '../Flex';
import InternalIconCompactButton from '../IconButton/InternalIconCompactButton';
import InternalDismissButton from '../sharedSubcomponents/InternalDismissButton';
import useInExperiment from '../useInExperiment';

type Color = 'blue' | 'white' | 'darkGray';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'flexible' | number;
type Role = 'dialog' | 'listbox' | 'menu' | 'tooltip';

type Props = {
  accessibilityLabel?: string;
  accessibilityDismissButtonLabel?: string;
  anchor: HTMLElement | null | undefined;
  children?: ReactNode;
  color?: Color;
  onKeyDown?: (arg1: { event: React.KeyboardEvent<HTMLElement> }) => void;
  id?: string;
  idealDirection?: 'up' | 'right' | 'down' | 'left';
  forceDirection?: boolean;
  onDismiss: () => void;
  role?: Role;
  shouldFocus?: boolean;
  showCaret?: boolean;
  showDismissButton?: boolean;
  size?: Size;
  disablePortal?: boolean;
  scrollBoundary?: HTMLElement;
  hideWhenReferenceHidden?: boolean;
  onPositioned?: () => void;
  disableFocusTrap?: boolean;
  overflow?: Extract<Overflow, 'auto' | 'hidden' | 'visible'>;
};

export default function InternalPopover({
  accessibilityLabel,
  accessibilityDismissButtonLabel,
  anchor,
  children,
  showDismissButton,
  onKeyDown,
  id,
  idealDirection,
  forceDirection,
  onDismiss,
  color = 'white',
  role,
  shouldFocus,
  showCaret,
  size = 'sm',
  disablePortal,
  scrollBoundary,
  hideWhenReferenceHidden,
  onPositioned,
  disableFocusTrap = false,
  overflow = 'auto',
}: Props) {
  const { accessibilityDismissButtonLabel: accessibilityDismissButtonLabelDefault } =
    useDefaultLabelContext('Popover');

  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualRefresh',
    mwebExperimentName: 'web_gestalt_visualRefresh',
  });

  if (!anchor) {
    return null;
  }

  return (
    <Controller
      accessibilityLabel={accessibilityLabel}
      anchor={anchor}
      bgColor={color}
      border
      caret={showCaret}
      disablePortal={disablePortal}
      forceDirection={forceDirection}
      hideWhenReferenceHidden={hideWhenReferenceHidden}
      id={id}
      idealDirection={idealDirection}
      onDismiss={onDismiss}
      onKeyDown={onKeyDown}
      onPositioned={onPositioned}
      overflow={overflow}
      role={role}
      rounding={4}
      scrollBoundary={scrollBoundary}
      shouldFocus={shouldFocus}
      shouldTrapFocus={!disableFocusTrap}
      size={size === 'flexible' ? undefined : size}
    >
      {showDismissButton && (
        <Flex direction="column">
          <Box alignSelf="end" padding={2}>
            {isInVRExperiment ? (
              <InternalIconCompactButton
                accessibilityLabel={
                  accessibilityDismissButtonLabel ?? accessibilityDismissButtonLabelDefault
                }
                icon="compact-cancel"
                iconColor="darkGray"
                onClick={onDismiss}
                size="sm"
              />
            ) : (
              <InternalDismissButton
                accessibilityLabel={
                  accessibilityDismissButtonLabel ?? accessibilityDismissButtonLabelDefault
                }
                iconColor={color === 'white' ? 'darkGray' : 'white'}
                onClick={onDismiss}
                size="xs"
              />
            )}
          </Box>
        </Flex>
      )}

      {children}
    </Controller>
  );
}
