import { useEffect, useRef } from 'react';
import { useRequestAnimationFrame } from '../animation/RequestAnimationFrameContext';
import TrapFocusBehavior from '../behaviors/TrapFocusBehavior';
import Box from '../Box';
import Button from '../Button';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider';
import Flex from '../Flex';
import { ESCAPE } from '../keyCodes';
import InternalPopover from '../Popover/InternalPopover';
import Text from '../Text';

type Props = {
  anchor: HTMLElement | null | undefined;
  message?: string;
  onDismiss: () => void;
  primaryAction?: {
    accessibilityLabel?: string;
    text?: string;
    onClick?: (arg1: {
      event:
        | React.MouseEvent<HTMLButtonElement>
        | React.MouseEvent<HTMLAnchorElement>
        | React.KeyboardEvent<HTMLAnchorElement>
        | React.KeyboardEvent<HTMLButtonElement>;
    }) => void;
  };
  secondaryAction?: {
    accessibilityLabel?: string;
    text?: string;
    onClick?: (arg1: {
      event:
        | React.MouseEvent<HTMLButtonElement>
        | React.MouseEvent<HTMLAnchorElement>
        | React.KeyboardEvent<HTMLAnchorElement>
        | React.KeyboardEvent<HTMLButtonElement>;
    }) => void;
  };
  subtext?: string;
};

export default function ConfirmationPopover({
  anchor,
  message,
  subtext,
  primaryAction,
  secondaryAction,
  onDismiss,
}: Props) {
  const confirmationButtonRef = useRef<null | HTMLAnchorElement | HTMLButtonElement>(null);

  const { onExternalDismiss } = useRequestAnimationFrame();

  const {
    dismissConfirmationMessage: messageDefault,
    dismissConfirmationSubtext: subtextDefault,
    dismissConfirmationPrimaryActionText: primaryActionTextDefault,
    dismissConfirmationSecondaryActionText: secondaryActionTextDefault,
    dismissConfirmationPrimaryActionTextLabel: primaryActionTextLabelDefault,
    dismissConfirmationSecondaryActionTextLabel: secondaryActionTextLabelDefault,
  } = useDefaultLabelContext('OverlayPanel');

  useEffect(() => {
    confirmationButtonRef?.current?.focus();
  }, [confirmationButtonRef]);

  // Handle onDismiss triggering from ESC keyup event
  useEffect(() => {
    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
      if (event.keyCode === ESCAPE) event.stopPropagation();
    }
    // @ts-expect-error - TS2769 - No overload matches this call.
    window.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      // @ts-expect-error - TS2769 - No overload matches this call.
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <InternalPopover
      accessibilityLabel="Popover"
      anchor={anchor}
      color="white"
      disablePortal
      idealDirection="down"
      onDismiss={() => onDismiss()}
      role="dialog"
      shouldFocus
      showCaret={false}
      size="md"
    >
      <TrapFocusBehavior>
        <Box padding={3} width="100%">
          <Flex direction="column" gap={4}>
            <Box role="alert">
              <Flex alignItems="center" direction="column" gap={2} width="100%">
                <Text weight="bold">{message ?? messageDefault}</Text>
                <Text>{subtext ?? subtextDefault}</Text>
              </Flex>
            </Box>
            <Flex gap={2} justifyContent="center">
              <Button
                accessibilityLabel={
                  secondaryAction?.accessibilityLabel ?? secondaryActionTextLabelDefault
                }
                color="gray"
                onClick={({ event }) => {
                  secondaryAction?.onClick?.({ event });
                  onDismiss();
                }}
                text={secondaryAction?.text ?? secondaryActionTextDefault}
              />
              <Button
                // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLAnchorElement | HTMLButtonElement | null>' is not assignable to type 'LegacyRef<HTMLButtonElement> | undefined'.
                ref={confirmationButtonRef}
                accessibilityLabel={
                  primaryAction?.accessibilityLabel ?? primaryActionTextLabelDefault
                }
                color="red"
                onClick={({ event }) => {
                  primaryAction?.onClick?.({ event });
                  onExternalDismiss();
                }}
                text={primaryAction?.text ?? primaryActionTextDefault}
              />
            </Flex>
          </Flex>
        </Box>
      </TrapFocusBehavior>
    </InternalPopover>
  );
}
