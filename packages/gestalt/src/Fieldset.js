// @flow strict
import type { Node } from 'react';
import classnames from 'classnames';
import Text from './Text.js';
import labelStyles from './Label.css';
import formStyles from './FormElement.css';
import formLabelStyles from './FormLabel.css';
import boxWhitespaceStyles from './boxWhitespace.css';
import whitespaceStyles from './Whitespace.css';
import boxStyles from './Box.css';

type Props = {|
  children: Node,
  legend: string,
  legendDisplay?: 'visible' | 'hidden',
|};

/**
 * https://gestalt.pinterest.systems/Fieldset
 */
export default function Fieldset({ legend, legendDisplay = 'visible', children }: Props): Node {
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
    </fieldset>
  );
}
