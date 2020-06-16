// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/no-relative-parent-imports */
// @flow strict
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import InputField from './InputField.js';
import Option from './Option.js';
import Box from '../Box.js';
import Text from '../Text.js';
import Flyout from '../Flyout.js';
import Layer from '../Layer.js';

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

type OptionObject = {
  label: string,
  value: string,
};

type Props = {|
  accessibilityLabel: string,
  id: string,
  onChange: ({ event: SyntheticInputEvent<>, value: string }) => void,
  data: Array<{
    label: string,
    value: string,
  }>,
  placeholder?: string,
  size?: 'md' | 'lg',
  value?: ?string,
  searchField?: string,
  onBlur?: () => void,
  onChange?: ({
    event: SyntheticEvent<HTMLInputElement>,
    value: string,
  }) => void => void,
  onFocus?: () => void,
  onSelect?: OptionObject => void,
  value?: string,
  caret?: boolean,
  defaultItem?: OptionObject,
  noResultText?: string,
  noResultTextColor?: TextColors,
  resultHeight?: string,
  hoverColor?: TextColors,
  textColor?: TextColors,
  backgroundColor?: TextColors,
|};

const Typeahead = (props: Props) => {
  const {
    accessibilityLabel = 'Demo Search Field',
    id,
    onBlur,
    onChange,
    onFocus,
    onSelect,
    value = '',
    data,
    placeholder,
    size,
    resultHeight = '50vh',
    searchField = 'label',
    defaultItem = null,
    caret = false,
    noResultText = 'No Results',
    noResultTextColor = 'gray',
    hoverColor = 'lightGray',
    textColor = 'darkGray',
    backgroundColor = 'white',
  } = props;

  // Store original data
  const dataRef = useRef(data);

  // Utility function for filtering data by value
  const filterOriginalData = filterValue =>
    dataRef.current.filter(item =>
      item[searchField].toLowerCase().includes(filterValue.toLowerCase())
    );

  // Track input value
  const [search, setSearch] = useState<string>(value);

  // Track the selected item - could be used to see if someone is selecting the same thing again
  const [selected, setSelected] = useState<OptionObject | null>(defaultItem);

  const [options, setOptions] = useState<OptionObject[]>(
    filterOriginalData(search)
  );

  // Ref to the input
  const inputRef = useRef();

  // Reference to selected option
  // let selectedOptionRef;
  // const getOptionRef = ref => {
  //   selectedOptionRef = ref;
  // };

  // Option Container ref
  // let containerRef;
  // const getContainerRef = ref => {
  //   containerRef = ref;
  // };

  // Handle when input is in and out of focus
  const componentRef = useRef();
  const [focused, setFocused] = useState<boolean>(false);

  // When the menu item opens, scroll to selected item
  // useEffect(() => {
  //   setTimeout(() => {
  //     // TODO: Fix scrolling calcultation
  //     // if (selected !== null && containerRef && selectedOptionRef)
  //     // eslint-disable-next-line no-use-before-define
  //     // scrollIntoView(containerRef, selectedOptionRef);
  //   }, 100);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [focused, selectedOptionRef]);

  const handleFocus = () => {
    // Internally set focus status
    if (componentRef.current)
      setFocused(componentRef.current.contains(document.activeElement));

    // Run focus callback
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    // Clear input and reset options
    if (options.length === 0) {
      setSearch('');
      setOptions(dataRef.current);
    }

    // TODO: Is this the best way to hide the results on blur
    if (document.activeElement && componentRef.current) {
      setTimeout(() => {
        setFocused(document.activeElement === componentRef.current);
      }, 100);
    }
    // Run blur callback
    if (onBlur) onBlur();
  };

  // Handler for when text is typed
  // This rule is stupid
  // eslint-disable-next-line no-shadow
  const handleChange = ({ syntheticEvent: event, value }) => {
    // Filter the available options using original data
    const updatedOptions = filterOriginalData(value);

    // Update the avalble options
    setOptions(updatedOptions);

    // Update the search value
    setSearch(value);

    // Run onChange callback
    if (onChange) onChange({ event, value });
  };

  const handleClear = () => {
    setSelected(null);
    setSearch('');
    setFocused(false);
  };

  // Handler for when an item is clicked
  const handle = item => {
    setSelected(item);

    setSearch(item[searchField]);
    setFocused(false);
    if (onSelect) onSelect(item);
  };

  return (
    <Box ref={componentRef}>
      {/* INPUT FIELD */}
      <InputField
        accessibilityLabel={accessibilityLabel}
        id={id}
        value={search}
        placeholder={placeholder}
        size={size}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClear={handleClear}
        ref={inputRef}
      />

      {/* RESULTS CONTAINER */}
      {focused && (
        <Layer>
          <Flyout
            showCaret={caret}
            anchor={inputRef.current}
            idealDirection="down"
            onDismiss={() => {}}
            positionRelativeToAnchor={false}
            size="flexible"
          >
            <Box
              // ref={getContainerRef}
              position="relative"
              display="block"
              padding={1}
              marginTop={2}
              marginBottom={2}
              maxHeight={resultHeight}
              width={`${inputRef?.current?.offsetWidth || 300 - 10}px`}
              overflow="auto"
              color={backgroundColor}
            >
              <Box
                alignItems="center"
                direction="column"
                display="flex"
                marginStart={-1}
                marginEnd={-1}
              >
                {/* Handle when no results */}
                {options.length === 0 && (
                  <Box margin={2}>
                    <Text color={noResultTextColor}>{noResultText}</Text>
                  </Box>
                )}

                {/* Return options */}
                {options.map((option, index) => (
                  <Option
                    key={`${option[searchField] + index}`}
                    option={option}
                    searchField={searchField}
                    selected={selected}
                    handle={handle}
                    hoverColor={hoverColor}
                    textColor={textColor}
                    backgroundColor={backgroundColor}
                    // getOptionRef={getOptionRef}
                  />
                ))}
              </Box>
            </Box>
          </Flyout>
        </Layer>
      )}
    </Box>
  );
};

Typeahead.displayName = 'Typeahead';

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
Typeahead.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  data: PropTypes.arrayOf(
    PropTypes.exact({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['md', 'lg']),
  value: PropTypes.string,
  searchField: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onSelect: PropTypes.func,
  caret: PropTypes.bool,
  defaultItem: PropTypes.exact({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
  noResultText: PropTypes.string,
  noResultTextColor: PropTypes.oneOf(TEXT_COLORS),
  resultHeight: PropTypes.string,
  hoverColor: PropTypes.oneOf(TEXT_COLORS),
  textColor: PropTypes.oneOf(TEXT_COLORS),
  backgroundColor: PropTypes.oneOf(TEXT_COLORS),
};

export default Typeahead;

// ------------------------------
// Scroll Into View
// https://github.com/JedWatson/react-select/blob/master/packages/react-select/src/utils.js
// // ------------------------------

// export function scrollIntoView(
//   menuEl: HTMLElement,
//   focusedEl: HTMLElement
// ): void {
//   const menuRect = menuEl.getBoundingClientRect();
//   const focusedRect = focusedEl.getBoundingClientRect();
//   const overScroll = focusedEl.offsetHeight / 3;

//   if (focusedRect.bottom + overScroll > menuRect.bottom) {
//     menuEl.scrollTo(
//       0,
//       Math.min(
//         focusedEl.offsetTop +
//           focusedEl.clientHeight -
//           menuEl.offsetHeight +
//           overScroll,
//         menuEl.scrollHeight
//       )
//     );
//   } else if (focusedRect.top - overScroll < menuRect.top) {
//     window.scrollTo(menuEl, Math.max(focusedEl.offsetTop - overScroll, 0));
//   }
// }
