// @flow strict
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import InputField from './TypeaheadInputField.js';
import Option from './TypeaheadOption.js';
import Box from './Box.js';
import Text from './Text.js';
import Flyout from './Flyout.js';
import Layer from './Layer.js';

type OptionObject = {|
  label: string,
  value: string,
|};

type Props = {|
  data: Array<{
    label: string,
    value: string,
  }>,
  defaultItem?: OptionObject,
  id: string,
  label: string,
  noResultText: string,
  onBlur?: ({
    event: SyntheticFocusEvent<HTMLInputElement>,
  }) => void,
  onChange?: ({
    event: SyntheticInputEvent<HTMLInputElement>,
    value: string,
  }) => void,
  onFocus?: ({
    event: SyntheticFocusEvent<HTMLInputElement>,
    value: string,
  }) => void,
  onSelect?: OptionObject => void,
  placeholder?: string,
  searchField?: string,
  size?: 'md' | 'lg',
|};

const Typeahead = (props: Props) => {
  const {
    data,
    defaultItem = null,
    id,
    label = '',
    noResultText,
    onBlur,
    onChange,
    onFocus,
    onSelect,
    placeholder,
    searchField = 'label',
    size,
  } = props;

  // Store original data
  const dataRef = useRef(data);

  // Utility function for filtering data by value
  const filterOriginalData = filterValue =>
    dataRef.current.filter(item =>
      item[searchField].toLowerCase().includes(filterValue.toLowerCase())
    );

  // Track input value
  const [search, setSearch] = useState<string>(defaultItem?.label || '');

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
  const [containerOpen, setContainerOpen] = useState<boolean>(false);

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

  const handleFocus = ({ event, value }) => {
    // Run focus callback
    if (onFocus) onFocus({ event, value });
  };

  const handleBlur = ({ event }) => {
    // Clear input and reset options when no results
    if (options.length === 0) {
      setSearch('');
      setOptions(dataRef.current);
    }

    setContainerOpen(false);

    // Run blur callback
    if (onBlur) onBlur({ event });
  };

  // Handler for when text is typed
  const handleChange = ({ event, value }) => {
    if (containerOpen === false) setContainerOpen(true);

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
    console.log('handleClear');
    setSelected(null);
    setSearch('');
    setContainerOpen(false);
    if (inputRef.current) inputRef.current.focus();
  };

  // Handler for when an item is clicked
  const handleSelect = item => {
    setSelected(item);

    setSearch(item[searchField]);
    setContainerOpen(false);
    if (inputRef.current) inputRef.current.focus();
    if (onSelect) onSelect(item);
  };

  return (
    <Box ref={componentRef}>
      <InputField
        label={label}
        id={id}
        value={search}
        placeholder={placeholder}
        size={size}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClear={handleClear}
        setContainer={setContainerOpen}
        ref={inputRef}
      />

      {containerOpen && inputRef.current && (
        <Layer>
          <Flyout
            showCaret={false}
            anchor={inputRef.current}
            idealDirection="down"
            onDismiss={() => {}}
            positionRelativeToAnchor={false}
            size="flexible"
          >
            <Box
              // ref={getContainerRef}
              position="relative"
              padding={1}
              marginTop={2}
              marginBottom={2}
              maxHeight="50vh"
              width={`${inputRef?.current?.offsetWidth}px`}
              overflow="auto"
              color="white"
            >
              <Box alignItems="center" direction="column" display="flex">
                {/* Handle when no results */}
                {options.length === 0 && (
                  <Box margin={2}>
                    <Text color="gray">{noResultText}</Text>
                  </Box>
                )}
                {/* Return options */}
                {options.map((option, index) => (
                  <Option
                    key={`${option[searchField] + index}`}
                    option={option}
                    searchField={searchField}
                    selected={selected}
                    handleSelect={handleSelect}
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
  searchField: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onSelect: PropTypes.func,
  defaultItem: PropTypes.exact({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
  noResultText: PropTypes.string,
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
