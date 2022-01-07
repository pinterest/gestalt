// @flow strict
import type { Node } from 'react';
import classnames from 'classnames';
import boxStyles from './Box.css';
import boxWhitespaceStyles from './boxWhitespace.css';
import FormErrorMessage from './FormErrorMessage.js';
import formLabelStyles from './FormLabel.css';
import formStyles from './FormElement.css';
import labelStyles from './Label.css';
import Text from './Text.js';
import whitespaceStyles from './Whitespace.css';

type Props = {|
  /**
   * The content of Fieldset, typically [RadioButtons](https://gestalt.pinterest.systems/radiobutton), [Checkboxes](https://gestalt.pinterest.systems/checkbox) or [TextFields](https://gestalt.pinterest.systems/textfield).
   */
  children: Node,
  /**
   * A unique identifier for this Fieldset. `id` must be specified when an errorMessage is added.
   */
  id?: string,
  /**
   * When needed, pass a string with a helpful error message (be sure to localize!).
   */
  errorMessage?: string,
  /**
   * Caption that clearly and concisely describes the form elements grouped in the fieldset.
   */
  legend: string,
  /**
   * Whether the legend should be visible or not. If `hidden`, the legend is still available for screen reader users, but does not appear visually. See the [legend visibility variant](https://gestalt.pinterest.systems#Legend-visibility) for more info.
   */
  legendDisplay?: 'visible' | 'hidden',
|};

/**
 * [Fieldset](https://gestalt.pinterest.systems/fieldset) creates a fieldset and legend for a group of related form items, like [RadioButtons](https://gestalt.pinterest.systems/radiobutton) or [CheckBoxes](https://gestalt.pinterest.systems/checkbox), in order to clearly indicate related form items."
 */
export default function Fieldset({
  id = '',
  errorMessage,
  legend,
  legendDisplay = 'visible',
  children,
}: Props): Node {
  if (errorMessage && id === '') {
    // eslint-disable-next-line no-console
    console.error('Please provide an id property to <Fieldset />');
  }

  return (
    <fieldset className={classnames(formStyles.unstyled, whitespaceStyles.p0, whitespaceStyles.m0)}>
      <legend
        className={classnames(
          labelStyles.label,
          formLabelStyles.formLabel,
          boxWhitespaceStyles.paddingX0, // Needed to remove the default legend  padding
          {
            [boxStyles.visuallyHidden]: legendDisplay === 'hidden',
          },
        )}
      >
        <Text size="sm">{legend}</Text>
      </legend>
      {children}
      {errorMessage && <FormErrorMessage id={id} text={errorMessage} />}
    </fieldset>
  );
}
