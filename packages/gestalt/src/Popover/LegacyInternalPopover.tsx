import { ReactNode, useEffect, useRef } from 'react';
import Box from '../Box';
import { Overflow } from '../boxTypes';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';
import Flex from '../Flex';
import LegacyController from '../LegacyController';
import InternalDismissButton from '../shared/InternalDismissButton';
import { Indexable } from '../zIndex';

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
  idealDirection?: 'up' | 'right' | 'down' | 'left' | 'forceDown';
  onDismiss: () => void;
  positionRelativeToAnchor?: boolean;
  role?: Role;
  shouldFocus?: boolean;
  showCaret?: boolean;
  showDismissButton?: boolean;
  size?: Size;
  __dangerouslySetMaxHeight?: '30vh';
  zIndex?: Indexable;
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
  onDismiss,
  positionRelativeToAnchor = false,
  color = 'white',
  role,
  shouldFocus,
  showCaret,
  size = 'sm',
  __dangerouslySetMaxHeight,
  zIndex,
  overflow,
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
    <LegacyController
      __dangerouslyIgnoreScrollBoundaryContainerSize={__dangerouslySetMaxHeight === '30vh'}
      accessibilityLabel={accessibilityLabel}
      anchor={anchor}
      bgColor={color}
      border
      caret={showCaret}
      id={id}
      idealDirection={idealDirection}
      onDismiss={onDismiss}
      onKeyDown={onKeyDown}
      overflow={overflow}
      positionRelativeToAnchor={positionRelativeToAnchor}
      role={role}
      rounding={4}
      shouldFocus={shouldFocus}
      size={size === 'flexible' ? null : size}
      zIndex={zIndex}
    >
      {showDismissButton ? (
        <Flex direction="column">
          <Box alignSelf="end" padding={2}>
            <InternalDismissButton
              ref={dismissButtonRef}
              accessibilityLabel={
                accessibilityDismissButtonLabel ?? accessibilityDismissButtonLabelDefault
              }
              iconColor={color === 'white' ? 'darkGray' : 'white'}
              onClick={onDismiss}
              size="xs"
            />
          </Box>
          {children}
        </Flex>
      ) : (
        children
      )}
    </LegacyController>
  );
}
