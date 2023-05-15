// @flow strict
import {
  cloneElement,
  forwardRef,
  Fragment,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type Ref,
  type Element,
  type Node,
  type AbstractComponent,
} from 'react';
import Box from './Box.js';
import { ESCAPE, TAB, ENTER, UP_ARROW, DOWN_ARROW } from './keyCodes.js';
import Layer from './Layer.js';
import Popover from './Popover.js';
import Tag from './Tag.js';
import Text from './Text.js';
import { type Indexable } from './zIndex.js';
import ComboBoxItem, { type ComboBoxItemType } from './ComboBox/Item.js';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider.js';
import InternalTextField from './TextField/InternalTextField.js';
import InternalTextFieldIconButton from './TextField/InternalTextFieldIconButton.js';
import handleContainerScrolling, {
  KEYS,
  type DirectionOptionType,
} from './utils/keyboardNavigation.js';

type Size = 'md' | 'lg';

type OptionType = {|
  label: string,
  subtext?: string,
  value: string,
|};

type Props = {|
  /**
   * Label to describe the clear button's purpose.
   */
  accessibilityClearButtonLabel?: string,
  /**
   * When disabled, ComboBox looks inactive and cannot be interacted with. If tags are passed, they will appear disabled as well and cannot be removed. See [tags](https://gestalt.pinterest.systems/web/combobox#Tags) variant to learn more.
   */
  disabled?: boolean,
  /**
   * Provide feedback when an error on selection occurs. See [error message variant](https://gestalt.pinterest.systems/web/combobox#Error-message).
   */
  errorMessage?: Node,
  /**
   * Provides additional information about how to select a ComboBox option. See [helper text variant](https://gestalt.pinterest.systems/web/combobox#Helper-text).
   */
  helperText?: string,
  /**
   * The user input in ComboBox for controlled components. See [controlled ComboBox](https://gestalt.pinterest.systems/web/combobox#Controlled-vs-Uncontrolled) variant to learn more.
   */
  inputValue?: string | null,
  /**
   * Unique id to identify each ComboBox. Used for [accessibility](https://gestalt.pinterest.systems/web/combobox#Accessibility) purposes.
   */
  id: string,
  /**
   * Provide a label to identify the ComboBox field.
   */
  label: string,
  /**
   * Whether the label should be visible or not. If `hidden`, the label is still available for screen reader users, but does not appear visually. See the [label visibility variant](https://gestalt.pinterest.systems/web/combobox#Label-visibility) for more info.
   */
  labelDisplay?: 'visible' | 'hidden',
  /**
   * The text shown when the input value returns no matches.
   */
  noResultText: string,
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
    event: SyntheticInputEvent<HTMLInputElement>,
    value: string,
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
   * The data for each selection option. See [subtext](https://gestalt.pinterest.systems/web/combobox#Subtext) variant to learn more.
   */
  options: $ReadOnlyArray<{|
    label: string,
    subtext?: string,
    value: string,
  |}>,
  /**
   * Specify a short description that suggests the expected input for the field.
   */
  placeholder?: string,
  // The ref prop is unused and listed here just for documentation purposes.
  /**
   * Forward the ref to the underlying component container element. See the [Ref](https://gestalt.pinterest.systems/web/combobox#Ref) variant to learn more about focus management.
   */
  ref?: Ref<'input'>, // eslint-disable-line react/no-unused-prop-types
  /**
   * The selected option in ComboBox for controlled components. See [controlled ComboBox](https://gestalt.pinterest.systems/web/combobox#Controlled-vs-Uncontrolled) variant to learn more.
   */
  selectedOption?: OptionType,
  /**
   * Defines the height of ComboBox: md: 40px, lg: 48px. Width is defined by parent component.
   */
  size?: Size,
  /**
   * List of tags to display in the component. See [tags](https://gestalt.pinterest.systems/web/combobox#Tags) variant to learn more.
   */
  tags?: $ReadOnlyArray<Element<typeof Tag>>,
  /**
   * An object representing the zIndex value of the ComboBox list box. Learn more about [zIndex classes](https://gestalt.pinterest.systems/web/zindex_classes)
   */
  zIndex?: Indexable,
|};

/**
 * [ComboBox](https://gestalt.pinterest.systems/web/combobox) is the combination of a [Textfield](https://gestalt.pinterest.systems/web/textfield) and an associated [Dropdown](https://gestalt.pinterest.systems/web/dropdown) that allows the user to filter a list when selecting an option. ComboBox allows users to type the full option, type part of the option and narrow the results, or select an option from the list.
 *
 * ![Combobox closed light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ComboBox-closed.spec.mjs-snapshots/ComboBox-closed-chromium-darwin.png)
 * ![Combobox open light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ComboBox-open.spec.mjs-snapshots/ComboBox-open-chromium-darwin.png)
 * ![Combobox closed dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ComboBox-closed-dark.spec.mjs-snapshots/ComboBox-closed-dark-chromium-darwin.png)
 * ![Combobox open dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ComboBox-open-dark.spec.mjs-snapshots/ComboBox-open-dark-chromium-darwin.png)
 *
 */
const ComboBoxWithForwardRef: AbstractComponent<Props, HTMLInputElement> = forwardRef<
  Props,
  HTMLInputElement,
>(function ComboBox(
  {
    accessibilityClearButtonLabel,
    disabled = false,
    errorMessage,
    helperText,
    id,
    inputValue: controlledInputValue = null,
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
    size = 'md',
    selectedOption,
    tags,
    zIndex,
  }: Props,
  ref,
): Node {
  const { accessibilityClearButtonLabel: accessibilityClearButtonLabelDefault } =
    useDefaultLabelContext('ComboBox');

  // ==== REFS ====

  const innerRef = useRef<null | HTMLInputElement>(null);
  const optionRef = useRef<null | void | HTMLElement>(null);
  const dropdownRef = useRef<null | HTMLElement>(null);
  // When using both forwardRef and innerRefs, useimperativehandle() allows to externally set focus via the ref prop: textfieldRef.current.focus()
  useImperativeHandle(ref, () => innerRef.current);

  // ==== STATE ====

  const [hoveredItemIndex, setHoveredItemIndex] = useState<null | number>(null);
  const [showOptionsList, setShowOptionsList] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<?OptionType>(null);
  const [suggestedOptions, setSuggestedOptions] = useState<$ReadOnlyArray<OptionType>>(options);
  const [textfieldInput, setTextfieldInput] = useState<string>('');

  const isControlledInput = !(controlledInputValue === null || controlledInputValue === undefined);
  const isNotControlled = !isControlledInput && !tags;

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

  const handleSelectItem: (
    | {| event: SyntheticInputEvent<HTMLInputElement>, item: ComboBoxItemType |}
    | {| event: SyntheticKeyboardEvent<HTMLElement>, item: OptionType |},
  ) => void = useCallback(
    ({
      event,
      item,
    }:
      | {| event: SyntheticInputEvent<HTMLInputElement>, item: ComboBoxItemType |}
      | {| event: SyntheticKeyboardEvent<HTMLElement>, item: OptionType |}) => {
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
    (event: SyntheticKeyboardEvent<HTMLElement>, direction: DirectionOptionType) => {
      if (!showOptionsList) setShowOptionsList(true);

      const getNextHoveredIndex = (keyboardDirection: DirectionOptionType) => {
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
    ({ event }: {| event: SyntheticKeyboardEvent<HTMLElement> |}) => {
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

  const handleOnBlur = useCallback(
    ({ event, value }: {| event: SyntheticFocusEvent<HTMLInputElement>, value: string |}) =>
      onBlur?.({ event, value }),
    [onBlur],
  );

  const handleOnFocus = useCallback(
    ({ event, value }: {| event: SyntheticFocusEvent<HTMLInputElement>, value: string |}) =>
      onFocus?.({ event, value }),
    [onFocus],
  );

  const handleSetShowOptionsList = useCallback(() => setShowOptionsList(true), []);

  const handleOnChange = useCallback(
    ({ event, value }: {| event: SyntheticInputEvent<HTMLInputElement>, value: string |}) => {
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
    ({ event, value }: {| event: SyntheticKeyboardEvent<HTMLInputElement>, value: string |}) => {
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
            // eslint-disable-next-line react/no-array-index-key
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
          // add accessibilityControls once the option list element exists
          accessibilityControls={showOptionsList && innerRef.current ? id : undefined}
          // add accessibilityActiveDescendant once the option list element exists
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
          iconButton={
            controlledInputValue || textfieldInput || (tags && tags.length > 0) ? (
              <InternalTextFieldIconButton
                accessibilityLabel={
                  accessibilityClearButtonLabel ?? accessibilityClearButtonLabelDefault
                }
                hoverStyle="default"
                icon="cancel"
                onClick={handleOnClickIconButtonClear}
                pogPadding={size === 'lg' ? 2 : 1}
                tapStyle="compress"
              />
            ) : (
              <InternalTextFieldIconButton
                accessibilityHidden
                hoverStyle="none"
                icon="arrow-down"
                onClick={handleSetShowOptionsList}
                pogPadding={size === 'lg' ? 2 : 1}
                tapStyle="none"
              />
            )
          }
          id={`combobox-${id}`}
          label={label}
          labelDisplay={labelDisplay}
          onBlur={handleOnBlur}
          onChange={handleOnChange}
          onClick={handleSetShowOptionsList}
          onFocus={handleOnFocus}
          onKeyDown={handleOnKeyDown}
          placeholder={tags && tags.length > 0 ? '' : placeholder}
          ref={innerRef}
          size={size}
          tags={selectedTags}
          type="text"
          value={controlledInputValue ?? textfieldInput}
        />
      </Box>
      {showOptionsList && innerRef.current ? (
        <Layer zIndex={zIndex}>
          <Popover
            anchor={innerRef.current}
            onKeyDown={handleKeyDown}
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
                  <Text lineClamp={1} color="subtle">
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
