// @flow strict
import { type Node as ReactNode, useEffect, useRef } from 'react';
import Controller from './Controller';
import Box from '../Box';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';
import Flex from '../Flex';
import InternalDismissButton from '../shared/InternalDismissButton';

type Color = 'blue' | 'white' | 'darkGray';
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'flexible' | number;
type Role = 'dialog' | 'listbox' | 'menu' | 'tooltip';

type Props = {
  accessibilityLabel?: string,
  accessibilityDismissButtonLabel?: string,
  anchor: ?HTMLElement,
  children?: ReactNode,
  color?: Color,
  onKeyDown?: ({ event: SyntheticKeyboardEvent<HTMLElement> }) => void,
  id?: string,
  idealDirection?: 'up' | 'right' | 'down' | 'left' | 'forceDown',
  onDismiss: () => void,
  role?: Role,
  shouldFocus?: boolean,
  showCaret?: boolean,
  showDismissButton?: boolean,
  size?: Size,
  disablePortal?: boolean,
  scrollBoundary?: HTMLElement,
  hideWhenReferenceHidden?: boolean,
  onPositioned?: () => void,
  disableFocusTrap?: boolean,
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
}: Props): null | ReactNode {
  const { accessibilityDismissButtonLabel: accessibilityDismissButtonLabelDefault } =
    useDefaultLabelContext('Popover');

  const dismissButtonRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);

  useEffect(() => {
    dismissButtonRef.current?.focus();
  }, []);

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
      onKeyDown={onKeyDown}
      id={id}
      idealDirection={idealDirection}
      onDismiss={onDismiss}
      role={role}
      rounding={4}
      shouldFocus={shouldFocus}
      size={size === 'flexible' ? null : size}
      scrollBoundary={scrollBoundary}
      disablePortal={disablePortal}
      hideWhenReferenceHidden={hideWhenReferenceHidden}
      onPositioned={onPositioned}
      shouldTrapFocus={!disableFocusTrap}
    >
      {showDismissButton ? (
        <Flex direction="column">
          <Box alignSelf="end" padding={2}>
            <InternalDismissButton
              accessibilityLabel={
                accessibilityDismissButtonLabel ?? accessibilityDismissButtonLabelDefault
              }
              onClick={onDismiss}
              size="xs"
              ref={dismissButtonRef}
              iconColor={color === 'white' ? 'darkGray' : 'white'}
            />
          </Box>
          {children}
        </Flex>
      ) : (
        children
      )}
    </Controller>
  );
}
