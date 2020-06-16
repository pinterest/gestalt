// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/no-relative-parent-imports */
// @flow strict

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '../Box.js';
import Text from '../Text.js';
import Touchable from '../Touchable.js';

type TextColors =
  | 'green'
  | 'pine'
  | 'olive'
  | 'blue'
  | 'navy'
  | 'midnight'
  | 'purple'
  | 'orchid'
  | 'eggplant'
  | 'maroon'
  | 'watermelon'
  | 'orange'
  | 'darkGray'
  | 'gray'
  | 'lightGray'
  | 'red'
  | 'white';

type OptionProps = {|
  option: OptionObject,
  selected?: OptionObject | null,
  searchField: string,
  hoverColor: string,
  textColor: TextColors,
  backgroundColor: string,
  handle: OptionObject => void,
  // getOptionRef: (HTMLElement | null) => void,
|};

const Option = ({
  option,
  selected,
  searchField,
  handle,
  hoverColor,
  textColor,
  // getOptionRef,
  backgroundColor,
}: OptionProps) => {
  // Determine if the option is the current selected item
  const isSelectedItem = JSON.stringify(option) === JSON.stringify(selected);

  // Highlight the current selected item
  const [hover, setHover] = useState(isSelectedItem);

  const handleOnTouch = () => {
    if (handle) handle(option);
  };

  return (
    <Box
      // ref={ref => {
      //   // Only send ref of selected item
      //   if (selected) getOptionRef(ref);
      // }}
      width="100%"
      marginBottom={1}
      display="flex"
      role="option"
      aria-selected={isSelectedItem}
    >
      <Touchable
        key={option[searchField]}
        onTouch={handleOnTouch}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Box
          marginStart={2}
          marginEnd={2}
          padding={2}
          color={isSelectedItem || hover ? hoverColor : backgroundColor}
          rounding={2}
        >
          {/* TODO: It'd be cool to render whatever here */}
          <Text color={textColor}>{`${option[searchField]}`}</Text>
        </Box>
      </Touchable>
    </Box>
  );
};

Option.displayName = 'Option';

const TEXT_COLORS = [
  'green',
  'pine',
  'olive',
  'blue',
  'navy',
  'midnight',
  'purple',
  'orchid',
  'eggplant',
  'maroon',
  'watermelon',
  'orange',
  'darkGray',
  'gray',
  'lightGray',
  'red',
  'white',
];

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
  hoverColor: PropTypes.string,
  textColor: PropTypes.oneOf(TEXT_COLORS),
  backgroundColor: PropTypes.string,
  handle: PropTypes.func,
};

export default Option;
