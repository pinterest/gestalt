// @flow strict
import { type Node } from 'react';
import Fieldset from './Fieldset.js';
import Flex from './Flex.js';
import RadioGroupButton from './RadioGroupButton.js';
import { RadioGroupContextProvider } from './RadioGroupContext.js';

type Props = {|
  /**
   * The individual RadioGroup.RadioButtons for this group
   *
   */
  children: Node,
  /**
   * A unique identifier for this RadioGroup. `id` must be specified when an `errorMessage` is added.
   *
   */
  id?: string,
  /**
   * The legend of the radio group that describes what is being selected.
   *
   */
  legend: string,
  /**
   * Determines the layout of the group. See the [direction](https://gestalt.pinterest.systems/radiogroup#Direction) variant to learn more.
   *
   */
  direction?: 'column' | 'row',
  /**
   * Adds an error message below the group of radio buttons. See the [error](https://gestalt.pinterest.systems/radiogroup#With-an-error) variant to learn more.
   *
   */
  errorMessage?: string,
  /**
   * Whether the legend should be visible or not. If hidden, the legend is still available for screen reader users, but does not appear visually. See the [legend visibility](https://gestalt.pinterest.systems/radiogroup#Legend-visibility) variant to learn more.
   *
   */
  legendDisplay?: 'visible' | 'hidden',
|};

/**
 *  RadioGroups are used for selecting only 1 item from a list of 2 or more items. If you need multiple selection or have only one option, use [Checkbox](https://gestalt.pinterest.systems/checkbox). If you need, to provide a binary on/off choice that takes effect immediately, use [Switch](https://gestalt.pinterest.systems/switch).
 *
 */
export default function RadioGroup({
  children,
  errorMessage,
  id,
  legend,
  legendDisplay,
  direction = 'column',
}: Props): Node {
  return (
    <RadioGroupContextProvider value={{ parentName: 'RadioGroup', hasError: !!errorMessage }}>
      <Fieldset id={id} legend={legend} errorMessage={errorMessage} legendDisplay={legendDisplay}>
        <Flex direction={direction} gap={2}>
          {children}
        </Flex>
      </Fieldset>
    </RadioGroupContextProvider>
  );
}

RadioGroup.RadioButton = RadioGroupButton;
