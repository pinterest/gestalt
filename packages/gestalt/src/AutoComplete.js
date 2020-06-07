// @flow strict
import React, { useState, forwardRef, useRef } from 'react';
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

  // Handle when input is in and out of focus
  const componentRef = useRef();
  const [focused, setFocused] = useState<boolean>(false);

  // Track input value
  const [search, setSearch] = useState<string>(value);

  // Track the selected item - could be used to see if someone is selecting the same thing again
  const [selected, setSelected] = useState<object>(defaultItem);

  const [options, setOptions] = useState<object[]>(filterOriginalData(value));

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
  const handleOnSelect = item => {
    setSelected(item);
    setSearch(item[searchField]);
    setFocused(false);
    if (onSelect) onSelect(item);
  };
  const anchorRef = React.useRef();
  return (
    <Box ref={componentRef}>
      {/* INPUT FIELD */}
      <TextField
        {...props}
        value={search}
        onChange={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={anchorRef}
      />

      {/* RESULTS CONTAINER */}
      {focused && (
        <Layer>
          <Flyout
            showCaret={caret}
            anchor={anchorRef.current}
            idealDirection="down"
            onDismiss={() => {}}
            positionRelativeToAnchor={false}
            size="flexible"
          >
            <Box
              padding={1}
              maxHeight={resultHeight}
              width={`${anchorRef.current.offsetWidth - 10}px`}
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
                    option={option}
                    searchField={searchField}
                    selected={selected}
                    handleOnSelect={handleOnSelect}
                    hoverColor={hoverColor}
                    textColor={textColor}
                    backgroundColor={backgroundColor}
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
|};

const Option = ({
  option,
  selected,
  searchField,
  handleOnSelect,
  hoverColor,
  textColor,
  backgroundColor,
}: OptionProps) => {
  // Determine if the option is the current selected item
  const isSelectedItem = JSON.stringify(option) === JSON.stringify(selected);
  // Highlight the current selected item
  // The rest will all be false and will toggle on mouse events
  const [hover, setHover] = useState(isSelectedItem);

  return (
    <Touchable
      key={option[searchField]}
      onTouch={() => handleOnSelect(option)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Box
        marginStart={2}
        marginEnd={2}
        marginBottom={1}
        padding={2}
        color={isSelectedItem || hover ? hoverColor : backgroundColor}
      >
        {/* TODO: It'd be cool to render whatever here */}
        <Text
          color={textColor}
          weight={hover ? 'bold' : 'normal'}
        >{`${option[searchField]}`}</Text>
      </Box>
    </Touchable>
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

export default forwardRef<Props, HTMLInputElement>(AutoCompleteForwardRef);
