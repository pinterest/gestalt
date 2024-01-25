// @flow strict
import { type Node as ReactNode } from 'react';
import Box from './Box';
import Button from './Button';
import Flex from './Flex';
import useResponsiveMinWidth from './useResponsiveMinWidth';

type Props = {
  /**
   * Contents of the form, typically input components like [TextField](https://gestalt.pinterest.systems/web/textfield) or [NumberField](https://gestalt.pinterest.systems/web/numberfield).
   */
  children: ReactNode,
  /**
   * Callback triggered when the form is submitted.
   */
  onSubmit: ({
    event:
      | SyntheticMouseEvent<HTMLButtonElement>
      | SyntheticMouseEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLAnchorElement>
      | SyntheticKeyboardEvent<HTMLButtonElement>,
  }) => void,
  /**
   * Text content of the submit button. Be sure to localize!
   */
  submitButtonText: string,
  /**
   * Label for the submit button used for screen readers. Should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/bannerupsell#Accessibility). Be sure to localize!
   */
  submitButtonAccessibilityLabel: string,
  /**
   * Used to disable the submit button.
   */
  submitButtonDisabled?: boolean,
};

/**
 * [BannerUpsell.Form](https://gestalt.pinterest.systems/web/bannerupsell#BannerUpsell.Form) can be used to add a short form to BannerUpsell for collecting data from the user.
 */
export default function BannerUpsellForm({
  children,
  onSubmit,
  submitButtonText,
  submitButtonAccessibilityLabel,
  submitButtonDisabled,
}: Props): ReactNode {
  const responsiveMinWidth = useResponsiveMinWidth();
  const isXsWidth = responsiveMinWidth === 'xs';

  return (
    <form onSubmit={(event) => onSubmit({ event })} style={{ width: '100%' }}>
      <Flex
        direction={isXsWidth ? 'column' : 'row'}
        gap={isXsWidth ? { column: 2, row: 0 } : { row: 2, column: 0 }}
        justifyContent="end"
        wrap
      >
        <Flex.Item flex={isXsWidth ? 'shrink' : 'grow'}>
          <Box smMarginBottom={2} marginBottom={0}>
            {children}
          </Box>
        </Flex.Item>
        <Flex.Item>
          <Button
            accessibilityLabel={submitButtonAccessibilityLabel}
            color="red"
            disabled={submitButtonDisabled}
            fullWidth={isXsWidth}
            text={submitButtonText}
            type="submit"
          />
        </Flex.Item>
      </Flex>
    </form>
  );
}

BannerUpsellForm.displayName = 'BannerUpsell.Form';
