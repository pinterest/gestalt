// @flow strict
import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  type Node,
  type Ref,
} from 'react';
import PropTypes from 'prop-types';
import TypeaheadInputField from './TypeaheadInputField.js';
import TypeaheadOption from './TypeaheadOption.js';
import Box from './Box.js';
import Text from './Text.js';
import Flyout from './Flyout.js';
import Layer from './Layer.js';

type OptionObject = {|
  label: string,
  value: string,
|};

type Props = {|
  forwardedRef?: Ref<'input'>,
  id: string,
  label?: string,
  noResultText: string,
  onBlur?: ({|
    event:
      | SyntheticFocusEvent<HTMLInputElement>
      | SyntheticEvent<HTMLInputElement>,
    value: string,
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
  options: Array<{|
    label: string,
    value: string,
  |}>,
  placeholder?: string,
  size?: 'md' | 'lg',
  value?: string,
|};

const Typeahead = (props: Props): Node => {
  const {
    options,
    value = null,
    id,
    label,
    noResultText,
    onBlur,
    onChange,
    onFocus,
    onSelect,
    placeholder,
    size,
    forwardedRef,
  } = props;

  // Store original data
  const dataRef = useRef(options);

  // Utility function for filtering data by value
  const filterOriginalData = (filterValue: string): OptionObject[] =>
    dataRef.current.filter(item =>
      item.label.toLowerCase().includes(filterValue.toLowerCase())
    );

  // Utility function to find default value
  const findDefaultOption = (
    defaultValue: string | null
  ): OptionObject | null => {
    if (defaultValue === null) return defaultValue;

    return (
      dataRef.current.find(
        item => item.value.toLowerCase() === defaultValue.toLowerCase()
      ) || null
    );
  };

  // Track input value
  const defaultOption: OptionObject | null = findDefaultOption(value);
  const [search, setSearch] = useState<string>(defaultOption?.label || '');

  // Track the selected item - could be used to see if someone is selecting the same thing again
  const [selected, setSelected] = useState<OptionObject | null>(defaultOption);

  const [hoveredItem, setHoveredItem] = useState<number | null>(0);

  const [availableOptions, setAvailableOptions] = useState<OptionObject[]>(
    dataRef.current
  );

  // Ref to the input
  const inputRef = useRef(null);
  // $FlowFixMe Flow thinks forwardedRef is a number, which is incorrect
  useImperativeHandle(forwardedRef, () => inputRef.current);

  const [containerOpen, setContainerOpen] = useState<boolean>(false);

  // Reset search options when the container is closed
  useEffect(() => {
    if (containerOpen === false) setAvailableOptions(dataRef.current);
  }, [containerOpen]);

  const handleFocus = ({ event }) => {
    // Run focus callback
    if (onFocus) onFocus({ event, value: event.currentTarget.value });
  };

  const handleBlur = ({ event }) => {
    // Clear input and reset options when no results
    if (availableOptions.length === 0) {
      setSearch('');
      setAvailableOptions(dataRef.current);
    }

    setContainerOpen(false);

    // Run blur callback
    if (onBlur) onBlur({ event, value: event.currentTarget.value });
  };

  // Handler for when text is typed
  // eslint-disable-next-line no-shadow
  const handleChange = ({ event, value }) => {
    if (containerOpen === false) setContainerOpen(true);

    // Filter the available options using original data
    const updatedOptions = filterOriginalData(value);

    // Update the avalble options
    setAvailableOptions(updatedOptions);

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

    setSearch(item.label);
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
        ? selectedElement?.nextSibling
        : selectedElement?.previousSibling;

    // Handles which option to display once we've hit the end of the list range
    const endRangeOption =
      direction > 0
        ? container?.firstChild?.firstChild
        : container?.firstChild?.lastChild;

    const selectedOption = nextOption || endRangeOption;

    // If one of these nodes is missing exit early
    if (!container || !selectedOption) return;

    const containerHeight = container.getClientRects()[0].height;
    const overScroll =
      selectedOption instanceof HTMLElement && selectedOption?.offsetHeight / 3;

    const scrollPos =
      selectedOption instanceof HTMLElement &&
      selectedOption.offsetTop +
        selectedOption.clientHeight -
        containerHeight +
        overScroll;

    container.scrollTop = scrollPos;
  };

  const handleKeyNavigation = (
    event: SyntheticKeyboardEvent<HTMLInputElement>,
    direction: -1 | 0 | 1
  ) => {
    const newIndex = direction + hoveredItem;
    const optionsCount = availableOptions.length - 1;

    const KEYS = {
      ENTER: 0,
    };

    // If there's an existing item, navigate from that position

    let cursorIndex = newIndex;

    // If we've reached the end, start at the top
    if (newIndex > optionsCount) {
      cursorIndex = 0;
    }
    // If we're at the top going backwards, start at the last item
    else if (newIndex < 0) {
      cursorIndex = optionsCount;
    }

    const newItem = options[cursorIndex];

    setHoveredItem(cursorIndex);

    if (direction === KEYS.ENTER) {
      // Only set state when there are options.
      // handleBlur will take care of clear empty results
      if (availableOptions.length > 0) {
        setSelected(newItem);
        setSearch(newItem.label);
        if (onSelect) onSelect({ event, item: newItem });
      }

      handleBlur({ event, value: event.currentTarget.value });
    }
    // Scrolling
    handleScrolling(direction);
  };

  return (
    <Box>
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
            // Forces the flyout to re-render and adjust it's position correctly
            key={availableOptions.length}
          >
            <Box
              // The returned element is Node which is incompatible with HTMLElement type
              // $FlowFixMe[incompatible-type]
              ref={containerRef}
              position="relative"
              overflow="auto"
              padding={1}
              marginTop={2}
              marginBottom={2}
              maxHeight="50vh"
              width={inputRef?.current?.offsetWidth}
            >
              <Box alignItems="center" direction="column" display="flex">
                {/* Handle when no results */}
                {availableOptions.length === 0 ? (
                  <Box margin={2}>
                    <Text color="gray">{noResultText}</Text>
                  </Box>
                ) : (
                  availableOptions.map((option, index) => (
                    <TypeaheadOption
                      index={index}
                      key={`${option.value + index}`}
                      option={option}
                      selected={selected}
                      hoveredItem={hoveredItem}
                      setHoveredItem={setHoveredItem}
                      handleSelect={handleSelect}
                      setOptionRef={setOptionRef}
                    />
                  ))
                )}
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
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any,
    }),
  ]),
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.exact({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['md', 'lg']),
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onSelect: PropTypes.func,
  noResultText: PropTypes.string.isRequired,
};

const forwardRefTypeaheadField = (props, ref): Node => {
  return <Typeahead {...props} forwardedRef={ref} />;
};

forwardRefTypeaheadField.displayName = 'Typeahead';

export default (React.forwardRef<Props, HTMLInputElement>(
  forwardRefTypeaheadField
): React$AbstractComponent<Props, HTMLInputElement>);
