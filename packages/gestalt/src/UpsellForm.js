// @flow strict
import { type Node } from 'react';
import Box from './Box.js';
import Button from './Button.js';
import Flex from './Flex.js';
import useResponsiveMinWidth from './useResponsiveMinWidth.js';

type Props = {|
  /**
   * Contents of the form, typically input components like [TextField](https://gestalt.pinterest.systems/textfield) or [NumberField](https://gestalt.pinterest.systems/numberfield).
   */
  children: Node,
  /**
   * Callback triggered when the form is submitted.
   */
  onSubmit: ({|
    event:
      | SyntheticMouseEvent<HTMLButtonElement>
      | SyntheticMouseEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLButtonElement>,
  |}) => void,
  /**
   * Text content of the submit button. Be sure to localize!
   */
  submitButtonText: string,
  /**
   * Label for the submit button used for screen readers. Should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/upsell#Accessibility). Be sure to localize!
   */
  submitButtonAccessibilityLabel: string,
  /**
   * Used to disable the submit button.
   */
  submitButtonDisabled?: boolean,
|};

/**
 * [Upsell.Form](https://gestalt.pinterest.systems/upsell#Upsell.Form) can be used to add a short form to Upsell for collecting data from the user.
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
        direction={responsiveMinWidth === 'xs' ? 'column' : 'row'}
        gap={2}
        justifyContent="end"
        wrap
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

UpsellForm.displayName = 'Upsell.Form';
