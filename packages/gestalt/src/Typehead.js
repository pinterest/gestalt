// @flow strict
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import TextField from './TextField.js';
import Text from './Text.js';
import Flyout from './Flyout.js';
import Layer from './Layer.js';
import Touchable from './Touchable.js';

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
  errorMessage?: string,
  disabled?: boolean,
  helperText?: string,
  id: string,
  label?: string,
  name?: string,
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
    event: SyntheticInputEvent<HTMLInputElement>,
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

const Typehead = (props: Props) => {
  const {
    id,
    onBlur,
    onChange,
    onFocus,
    onSelect,
    value = '',
    data,
    disabled = false,
    errorMessage,
    helperText,
    label,
    name,
    placeholder,
    size,
    resultHeight = '50vh',
    searchField = 'label',
    defaultItem = null,
    caret = true,
    noResultText = 'No Results',
    noResultTextColor = 'red',
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
  const handleInput = ({ event, value }) => {
    // Filter the available options using original data
    const updatedOptions = filterOriginalData(value);

    // Update the avalble options
    setOptions(updatedOptions);

    // Update the search value
    setSearch(value);

    // Run onChange callback
    if (onChange) onChange({ event, value });
  };

  // Handler for when an item is clicked
  const handleOnSelect = item => {
    setSelected(item);

    setSearch(item[searchField]);
    setFocused(false);
    if (onSelect) onSelect(item);
  };

  return (
    <Box ref={componentRef}>
      {/* INPUT FIELD */}
      <TextField
        id={id}
        disabled={disabled}
        errorMessage={errorMessage}
        helperText={helperText}
        label={label}
        name={name}
        value={search}
        placeholder={placeholder}
        size={size}
        onChange={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
                    index={index}
                    option={option}
                    searchField={searchField}
                    selected={selected}
                    handleOnSelect={handleOnSelect}
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

type OptionProps = {|
  option: OptionObject,
  selected?: OptionObject | null,
  searchField: string,
  hoverColor: string,
  textColor: TextColors,
  backgroundColor: string,
  handleOnSelect: OptionObject => void,
  // getOptionRef: (HTMLElement | null) => void,
|};

const Option = ({
  option,
  selected,
  searchField,
  handleOnSelect,
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
    if (handleOnSelect) handleOnSelect(option);
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
      color={isSelectedItem || hover ? hoverColor : backgroundColor}
    >
      <Touchable
        key={option[searchField]}
        onTouch={handleOnTouch}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Box marginStart={2} marginEnd={2} marginBottom={1} padding={2}>
          {/* TODO: It'd be cool to render whatever here */}
          <Text color={textColor}>{`${option[searchField]}`}</Text>
        </Box>
      </Touchable>
    </Box>
  );
};

Typehead.displayName = 'Typehead';

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
Typehead.propTypes = {
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  data: PropTypes.arrayOf,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['md', 'lg']),
  value: PropTypes.string,
  searchField: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onSelect: PropTypes.func,
  caret: PropTypes.bool,
  defaultItem: PropTypes.objectOf,
  noResultText: PropTypes.string,
  noResultTextColor: PropTypes.oneOf(TEXT_COLORS),
  resultHeight: PropTypes.string,
  hoverColor: PropTypes.oneOf(TEXT_COLORS),
  textColor: PropTypes.oneOf(TEXT_COLORS),
  backgroundColor: PropTypes.oneOf(TEXT_COLORS),
};

export default Typehead;

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
