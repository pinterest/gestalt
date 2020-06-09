// @flow strict
import React, { useState, forwardRef, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import TextField from './TextField.js';
import Text from './Text.js';
import Flyout from './Flyout.js';
import Layer from './Layer.js';
import Touchable from './Touchable.js';

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
  field?: string,
  searchField?: string,
  valueField?: string,
  onBlur?: () => void,
  onBlur?: () => void,
  onChange?: () => void,
  onFocus?: () => void,
  onSelect?: () => void,
  onKeyDown?: () => void,
  size?: () => void,
  value?: () => void,
  caret?: boolean,
  defaultItem?: Object,
  noResultText?: string,
  noResultTextColor?: string,
  resultHeight?: string,
  hoverColor?: string,
  textColor?: string,
  backgroundColor?: string,
  containerColor?: string,
|};

const AutoComplete = (props: Props) => {
  const {
    onBlur,
    onChange,
    onFocus,
    onSelect,
    value = '',
    data,
    resultHeight = '50vh',
    searchField = 'label',
    defaultItem = null,
    caret = false,
    noResultText = 'No Results',
    noResultTextColor = 'red',
    hoverColor = 'lightGray',
    textColor = 'darkGray',
    backgroundColor = 'white',
    containerColor = 'white',
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
  const [selected, setSelected] = useState<object>(defaultItem);

  const [options, setOptions] = useState<object[]>(filterOriginalData(value));

  // Ref to the input
  const inputRef = useRef();

  // Reference to selected option
  let optionRef;
  const getOptionRef = ref => {
    optionRef = ref;
  };

  // Option Container ref
  let containerRef;
  const getContainerRef = ref => {
    containerRef = ref;
  };

  // Handle when input is in and out of focus
  const componentRef = useRef();
  const [focused, setFocused] = useState<boolean>(false);

  // When the menu item opens, scroll to selected item
  useEffect(() => {
    // Scroll to selected
    setTimeout(() => {
      if (selected !== null && containerRef && optionRef)
        scrollIntoView(containerRef?.current, getOptionRef?.current);
    }, 100);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused]);

  const handleFocus = () => {
    // Internally set focus status
    setFocused(componentRef.current.contains(document.activeElement));

    // Run focus callback
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    // Internally set focus status
    console.log(
      document.activeElement,
      componentRef.current,
      document.activeElement.contains(componentRef.current),
      componentRef.current.contains(document.activeElement)
    );

    // TODO: How do I lose focus AFTER the element is selected. Right now blur calls first, closes the selection box before the onSelected is triggered
    setTimeout(() => {
      setFocused(document.activeElement === componentRef.current);
    }, 100);
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
  const handleOnSelect = (item, itemRef) => {
    console.log('item', item, itemRef);
    setSelected(item);

    setSearch(item[searchField]);
    setFocused(false);
    if (onSelect) onSelect(item);
  };

  return (
    <Box ref={componentRef}>
      {/* INPUT FIELD */}
      <TextField
        {...props}
        value={search}
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
              ref={getContainerRef}
              padding={1}
              maxHeight={resultHeight}
              width={`${inputRef?.current?.offsetWidth || 300 - 10}px`}
              overflow="auto"
              color={containerColor}
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
                    getOptionRef={getOptionRef}
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
  option: object,
  selected: object,
  searchField: string,
  hoverColor: string,
  textColor: string,
  backgroundColor: string,
  handleOnSelect: () => void,
  getOptionRef: any => void,
  index: number,
|};

const Option = ({
  index,
  option,
  selected,
  searchField,
  handleOnSelect,
  hoverColor,
  textColor,
  getOptionRef,
  backgroundColor,
}: OptionProps) => {
  // Determine if the option is the current selected item
  const isSelectedItem = JSON.stringify(option) === JSON.stringify(selected);
  // Highlight the current selected item
  // The rest will all be false and will toggle on mouse events
  const [hover, setHover] = useState(isSelectedItem);

  const handleOnKeyPress = () => {
    console.log('keypress');
  };

  return (
    <Box
      ref={getOptionRef()}
      display="flex"
      direction="row"
      role="option"
      aria-selected={false}
      tabIndex={index}
      onKeyPress={handleOnKeyPress}
    >
      <Touchable
        key={option[searchField]}
        onTouch={() => handleOnSelect(option, getOptionRef())}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Box
          marginStart={2}
          marginEnd={2}
          marginBottom={1}
          padding={2}
          flex="grow"
          color={isSelectedItem || hover ? hoverColor : backgroundColor}
        >
          {/* TODO: It'd be cool to render whatever here */}
          <Text
            color={textColor}
            weight={hover ? 'bold' : 'normal'}
          >{`${option[searchField]}`}</Text>
        </Box>
      </Touchable>
    </Box>
  );
};

AutoComplete.displayName = 'AutoComplete';

AutoComplete.propTypes = {
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  helperText: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.exact({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['md', 'lg']),
  value: PropTypes.string,
};

function AutoCompleteForwardRef(props, ref) {
  return <AutoComplete {...props} forwardedRef={ref} />;
}

// ------------------------------
// Scroll Into View
// https://github.com/JedWatson/react-select/blob/master/packages/react-select/src/utils.js
// ------------------------------

export function scrollIntoView(
  menuEl: HTMLElement,
  focusedEl: HTMLElement
): void {
  const menuRect = menuEl.getBoundingClientRect();
  const focusedRect = focusedEl.getBoundingClientRect();
  const overScroll = focusedEl.offsetHeight / 3;

  if (focusedRect.bottom + overScroll > menuRect.bottom) {
    window.scrollTo(
      menuEl,
      Math.min(
        focusedEl.offsetTop +
          focusedEl.clientHeight -
          menuEl.offsetHeight +
          overScroll,
        menuEl.scrollHeight
      )
    );
  } else if (focusedRect.top - overScroll < menuRect.top) {
    window.scrollTo(menuEl, Math.max(focusedEl.offsetTop - overScroll, 0));
  }
}

export default forwardRef<Props, HTMLInputElement>(AutoCompleteForwardRef);
