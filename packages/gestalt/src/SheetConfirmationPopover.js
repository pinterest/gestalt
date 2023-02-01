// @flow strict

import { type Node, useEffect, useRef } from 'react';
import { useAnimation } from './AnimationContext.js';
import Box from './Box.js';
import Flex from './Flex.js';
import Popover from './Popover.js';
import Button from './Button.js';
import Text from './Text.js';
import TrapFocusBehavior from './behaviors/TrapFocusBehavior.js';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider.js';
import { ESCAPE } from './keyCodes.js';

type Props = {|
  onDismiss: () => void,
  anchor: ?HTMLElement,
  dismissConfirmation: {|
    message?: string,
    subtext?: string,
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
  |},
|};

export default function SheetConfirmationPopover({
  anchor,
  dismissConfirmation,
  onDismiss,
}: Props): Node {
  const confirmationButtonRef = useRef();

  const { onAnimatedDismiss } = useAnimation();

  const {
    dismissConfirmationMessage: dismissConfirmationMessageDefault,
    dismissConfirmationSubtext: dismissConfirmationSubtextDefault,
    dismissConfirmationPrimaryActionText: dismissConfirmationPrimaryActionTextDefault,
    dismissConfirmationSecondaryActionText: dismissConfirmationSecondaryActionTextDefault,
    dismissConfirmationPrimaryActionTextLabel: dismissConfirmationPrimaryActionTextLabelDefault,
    dismissConfirmationSecondaryActionTextLabel: dismissConfirmationSecondaryActionTextLabelDefault,
  } = useDefaultLabelContext('Sheet');

  useEffect(() => {
    confirmationButtonRef?.current?.focus();
  }, [confirmationButtonRef]);

  // Handle onDismiss triggering from ESC keyup event
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.keyCode === ESCAPE) {
        event.stopPropagation();
      }
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
                <Text weight="bold">
                  {dismissConfirmation?.message ?? dismissConfirmationMessageDefault}
                </Text>
                <Text>{dismissConfirmation?.subtext ?? dismissConfirmationSubtextDefault}</Text>
              </Flex>
            </Box>
            <Flex justifyContent="center" gap={2}>
              <Button
                accessibilityLabel={
                  dismissConfirmation?.secondaryAction?.accessibilityLabel ??
                  dismissConfirmationSecondaryActionTextLabelDefault
                }
                color="gray"
                text={
                  dismissConfirmation?.secondaryAction?.text ??
                  dismissConfirmationSecondaryActionTextDefault
                }
                onClick={({ event }) => {
                  if (typeof dismissConfirmation !== 'boolean') {
                    dismissConfirmation?.secondaryAction?.onClick?.({ event });
                  }
                  onDismiss();
                }}
              />
              <Button
                color="red"
                accessibilityLabel={
                  dismissConfirmation?.primaryAction?.accessibilityLabel ??
                  dismissConfirmationPrimaryActionTextLabelDefault
                }
                text={
                  dismissConfirmation?.primaryAction?.text ??
                  dismissConfirmationPrimaryActionTextDefault
                }
                onClick={({ event }) => {
                  if (typeof dismissConfirmation !== 'boolean') {
                    dismissConfirmation?.primaryAction?.onClick?.({ event });
                  }
                  onAnimatedDismiss();
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
