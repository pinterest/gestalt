// @flow strict
import {
  cloneElement,
  forwardRef,
  Fragment,
  type Element,
  type Node,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type Ref,
} from 'react';
import Box from './Box.js';
import Layer from './Layer.js';
import Popover from './Popover.js';
import Text from './Text.js';
import InternalTextField from './InternalTextField.js';
import Tag from './Tag.js';
import ComboBoxItem, { type ComboBoxItemType } from './ComboBoxItem.js';
import { ESCAPE, TAB, ENTER, UP_ARROW, DOWN_ARROW } from './keyCodes.js';
import handleContainerScrolling, {
  KEYS,
  type DirectionOptionType,
} from './utils/keyboardNavigation.js';

type Size = 'md' | 'lg';

type Props = {|
  /**
   * Label to describe the clear button's purpose.
   */
  accessibilityClearButtonLabel: string,
  /**
   * Unique id to identify each ComboBox. Used for [accessibility](https://gestalt.pinterest.systems/combobox#Accessibility) purposes.
   */
  id: string,
  /**
   * Provide a label to identify the ComboBox field.
   */
  label: string,
  /**
   * The data for each selection option. See [subtext](https://gestalt.pinterest.systems/combobox#With-subtext) variant to learn more.
   */
  options: $ReadOnlyArray<{|
    label: string,
    subtext?: string,
    value: string,
  |}>,
  /**
   * The text shown when the input value returns no matches.
   */
  noResultText: string,
  /**
   * When disabled, ComboBox looks inactive and cannot be interacted with. If tags are passed, they will appear disabled as well and cannot be removed. See [tags](https://gestalt.pinterest.systems/combobox#Tags) variant to learn more.
   */
  disabled?: boolean,
  /**
   * Provide feedback when an error on selection occurs. See [error message](https://gestalt.pinterest.systems/combobox#Error-message) variant.
   */
  errorMessage?: Node,
  /**
   * Provides additional information about how to select a ComboBox option.
   */
  helperText?: string,
  /**
   * The user input in ComboBox for controlled components. See [controlled ComboBox](https://gestalt.pinterest.systems/combobox#Controlled-vs-Uncontrolled) variant to learn more.
   */
  inputValue?: string | null,
  /**
   * Whether the label should be visible or not. If `hidden`, the label is still available for screen reader users, but does not appear visually. See the [label visibility variant](https://gestalt.pinterest.systems/combobox#Label-visibility) for more info.
   */
  labelDisplay?: 'visible' | 'hidden',
  /**
   * Callback when you focus outside the component.
   */
  onBlur?: ({|
    event: SyntheticFocusEvent<HTMLInputElement> | SyntheticEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  /**
   * Callback when user types into the control input field.
   */
  onChange?: ({|
    value: string,
    event: SyntheticInputEvent<HTMLInputElement>,
  |}) => void,
  /**
   * Callback when user clicks on clear button.
   */
  onClear?: () => void,
  /**
   * Callback when you focus on the component.
   */
  onFocus?: ({|
    event: SyntheticFocusEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  /**
   * Callback for key stroke events. See [tags](#Tags) variant to learn more.
   */
  onKeyDown?: ({|
    event: SyntheticKeyboardEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  /**
   * Callback when an item is selected.
   */
  onSelect?: ({|
    event: SyntheticInputEvent<HTMLElement> | SyntheticKeyboardEvent<HTMLElement>,
    item: {|
      label: string,
      subtext?: string,
      value: string,
    |},
  |}) => void,
  /**
   * Specify a short description that suggests the expected input for the field.
   */
  placeholder?: string,
  // The ref prop is unused and listed here just for documentation purposes.
  /**
   * Forward the ref to the underlying component container element. See the [Ref](https://gestalt.pinterest.systems/combobox#Ref) variant to learn more about focus management.
   */
  ref?: Ref<'input'>, // eslint-disable-line react/no-unused-prop-types
  /**
   * The selected option in ComboBox for controlled components. See [controlled ComboBox](https://gestalt.pinterest.systems/combobox#Controlled-vs-Uncontrolled) variant to learn more.
   */
  selectedOption?: {|
    label: string,
    subtext?: string,
    value: string,
  |},
  /**
   * Defines the height of ComboBox: md: 40px, lg: 48px. Width is defined by parent component.
   */
  size?: Size,
  /**
   * List of tags to display in the component. See [tags](https://gestalt.pinterest.systems/combobox#Tags) variant to learn more.
   */
  tags?: $ReadOnlyArray<Element<typeof Tag>>,
|};

/**
 * [ComboBox](https://gestalt.pinterest.systems/combobox) is the combination of a [Textfield](https://gestalt.pinterest.systems/textfield) and an associated [Dropdown](https://gestalt.pinterest.systems/dropdown) that allows the user to filter a list when selecting an option. ComboBox allows users to type the full option, type part of the option and narrow the results, or select an option from the list.
 */
const ComboBoxWithForwardRef: React$AbstractComponent<Props, HTMLInputElement> = forwardRef<
  Props,
  HTMLInputElement,
>(function ComboBox(
  {
    accessibilityClearButtonLabel,
    disabled,
    errorMessage,
    helperText,
    id,
    label,
    labelDisplay = 'visible',
    noResultText,
    onBlur,
    onChange,
    onClear,
    onFocus,
    onKeyDown,
    onSelect,
    options,
    placeholder,
    size,
    tags,
    selectedOption,
    inputValue: controlledInputValue = null,
  }: Props,
  ref,
): Node {
  // ==== REFS ====

  const innerRef = useRef(null);
  const optionRef = useRef(null);
  const dropdownRef = useRef(null);
  // When using both forwardRef and innerRefs, useimperativehandle() allows to externally set focus via the ref prop: textfieldRef.current.focus()
  useImperativeHandle(ref, () => innerRef.current);

  // ==== STATE ====

  const [hoveredItemIndex, setHoveredItemIndex] = useState<null | number>(null);
  const [showOptionsList, setShowOptionsList] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<?ComboBoxItemType>(null);
  const [suggestedOptions, setSuggestedOptions] = useState<$ReadOnlyArray<ComboBoxItemType>>(
    options,
  );
  const [textfieldInput, setTextfieldInput] = useState<string>('');

  const isControlledInput = !(controlledInputValue === null || controlledInputValue === undefined);
  const isNotControlled = !isControlledInput && !tags;

  const textfieldIconButton =
    controlledInputValue || textfieldInput || (tags && tags.length > 0) ? 'clear' : 'expand';

  // ==== TAGS: Force disable state in Tags if ComboBox is disabled as well ====

  let selectedTags = tags;
  if (disabled && !!tags && tags.length > 0) {
    selectedTags = tags?.map((tag) => cloneElement(tag, { disabled: true }));
  }

  // ==== UNCONTROLLED COMBOBOX: Set suggestions ====

  useEffect(() => {
    if (isNotControlled) {
      if (!selectedItem) setHoveredItemIndex(null);
      if (showOptionsList && !selectedItem) {
        const filteredOptions = options.filter(({ label: optionLabel }) =>
          optionLabel.toLowerCase().includes(textfieldInput.toLowerCase()),
        );
        setSuggestedOptions(filteredOptions);
      } else {
        setSuggestedOptions(options);
      }
    }
  }, [isNotControlled, options, selectedItem, showOptionsList, textfieldInput]);

  // ==== CONTROLLED COMBOBOX: Set all variables ====

  useEffect(() => {
    if (isControlledInput) {
      if (!selectedOption) {
        setHoveredItemIndex(null);
      } else {
        suggestedOptions.forEach((option, index) => {
          if (option.value === selectedOption.value) setHoveredItemIndex(index);
        });
      }
      setSuggestedOptions(options);
    }
  }, [isControlledInput, options, selectedOption, suggestedOptions]);

  // ==== EVENT HANDLING: ComboBoxItem ====

  const handleSelectItem = useCallback(
    ({ event, item }) => {
      onSelect?.({ event, item });
      if (isNotControlled) {
        setSelectedItem(item);
        setTextfieldInput(item.label);
      }
      setShowOptionsList(false);
    },
    [isNotControlled, onSelect],
  );

  // ==== KEYBOARD NAVIGATION LOGIC: Keyboard navigation is handled by ComboBox while onClick selection is handled in ComboBoxItem ====

  const handleKeyNavigation = useCallback(
    (event, direction: DirectionOptionType) => {
      if (!showOptionsList) setShowOptionsList(true);

      const getNextHoveredIndex = (keyboardDirection) => {
        if (keyboardDirection === UP_ARROW) {
          return direction + (hoveredItemIndex || 0);
        }

        return hoveredItemIndex === null ? 0 : direction + hoveredItemIndex;
      };

      const nextHoveredIndex = getNextHoveredIndex(direction);
      const optionsCount = suggestedOptions.length - 1;

      // If there's an existing item, navigate from that position
      let cursorIndex = nextHoveredIndex;

      // If we've reached the end, start at the top
      if (nextHoveredIndex > optionsCount) {
        cursorIndex = 0;
      }

      // If we're at the top going backwards, start at the last item
      else if (nextHoveredIndex < 0) {
        cursorIndex = optionsCount;
      }

      // IMPORTANT: handleContainerScrolling must be placed before we update hoveredItemIndex
      handleContainerScrolling({
        direction,
        containerRef: dropdownRef,
        currentHoveredOption: optionRef.current,
      });

      setHoveredItemIndex(cursorIndex);

      const optionItem = suggestedOptions[cursorIndex];

      if (optionItem && direction === KEYS.ENTER) {
        handleSelectItem({ event, item: optionItem });
      }
    },
    [handleSelectItem, hoveredItemIndex, showOptionsList, suggestedOptions],
  );

  // ==== EVENT HANDLING: Popover ====

  const handleKeyDown = useCallback(
    (event) => {
      const { keyCode } = event;

      if (keyCode === UP_ARROW) {
        handleKeyNavigation(event, KEYS.UP);
        event.preventDefault();
      } else if (keyCode === DOWN_ARROW) {
        handleKeyNavigation(event, KEYS.DOWN);
        event.preventDefault();
      } else if (keyCode === ENTER) {
        handleKeyNavigation(event, KEYS.ENTER);
        event.stopPropagation();
      } else if (keyCode === ESCAPE) {
        if (innerRef) innerRef.current?.focus();
      } else if (keyCode === TAB) {
        setShowOptionsList(false);
      }
    },
    [handleKeyNavigation],
  );

  const handleOnDismiss = useCallback(() => setShowOptionsList(false), []);

  // ==== EVENT HANDLING: InternalTextField ====

  const handleOnBlur = useCallback(({ event, value }) => onBlur?.({ event, value }), [onBlur]);

  const handleOnFocus = useCallback(({ event, value }) => onFocus?.({ event, value }), [onFocus]);

  const handleSetShowOptionsList = useCallback(() => setShowOptionsList(true), []);

  const handleOnChange = useCallback(
    ({ event, value }) => {
      setHoveredItemIndex(null);
      if (isNotControlled) {
        setSelectedItem(null);
        setTextfieldInput(value);
      }
      if (showOptionsList === false) setShowOptionsList(true);
      onChange?.({ event, value });
    },
    [isNotControlled, onChange, showOptionsList],
  );

  const handleOnClickIconButtonClear = useCallback(() => {
    setHoveredItemIndex(null);
    if (isNotControlled) {
      setSelectedItem(null);
      setTextfieldInput('');
      setSuggestedOptions(options);
    }
    onClear?.();
    innerRef?.current?.focus();
  }, [isNotControlled, onClear, options]);

  const handleOnKeyDown = useCallback(
    ({ event, value }) => {
      if (!showOptionsList && event.keyCode !== TAB) setShowOptionsList(true);
      onKeyDown?.({ event, value });
    },
    [onKeyDown, showOptionsList],
  );

  // ==== MAPPING ComboBoxItem ====
  const comboBoxItemList = useMemo(
    () =>
      suggestedOptions.map(({ label: comboBoxItemlabel, subtext, value }, index) => {
        const isSelectedValue = (selectedOption?.value ?? selectedItem?.value) === value;
        return (
          <ComboBoxItem
            isHovered={index === hoveredItemIndex}
            id={id}
            index={index}
            key={`${id}${index}`}
            label={comboBoxItemlabel}
            subtext={subtext}
            value={value}
            onSelect={handleSelectItem}
            isSelected={isSelectedValue}
            setHoveredItemIndex={setHoveredItemIndex}
            ref={optionRef}
          />
        );
      }),
    [
      suggestedOptions,
      handleSelectItem,
      hoveredItemIndex,
      id,
      selectedItem?.value,
      selectedOption?.value,
    ],
  );

  return (
    <Fragment>
      <Box
        aria-autocomplete="list"
        aria-expanded={showOptionsList}
        aria-haspopup
        aria-owns={id}
        position="relative"
        role="combobox"
      >
        <InternalTextField
          accessibilityClearButtonLabel={accessibilityClearButtonLabel}
          // add accessibilityControls once the option list element exists
          accessibilityControls={showOptionsList && innerRef.current ? id : undefined}
          // add accessibilityActivedescendant once the option list element exists
          accessibilityActiveDescendant={
            showOptionsList && innerRef.current && hoveredItemIndex !== null
              ? `${id}-item-${hoveredItemIndex}`
              : undefined
          }
          autoComplete="off"
          disabled={disabled}
          errorMessage={errorMessage}
          hasError={!!errorMessage}
          helperText={helperText}
          id={`combobox-${id}`}
          label={label}
          labelDisplay={labelDisplay}
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          onClickIconButton={
            textfieldIconButton === 'clear'
              ? handleOnClickIconButtonClear
              : handleSetShowOptionsList
          }
          onClick={handleSetShowOptionsList}
          onFocus={handleOnFocus}
          onKeyDown={handleOnKeyDown}
          placeholder={tags && tags.length > 0 ? '' : placeholder}
          ref={innerRef}
          size={size}
          tags={selectedTags}
          textfieldIconButton={textfieldIconButton}
          type="text"
          value={controlledInputValue ?? textfieldInput}
        />
      </Box>
      {showOptionsList && innerRef.current ? (
        <Layer>
          <Popover
            anchor={innerRef.current}
            handleKeyDown={handleKeyDown}
            idealDirection="down"
            onDismiss={handleOnDismiss}
            positionRelativeToAnchor={false}
            size="flexible"
          >
            <Box
              aria-expanded={showOptionsList}
              alignItems="center"
              direction="column"
              display="flex"
              flex="grow"
              id={id}
              maxHeight="30vh"
              overflow="auto"
              padding={2}
              ref={dropdownRef}
              role="listbox"
              rounding={4}
              width={innerRef?.current?.offsetWidth}
            >
              {suggestedOptions.length > 0 ? (
                comboBoxItemList
              ) : (
                <Box width="100%" paddingX={2} paddingY={4}>
                  <Text lineClamp={1} color="gray">
                    {noResultText}
                  </Text>
                </Box>
              )}
            </Box>
          </Popover>
        </Layer>
      ) : null}
    </Fragment>
  );
});

ComboBoxWithForwardRef.displayName = 'ComboBox';

export default ComboBoxWithForwardRef;
