// @flow strict

import { type Node, useEffect, useRef } from 'react';
import { useRequestAnimationFrame } from '../animation/RequestAnimationFrameContext.js';
import TrapFocusBehavior from '../behaviors/TrapFocusBehavior.js';
import Box from '../Box.js';
import Button from '../Button.js';
import { useDefaultLabelContext } from '../contexts/DefaultLabelProvider.js';
import Flex from '../Flex.js';
import { ESCAPE } from '../keyCodes.js';
import Popover from '../Popover.js';
import Text from '../Text.js';

type Props = {|
  anchor: ?HTMLElement,
  message?: string,
  onDismiss: () => void,
  primaryAction?: {|
    accessibilityLabel?: string,
    text?: string,
    onClick?: ({|
      event:
        | SyntheticMouseEvent<HTMLButtonElement>
        | SyntheticMouseEvent<HTMLAnchorElement>
        | SyntheticKeyboardEvent<HTMLAnchorElement>
        | SyntheticKeyboardEvent<HTMLButtonElement>,
    |}) => void,
  |},
  secondaryAction?: {|
    accessibilityLabel?: string,
    text?: string,
    onClick?: ({|
      event:
        | SyntheticMouseEvent<HTMLButtonElement>
        | SyntheticMouseEvent<HTMLAnchorElement>
        | SyntheticKeyboardEvent<HTMLAnchorElement>
        | SyntheticKeyboardEvent<HTMLButtonElement>,
    |}) => void,
  |},
  subtext?: string,
|};

export default function ConfirmationPopover({
  anchor,
  message,
  subtext,
  primaryAction,
  secondaryAction,
  onDismiss,
}: Props): Node {
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
    function handleKeyDown(event: SyntheticKeyboardEvent<HTMLDivElement>) {
      if (event.keyCode === ESCAPE) event.stopPropagation();
    }
    window.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Popover
      anchor={anchor}
      idealDirection="down"
      onDismiss={() => onDismiss()}
      positionRelativeToAnchor
      role="dialog"
      size="md"
    >
      <TrapFocusBehavior>
        <Box padding={3} width="100%">
          <Flex direction="column" gap={4}>
            <Box role="alert">
              <Flex direction="column" gap={2} alignItems="center" width="100%">
                <Text weight="bold">{message ?? messageDefault}</Text>
                <Text>{subtext ?? subtextDefault}</Text>
              </Flex>
            </Box>
            <Flex justifyContent="center" gap={2}>
              <Button
                accessibilityLabel={
                  secondaryAction?.accessibilityLabel ?? secondaryActionTextLabelDefault
                }
                color="gray"
                text={secondaryAction?.text ?? secondaryActionTextDefault}
                onClick={({ event }) => {
                  secondaryAction?.onClick?.({ event });
                  onDismiss();
                }}
              />
              <Button
                color="red"
                accessibilityLabel={
                  primaryAction?.accessibilityLabel ?? primaryActionTextLabelDefault
                }
                text={primaryAction?.text ?? primaryActionTextDefault}
                onClick={({ event }) => {
                  primaryAction?.onClick?.({ event });
                  onExternalDismiss();
                }}
                ref={confirmationButtonRef}
              />
            </Flex>
          </Flex>
        </Box>
      </TrapFocusBehavior>
    </Popover>
  );
}
