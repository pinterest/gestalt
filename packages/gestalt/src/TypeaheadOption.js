// @flow strict
import * as React from 'react';
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
  handleSelect: ({
    item: OptionObject,
    event: SyntheticFocusEvent<HTMLInputElement>,
  }) => void,
  hoveredItem: ?number,
  setHoveredItem: (?React.Node, number) => void,
  setOptionRef: (?HTMLElement) => void,
|};

export default function Option({
  index,
  option,
  selected,
  searchField,
  handleSelect,
  hoveredItem,
  setHoveredItem,
  setOptionRef,
}: OptionProps): React.Node {
  // Determine if the option is the current selected item
  const isSelectedItem = JSON.stringify(option) === JSON.stringify(selected);

  const handleOnTap = event => {
    if (handleSelect) handleSelect({ event, item: option });
  };

  const className = classnames(styles.touchable, getRoundingClassName(2), {
    [styles.fullWidth]: true,
    [styles.pointer]: true,
  });

  // Default option color
  let optionStateColor = 'white';
  // Set color on item selected
  if (isSelectedItem) optionStateColor = 'lightWash';
  // Set color on item hover
  if (index === hoveredItem) optionStateColor = 'lightGray';

  return (
    <div
      ref={ref => {
        if (index === hoveredItem) setOptionRef(ref);
      }}
      className={className}
      key={option[searchField]}
      onClick={handleOnTap}
      onMouseDown={event => {
        event.preventDefault();
      }}
      onKeyPress={event => {
        event.preventDefault();
      }}
      rounding={2}
      onMouseEnter={() => setHoveredItem(null, index)}
      role="option"
      aria-selected={isSelectedItem}
      tabIndex="-1"
    >
      <Box margin={1} padding={2} color={optionStateColor} rounding={2}>
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
