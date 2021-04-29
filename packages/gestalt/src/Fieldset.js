// @flow strict
import type { Node } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Text from './Text.js';
import labelStyles from './Label.css';
import formStyles from './FormElement.css';
import formLabelStyles from './FormLabel.css';
import whitespaceStyles from './boxWhitespace.css';
import boxStyles from './Box.css';

type Props = {|
  legend: string,
  legendDisplay?: 'visible' | 'visuallyHidden',
  children: Node,
|};

export default function Fieldset({ legend, legendDisplay = 'visible', children }: Props): Node {
  return (
    <fieldset className={formStyles.unstyled}>
      <legend
        className={cx(
          labelStyles.label,
          formLabelStyles.formLabel,
          whitespaceStyles.paddingX0,
          legendDisplay === 'visuallyHidden' && boxStyles.xsDisplayVisuallyHidden,
        )}
      >
        <Text size="sm">{legend}</Text>
      </legend>
      {children}
    </fieldset>
  );
}

Fieldset.propTypes = {
  legend: PropTypes.string,
};
