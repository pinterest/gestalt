// @flow strict
import { type Node } from 'react';
import Fieldset from './Fieldset.js';
import Flex from './Flex.js';

type Props = {|
  /**
   * The individual RadioButtons for this group
   *
   */
  children: Node,
  /**
   * A unique identifier for this Fieldset. id must be specified when an errorMessage is added.
   *
   */
  id?: string,
  /**
   * The legend of the radio group that describes what is being selected
   *
   */
  legend: string,
  /**
   * Determines the layout of the group
   *
   */
  direction?: 'column' | 'row',
  /**
   * Adds an error message below the group of radio buttons
   *
   */
  errorMessage?: string,
  /**
   * Whether the legend should be visible or not. If hidden, the legend is still available for screen reader users, but does not appear visually. See the legend visibility variant for more info.
   *
   */
  legendDisplay?: 'visible' | 'hidden',
|};

/**
 *  Use [RadioGroup](https://gestalt.pinterest.systems/radiogroup) when you have a few options (RadioButtons) that a user can choose from. Never use radio buttons if the user can select more than one option from a list.
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
    <Fieldset id={id} legend={legend} errorMessage={errorMessage} legendDisplay={legendDisplay}>
      <Flex direction={direction} gap={2}>
        {children}
      </Flex>
    </Fieldset>
  );
}
