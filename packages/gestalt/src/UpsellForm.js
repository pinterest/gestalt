// @flow strict
import type { Node } from 'react';
import Box from './Box.js';
import Button from './Button.js';
import Flex from './Flex.js';
import { type AbstractEventHandler } from './AbstractEventHandler.js';
import useResponsiveMinWidth from './useResponsiveMinWidth.js';

type Props = {|
  children: Node,
  onSubmit: AbstractEventHandler<
    | SyntheticMouseEvent<HTMLButtonElement>
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLButtonElement>,
  >,
  submitButtonText: string,
  submitButtonAccessibilityLabel: string,
  submitButtonDisabled?: boolean,
|};

/**
 * https://gestalt.pinterest.systems/upsell
 */
export default function UpsellForm({
  children,
  onSubmit,
  submitButtonText,
  submitButtonAccessibilityLabel,
  submitButtonDisabled,
}: Props): Node {
  const responsiveMinWidth = useResponsiveMinWidth();

  return (
    <form onSubmit={(event) => onSubmit({ event })} style={{ width: '100%' }}>
      <Flex
        gap={2}
        direction={responsiveMinWidth === 'xs' ? 'column' : 'row'}
        wrap
        justifyContent="end"
      >
        <Flex.Item flex={responsiveMinWidth === 'xs' ? 'shrink' : 'grow'}>
          <Box smMarginBottom={2} marginBottom={0}>
            {children}
          </Box>
        </Flex.Item>
        <Flex.Item>
          <Button
            accessibilityLabel={submitButtonAccessibilityLabel}
            color="red"
            disabled={submitButtonDisabled}
            fullWidth={responsiveMinWidth === 'xs'}
            text={submitButtonText}
            type="submit"
          />
        </Flex.Item>
      </Flex>
    </form>
  );
}
