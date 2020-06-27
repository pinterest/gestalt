// @flow strict
import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from './Box.js';
import Text from './Text.js';
import styles from './Touchable.css';
import getRoundingClassName from './getRoundingClassName.js';

type OptionObject = {|
  label: string,
  value: string,
|};

type OptionProps = {|
  index: number,
  option: OptionObject,
  selected?: OptionObject | null,
  searchField: string,
  handleSelect: OptionObject => void,
|};

export default function Option({
  index,
  option,
  selected,
  searchField,
  handleSelect,
}: OptionProps): React.Node {
  // Determine if the option is the current selected item
  const isSelectedItem = JSON.stringify(option) === JSON.stringify(selected);

  // Highlight the current selected item
  const [hover, setHover] = useState(isSelectedItem);

  const handleOnTap = () => {
    if (handleSelect) handleSelect(option);
  };

  const className = classnames(styles.touchable, getRoundingClassName(2), {
    [styles.fullWidth]: true,
    [styles.pointer]: true,
  });

  return (
    <div
      className={`${className}`}
      key={option[searchField]}
      onClick={handleOnTap}
      onMouseDown={event => {
        event.preventDefault();
      }}
      onKeyPress={event => {
        event.preventDefault();
      }}
      rounding={2}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      role="option"
      aria-selected={isSelectedItem}
      tabIndex={index}
    >
      <Box
        margin={1}
        padding={2}
        color={isSelectedItem || hover ? 'lightGray' : 'white'}
        rounding={2}
      >
        <Text color="darkGray">{`${option[searchField]}`}</Text>
      </Box>
    </div>
  );
}

Option.displayName = 'Option';

Option.propTypes = {
  option: PropTypes.exact({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
  selected: PropTypes.exact({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
  searchField: PropTypes.string,
  handleSelect: PropTypes.func,
};
