import { ReactNode } from 'react';
import Box from './Box';
import Button from './Button';
import Flex from './Flex';
import useResponsiveMinWidth from './useResponsiveMinWidth';

type Props = {
  /**
   * Contents of the form, typically input components like [TextField](https://gestalt.pinterest.systems/web/textfield) or [NumberField](https://gestalt.pinterest.systems/web/numberfield).
   */
  children: ReactNode;
  /**
   * Callback triggered when the form is submitted.
   */
  onSubmit: (arg1: {
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLButtonElement>;
  }) => void;
  /**
   * Text content of the submit button. Be sure to localize!
   */
  submitButtonText: string;
  /**
   * Label for the submit button used for screen readers. Should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/bannerupsell#Accessibility). Be sure to localize!
   */
  submitButtonAccessibilityLabel: string;
  /**
   * Used to disable the submit button.
   */
  submitButtonDisabled?: boolean;
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
}: Props) {
  const responsiveMinWidth = useResponsiveMinWidth();
  const isXsWidth = responsiveMinWidth === 'xs';

  return (
    // @ts-expect-error - TS2322 - Type 'FormEvent<HTMLFormElement>' is not assignable to type 'MouseEvent<HTMLButtonElement, MouseEvent> | KeyboardEvent<HTMLButtonElement> | MouseEvent<HTMLAnchorElement, MouseEvent> | KeyboardEvent<...>'.
    <form onSubmit={(event) => onSubmit({ event })} style={{ width: '100%' }}>
      <Flex
        direction={isXsWidth ? 'column' : 'row'}
        gap={isXsWidth ? { column: 2, row: 0 } : { row: 2, column: 0 }}
        justifyContent="end"
        wrap
      >
        <Flex.Item flex={isXsWidth ? 'shrink' : 'grow'}>
          <Box marginBottom={0} smMarginBottom={2}>
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
