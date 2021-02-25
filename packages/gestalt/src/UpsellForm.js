// @flow strict
import React, { type Node } from 'react';
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

export default function UpsellForm({
  children,
  onSubmit,
  submitButtonText,
  submitButtonAccessibilityLabel,
  submitButtonDisabled,
}: Props): Node {
  const responsiveMinWidth = useResponsiveMinWidth();

  return (
    <form onSubmit={onSubmit} style={{ width: '100%' }}>
      <Flex gap={2} direction={responsiveMinWidth === 'xs' ? 'column' : 'row'} wrap>
        <Flex.Item flex={responsiveMinWidth === 'xs' ? 'shrink' : 'grow'}>{children}</Flex.Item>
        <Flex.Item>
          <Button
            accessibilityLabel={submitButtonAccessibilityLabel}
            color="red"
            disabled={submitButtonDisabled}
            inline={responsiveMinWidth !== 'xs'}
            text={submitButtonText}
            type="submit"
          />
        </Flex.Item>
      </Flex>
    </form>
  );
}
