import type { Element, Node, AbstractComponent } from "react";
import {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";
import TypeaheadInputField from "./TypeaheadInputField";
import type { OptionItemType } from "./OptionItem";
import MenuOption from "./OptionItem";
import Box from "./Box";
import Text from "./Text";
import Popover from "./Popover";
import Layer from "./Layer";
import Tag from "./Tag";
import type { DirectionOptionType } from "./utils/keyboardNavigation";
import handleContainerScrolling from "./utils/keyboardNavigation";
import type { Indexable } from "./zIndex";
import "./zIndex";
type Props = {
  id: string;
  label?: string;
  noResultText: string;
  onBlur?: (arg0: {
    event:
      | React.FocusEvent<HTMLInputElement>
      | React.SyntheticEvent<HTMLInputElement>;
    value: string;
  }) => void;
  onChange?: (arg0: {
    event: React.SyntheticEvent<HTMLInputElement>;
    value: string;
  }) => void;
  onFocus?: (arg0: {
    event: React.FocusEvent<HTMLInputElement>;
    value: string;
  }) => void;
  onKeyDown?: (arg0: {
    event: React.KeyboardEvent<HTMLInputElement>;
    value: string;
  }) => void;
  onSelect?: (arg0: {
    event:
      | React.SyntheticEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>;
    item: OptionItemType | null | undefined;
  }) => void;
  options: ReadonlyArray<OptionItemType>;
  placeholder?: string;
  size?: "md" | "lg";
  tags?: ReadonlyArray<Element<typeof Tag>>;
  value?: string;
  zIndex?: Indexable;
};

/**
 * https://gestalt.pinterest.systems/Typeahead
 */
const TypeaheadWithForwardRef: AbstractComponent<
  Props,
  HTMLInputElement
> = forwardRef<Props, HTMLInputElement>(function Typeahead(
  props: Props,
  ref
): Node {
  const {
    id,
    label,
    noResultText,
    onBlur,
    onChange,
    onFocus,
    onKeyDown,
    onSelect,
    options,
    placeholder,
    size,
    tags,
    value = null,
    zIndex,
  } = props;
  // Parent ref for positioning
  const wrapperRef = useRef(null);

  // Utility function for filtering data by value
  const filterOriginalData = (
    filterValue: string
  ): ReadonlyArray<OptionItemType> =>
    options.filter((item) =>
      item.label.toLowerCase().includes(filterValue.toLowerCase())
    );

  // Utility function to find default value
  const findDefaultOption = (
    defaultValue: string | null
  ): OptionItemType | null => {
    if (defaultValue === null) return defaultValue;
    return (
      options.find(
        (item) => item.value.toLowerCase() === defaultValue.toLowerCase()
      ) || null
    );
  };

  // Track input value
  const defaultOption: OptionItemType | null = findDefaultOption(value);
  const displayValue = defaultOption?.label ?? "";
  const [search, setSearch] = useState<string>(displayValue);
  // Track the selected item - could be used to see if someone is selecting the same thing again
  const [selected, setSelected] = useState<OptionItemType | null>(
    defaultOption
  );
  // Make sure we respect any external changes to `value`
  useEffect(() => {
    setSearch(displayValue);
    setSelected(defaultOption);
  }, [defaultOption, displayValue]);
  const [hoveredItem, setHoveredItem] = useState<number | null>(0);
  const [availableOptions, setAvailableOptions] = useState<
    ReadonlyArray<OptionItemType>
  >(options);
  // Ref to the input
  const inputRef = useRef(null);
  useImperativeHandle(ref, () => inputRef.current);
  const [containerOpen, setContainerOpen] = useState<boolean>(false);
  // Reset search options when the container is closed
  useEffect(() => {
    if (containerOpen === false) setAvailableOptions(options);
  }, [containerOpen, options]);

  const handleFocus = ({ event }) => {
    // Run focus callback
    if (onFocus)
      onFocus({
        event,
        value: event.currentTarget.value,
      });
  };

  const handleBlur = ({ event }) => {
    // Clear input and reset options when no results
    if (availableOptions.length === 0) {
      setSearch("");
      setAvailableOptions(options);
    }

    setContainerOpen(false);
    // Run blur callback
    if (onBlur)
      onBlur({
        event,
        value: event.currentTarget.value,
      });
  };

  // Handler for when text is typed
  const handleChange = ({ event, value: newValue }) => {
    if (containerOpen === false) setContainerOpen(true);
    // Filter the available options using original data
    const updatedOptions = filterOriginalData(newValue);
    // Update the available options
    setAvailableOptions(updatedOptions);
    // Update the search value
    setSearch(newValue);
    // Run onChange callback
    if (onChange)
      onChange({
        event,
        value: newValue,
      });
  };

  const handleClear = () => {
    setSelected(null);
    setSearch("");
    setContainerOpen(false);
    if (inputRef.current) inputRef.current.focus();
  };

  // Handler for when an item is clicked
  const handleSelect = ({ event, item }) => {
    setSelected(item);
    setSearch(item.label);
    setContainerOpen(false);
    if (inputRef.current) inputRef.current.focus();
    if (onSelect)
      onSelect({
        event,
        item,
      });
  };

  let currentHoveredMenuOption;

  const setOptionRef = (optionRef) => {
    currentHoveredMenuOption = optionRef;
  };

  const containerRef = useRef();

  const handleKeyNavigation = (
    event: React.KeyboardEvent<HTMLInputElement>,
    direction: DirectionOptionType
  ) => {
    // $FlowFixMe[unsafe-addition] flow 0.135.0 upgrade
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
    } // If we're at the top going backwards, start at the last item
    else if (newIndex < 0) {
      cursorIndex = optionsCount;
    }

    const newItem = availableOptions[cursorIndex];
    setHoveredItem(cursorIndex);

    if (direction === KEYS.ENTER) {
      // Only set state when there are options.
      // handleBlur will take care of clear empty results
      if (availableOptions.length > 0) {
        setSelected(newItem);
        setSearch(newItem.label);
        if (onSelect)
          onSelect({
            event,
            item: newItem,
          });
      }

      handleBlur({
        event,
        value: event.currentTarget.value,
      });
    }

    // Scrolling
    handleContainerScrolling({
      direction,
      containerRef,
      currentHoveredOption: currentHoveredMenuOption,
    });
  };

  const positioningRef = tags ? wrapperRef : inputRef;
  return (
    <Box position="relative" ref={wrapperRef}>
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
        onKeyDown={onKeyDown}
        onKeyNavigation={handleKeyNavigation}
        setContainer={setContainerOpen}
        tags={tags}
        ref={inputRef}
      />

      {containerOpen && positioningRef.current && (
        <Layer zIndex={zIndex}>
          <Popover
            showCaret={false}
            anchor={positioningRef.current}
            idealDirection="down"
            onDismiss={() => {
              setContainerOpen(false);
            }}
            positionRelativeToAnchor={false}
            size="flexible" // Forces the popover to re-render and adjust its position correctly
            key={availableOptions.length}
          >
            <Box // The returned element is Node which is incompatible with HTMLElement type
              ref={containerRef}
              position="relative"
              overflow="auto"
              padding={2}
              maxHeight="50vh"
              width={positioningRef.current?.offsetWidth}
              role="combobox"
            >
              <Box alignItems="center" direction="column" display="flex">
                {/* Handle when no results */}
                {availableOptions.length === 0 ? (
                  <Box margin={2}>
                    <Text color="gray">{noResultText}</Text>
                  </Box>
                ) : (
                  availableOptions.map((option, index) => (
                    <MenuOption
                      id={id}
                      index={index}
                      key={`${option.value + index}`}
                      onSelect={handleSelect}
                      option={option}
                      role="option"
                      selected={selected}
                      hoveredItemIndex={hoveredItem}
                      setHoveredItemIndex={setHoveredItem}
                      ref={setOptionRef}
                      textWeight="normal"
                    />
                  ))
                )}
              </Box>
            </Box>
          </Popover>
        </Layer>
      )}
    </Box>
  );
});
TypeaheadWithForwardRef.displayName = "Typeahead";
export default TypeaheadWithForwardRef;