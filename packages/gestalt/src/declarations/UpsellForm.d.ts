import type { Node } from 'react';
import 'react';
type Props = {
  /**
   * Contents of the form, typically input components like [TextField](https://gestalt.pinterest.systems/web/textfield) or [NumberField](https://gestalt.pinterest.systems/web/numberfield).
   */
  children: Node;
  /**
   * Callback triggered when the form is submitted.
   */
  onSubmit: (arg0: {
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
   * Label for the submit button used for screen readers. Should follow the [Accessibility guidelines](https://gestalt.pinterest.systems/web/upsell#Accessibility). Be sure to localize!
   */
  submitButtonAccessibilityLabel: string;
  /**
   * Used to disable the submit button.
   */
  submitButtonDisabled?: boolean;
};
/**
 * [Upsell.Form](https://gestalt.pinterest.systems/web/upsell#Upsell.Form) can be used to add a short form to Upsell for collecting data from the user.
 */
declare function UpsellForm({
  children,
  onSubmit,
  submitButtonText,
  submitButtonAccessibilityLabel,
  submitButtonDisabled,
}: Props): Node;
declare namespace UpsellForm {
  var displayName: string;
}
export default UpsellForm;
