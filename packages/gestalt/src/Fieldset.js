// @flow strict
import type { Node } from 'react';
import cx from 'classnames';
import Text from './Text.js';
import labelStyles from './Label.css';
import formStyles from './FormElement.css';
import formLabelStyles from './FormLabel.css';
import boxWhitespaceStyles from './boxWhitespace.css';
import whitespaceStyles from './whitespace.css';
import boxStyles from './Box.css';

type Props = {|
  children: Node,
  legend: string,
  legendDisplay?: 'visible' | 'hidden',
|};

export default function Fieldset({ legend, legendDisplay = 'visible', children }: Props): Node {
  return (
    <fieldset className={cx(formStyles.unstyled, whitespaceStyles.p0, whitespaceStyles.m0)}>
      <legend
        className={cx(
          labelStyles.label,
          formLabelStyles.formLabel,
          boxWhitespaceStyles.paddingX0,
          legendDisplay === 'hidden' && boxStyles.xsDisplayVisuallyHidden,
        )}
      >
        <Text size="sm">{legend}</Text>
      </legend>
      {children}
    </fieldset>
  );
}
