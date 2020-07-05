// @flow strict
import * as React from 'react';
import { useState, useRef, type Node } from 'react';
import PropTypes from 'prop-types';
import TypeaheadInputField from './TypeaheadInputField.js';
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
  data: Array<{|
    label: string,
    value: string,
  |}>,
  defaultItem?: OptionObject,
  id: string,
  label: string,
  noResultText: string,
  onBlur?: ({|
    event:
      | SyntheticFocusEvent<HTMLInputElement>
      | SyntheticEvent<HTMLInputElement>,
  |}) => void,
  onChange?: ({|
    event: SyntheticInputEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  onFocus?: ({|
    event: SyntheticFocusEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  onSelect?: ({|
    event:
      | SyntheticFocusEvent<HTMLInputElement>
      | SyntheticKeyboardEvent<HTMLInputElement>,
    item: ?OptionObject,
  |}) => void,
  placeholder?: string,
  searchField?: string,
  size?: 'md' | 'lg',
  forwardedRef?: React.Ref<'input'>,
|};

const Typeahead = (props: Props): Node => {
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
    forwardedRef,
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

  const [hoveredItem, setHoveredItem] = useState<number | null>(0);

  const [options, setOptions] = useState<OptionObject[]>(
    filterOriginalData(search)
  );

  // Ref to the input
  const inputRef = useRef();

  const [containerOpen, setContainerOpen] = useState<boolean>(false);

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
    setSelected(null);
    setSearch('');
    setContainerOpen(false);
    if (inputRef.current) inputRef.current.focus();
  };

  // Handler for when an item is clicked
  const handleSelect = ({ event, item }) => {
    setSelected(item);

    setSearch(item[searchField]);
    setContainerOpen(false);
    if (inputRef.current) inputRef.current.focus();
    if (onSelect) onSelect({ event, item });
  };

  let selectedElement;
  const setOptionRef = ref => {
    selectedElement = ref;
  };

  const containerRef = useRef();

  const handleScrolling = (direction: number) => {
    const container = containerRef.current;

    // Based on keyboard navigation we get the next or previuos option
    // When we reach the start or end of the list, move to the start or end of the list based on the direction
    const nextOption =
      direction > 0
        ? // $FlowFixMe[incompatible-cast]
          (selectedElement?.nextSibling: ?HTMLElement)
        : // $FlowFixMe[incompatible-cast]
          (selectedElement?.previousSibling: ?HTMLElement);

    // Handles which option to display once we've hit the end of the list range
    const endRangeOption =
      direction > 0
        ? container?.firstChild?.firstChild
        : container?.firstChild?.lastChild;

    const selectedOption = nextOption || endRangeOption;

    // If one of these nodes is missing exit early
    if (!container || !selectedOption) return;

    const containerHeight = container.getClientRects()[0].height;
    const overScroll = selectedOption?.offsetHeight / 3;

    const scrollPos =
      selectedOption.offsetTop +
      selectedOption.clientHeight -
      containerHeight +
      overScroll;

    container.scrollTop = scrollPos;
  };

  const handleKeyNavigation = (
    event: SyntheticKeyboardEvent<HTMLInputElement>,
    direction: number
  ) => {
    let cursorIndex;
    let newItem: OptionObject = options[0];
    const optionsCount = options.length - 1;

    const KEYS = {
      ENTER: 0,
    };

    // If there's an existing item, navigate from that position

    const newIndex = direction + hoveredItem;

    // If we've reached the end, start at the top
    if (newIndex > optionsCount) {
      cursorIndex = 0;
    }
    // If we're at the top going backwards, start at the last item
    else if (newIndex < 0) {
      cursorIndex = optionsCount;
    }
    // Carry-on otherwise
    else {
      cursorIndex = newIndex;
    }
    newItem = options[cursorIndex];

    setHoveredItem(cursorIndex);

    if (direction === KEYS.ENTER) {
      setSelected(newItem);
      setSearch(newItem[searchField]);
      handleBlur({ event });
      if (onSelect) onSelect({ event, item: newItem });
    }
    // Scrolling
    handleScrolling(direction);
  };

  const handleHover = (ref, index) => {
    setHoveredItem(index);
  };

  return (
    <Box ref={forwardedRef}>
      <TypeaheadInputField
        label={label}
        id={id}
        value={search}
        placeholder={placeholder}
        size={size}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClear={handleClear}
        onKeyNavigation={handleKeyNavigation}
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
              ref={containerRef}
              position="relative"
              overflow="auto"
              padding={1}
              marginTop={2}
              marginBottom={2}
              maxHeight="50vh"
              width={inputRef?.current?.offsetWidth}
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
                    index={index}
                    key={`${option[searchField] + index}`}
                    option={option}
                    searchField={searchField}
                    selected={selected}
                    hoveredItem={hoveredItem}
                    setHoveredItem={handleHover}
                    handleSelect={handleSelect}
                    setOptionRef={setOptionRef}
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

const forwardRefTypeaheadField = (props, ref): Node => {
  return <Typeahead {...props} forwardedRef={ref} />;
};

forwardRefTypeaheadField.displayName = 'Typeahead';

export default (React.forwardRef<Props, HTMLInputElement>(
  forwardRefTypeaheadField
): React$AbstractComponent<Props, HTMLInputElement>);
