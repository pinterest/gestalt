// @flow strict

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Text from './Text.js';
import TapArea from './TapArea.js';

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
  // getOptionRef: (HTMLElement | null) => void,
|};

const Option = ({
  index,
  option,
  selected,
  searchField,
  handleSelect,
}: // getOptionRef,
OptionProps) => {
  // Determine if the option is the current selected item
  const isSelectedItem = JSON.stringify(option) === JSON.stringify(selected);

  // Highlight the current selected item
  const [hover, setHover] = useState(isSelectedItem);

  const handleOnTap = () => {
    if (handleSelect) handleSelect(option);
  };
  return (
    <TapArea
      // ref={ref => {
      //   // Only send ref of selected item
      //   if (selected) getOptionRef(ref);
      // }}
      key={option[searchField]}
      onTap={handleOnTap}
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
    </TapArea>
  );
};

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

export default Option;
