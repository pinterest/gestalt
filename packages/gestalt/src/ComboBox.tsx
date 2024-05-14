import {
  cloneElement,
  forwardRef,
  Fragment,
  ReactNode,
  Ref,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import Box from './Box';
import ComboBoxItem, { ComboBoxItemType } from './ComboBox/Item';
import { useDefaultLabelContext } from './contexts/DefaultLabelProvider';
import { DOWN_ARROW, ENTER, ESCAPE, TAB, UP_ARROW } from './keyCodes';
import Layer from './Layer';
import InternalPopover from './Popover/InternalPopover';
import Tag from './Tag';
import Text from './Text';
import InternalTextField from './TextField/InternalTextField';
import InternalTextFieldIconButton from './TextField/InternalTextFieldIconButton';
import handleContainerScrolling, { DirectionOptionType, KEYS } from './utils/keyboardNavigation';
import { Indexable } from './zIndex';

type Size = 'sm' | 'md' | 'lg';

type OptionType = {
  label: string;
  subtext?: string;
  value: string;
};

type Props = {
  /**
   * Label to describe the clear button's purpose.
   */
  accessibilityClearButtonLabel?: string;
  /**
   * When disabled, ComboBox looks inactive and cannot be interacted with. If tags are passed, they will appear disabled as well and cannot be removed. See [tags](https://gestalt.pinterest.systems/web/combobox#Tags) variant to learn more.
   */
  disabled?: boolean;
  /**
   * Provide feedback when an error on selection occurs. See [error message variant](https://gestalt.pinterest.systems/web/combobox#Error-message).
   */
  errorMessage?: ReactNode;
  /**
   * Provides additional information about how to select a ComboBox option. See [helper text variant](https://gestalt.pinterest.systems/web/combobox#Helper-text).
   */
  helperText?: string;
  /**
   * The user input in ComboBox for controlled components. See [controlled ComboBox](https://gestalt.pinterest.systems/web/combobox#Controlled-vs-Uncontrolled) variant to learn more.
   */
  inputValue?: string | null;
  /**
   * Unique id to identify each ComboBox. Used for [accessibility](https://gestalt.pinterest.systems/web/combobox#Accessibility) purposes.
   */
  id: string;
  /**
   * Provide a label to identify the ComboBox field.
   */
  label: string;
  /**
   * Whether the label should be visible or not. If `hidden`, the label is still available for screen reader users, but does not appear visually. See the [label visibility variant](https://gestalt.pinterest.systems/web/combobox#Label-visibility) for more info.
   */
  labelDisplay?: 'visible' | 'hidden';
  /**
   * The text shown when the input value returns no matches.
   */
  noResultText?: string;
  /**
   * Callback when you focus outside the component.
   */
  onBlur?: (arg1: {
    event: React.FocusEvent<HTMLInputElement> | React.SyntheticEvent<HTMLInputElement>;
    value: string;
  }) => void;
  /**
   * Callback when user types into the control input field.
   */
  onChange?: (arg1: { event: React.ChangeEvent<HTMLInputElement>; value: string }) => void;
  /**
   * Callback when user clicks on clear button.
   */
  onClear?: () => void;
  /**
   * Callback when you focus on the component.
   */
  onFocus?: (arg1: { event: React.FocusEvent<HTMLInputElement>; value: string }) => void;
  /**
   * Callback for key stroke events. See [tags](#Tags) variant to learn more.
   */
  onKeyDown?: (arg1: { event: React.KeyboardEvent<HTMLInputElement>; value: string }) => void;
  /**
   * Callback when an item is selected.
   */
  onSelect?: (arg1: {
    event: React.ChangeEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
    item: {
      label: string;
      subtext?: string;
      value: string;
    };
  }) => void;
  /**
   * The data for each selection option. See [subtext](https://gestalt.pinterest.systems/web/combobox#Subtext) variant to learn more.
   */
  options: ReadonlyArray<{
    label: string;
    subtext?: string;
    value: string;
  }>;
  /**
   * Specify a short description that suggests the expected input for the field.
   */
  placeholder?: string;
  // The ref prop is unused and listed here just for documentation purposes.
  /**
   * Forward the ref to the underlying component container element. See the [Ref](https://gestalt.pinterest.systems/web/combobox#Ref) variant to learn more about focus management.
   */
  ref?: Ref<'input'>; // eslint-disable-line react/no-unused-prop-types,
  /**
   * The selected option in ComboBox for controlled components. See [controlled ComboBox](https://gestalt.pinterest.systems/web/combobox#Controlled-vs-Uncontrolled) variant to learn more.
   */
  selectedOption?: OptionType;
  /**
   * Defines the height of ComboBox: sm: 32px, md: 40px, lg: 48px. See the [size variant](https://gestalt.pinterest.systems/web/ComboBox#Size) for more details.
   */
  size?: Size;
  /**
   * List of tags to display in the component. See [tags](https://gestalt.pinterest.systems/web/combobox#Tags) variant to learn more.
   */
  // @ts-expect-error - TS2315 - Type 'Element' is not generic.
  tags?: ReadonlyArray<Element<typeof Tag>>;
  /**
   * An object representing the zIndex value of the ComboBox list box. Learn more about [zIndex classes](https://gestalt.pinterest.systems/web/zindex_classes)
   */
  zIndex?: Indexable;
};

/**
 * [ComboBox](https://gestalt.pinterest.systems/web/combobox) is the combination of a [Textfield](https://gestalt.pinterest.systems/web/textfield) and an associated [Dropdown](https://gestalt.pinterest.systems/web/dropdown) that allows the user to filter a list when selecting an option. ComboBox allows users to type the full option, type part of the option and narrow the results, or select an option from the list.
 *
 * ![Combobox closed light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ComboBox-closed.spec.mjs-snapshots/ComboBox-closed-chromium-darwin.png)
 * ![Combobox open light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ComboBox-open.spec.mjs-snapshots/ComboBox-open-chromium-darwin.png)
 * ![Combobox closed dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ComboBox-closed-dark.spec.mjs-snapshots/ComboBox-closed-dark-chromium-darwin.png)
 * ![Combobox open dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ComboBox-open-dark.spec.mjs-snapshots/ComboBox-open-dark-chromium-darwin.png)
 *
 */
// @ts-expect-error - TS2345 - Argument of type '({ accessibilityClearButtonLabel, disabled, errorMessage, helperText, id, inputValue: controlledInputValue, label, labelDisplay, noResultText, onBlur, onChange, onClear, onFocus, onKeyDown, onSelect, options, placeholder, size, selectedOption, tags, zIndex, }: Props, ref: ForwardedRef<HTMLInputElement>) => ReactNode' is not assignable to parameter of type 'ForwardRefRenderFunction<HTMLInputElement, Props>'.
const ComboBoxWithForwardRef = forwardRef<HTMLInputElement, Props>(function ComboBox(
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
): ReactNode {
  const {
    accessibilityClearButtonLabel: accessibilityClearButtonLabelDefault,
    noResultText: noResultTextDefault,
  } = useDefaultLabelContext('ComboBox');

  // ==== REFS ====

  const innerRef = useRef<null | HTMLInputElement>(null);
  const optionRef = useRef<null | undefined | HTMLElement>(null);
  const dropdownRef = useRef<null | HTMLElement>(null);
  // When using both forwardRef and innerRefs, useimperativehandle() allows to externally set focus via the ref prop: textfieldRef.current.focus()
  // @ts-expect-error - TS2322 - Type 'HTMLInputElement | null' is not assignable to type 'HTMLInputElement'.
  useImperativeHandle(ref, () => innerRef.current);

  // ==== STATE ====

  const [hoveredItemIndex, setHoveredItemIndex] = useState<null | number>(null);
  const [showOptionsList, setShowOptionsList] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<OptionType | null | undefined>(null);
  const [suggestedOptions, setSuggestedOptions] = useState<ReadonlyArray<OptionType>>(options);
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
    arg1:
      | {
          event: React.ChangeEvent<HTMLInputElement>;
          item: ComboBoxItemType;
        }
      | {
          event: React.KeyboardEvent<HTMLElement>;
          item: OptionType;
        },
  ) => void = useCallback(
    ({
      event,
      item,
    }:
      | {
          event: React.ChangeEvent<HTMLInputElement>;
          item: ComboBoxItemType;
        }
      | {
          event: React.KeyboardEvent<HTMLElement>;
          item: OptionType;
        }) => {
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
    (event: React.KeyboardEvent<HTMLElement>, direction: DirectionOptionType) => {
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
    ({ event }: { event: React.KeyboardEvent<HTMLElement> }) => {
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
    ({ event, value }: { event: React.FocusEvent<HTMLInputElement>; value: string }) =>
      onBlur?.({ event, value }),
    [onBlur],
  );

  const handleOnFocus = useCallback(
    ({ event, value }: { event: React.FocusEvent<HTMLInputElement>; value: string }) =>
      onFocus?.({ event, value }),
    [onFocus],
  );

  const handleSetShowOptionsList = useCallback(() => setShowOptionsList(true), []);

  const handleOnChange = useCallback(
    ({ event, value }: { event: React.ChangeEvent<HTMLInputElement>; value: string }) => {
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
    ({ event, value }: { event: React.KeyboardEvent<HTMLInputElement>; value: string }) => {
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
            // eslint-disable-next-line react/no-array-index-key
            key={`${id}${index}`}
            ref={optionRef}
            id={id}
            index={index}
            isHovered={index === hoveredItemIndex}
            isSelected={isSelectedValue}
            label={comboBoxItemlabel}
            onSelect={handleSelectItem}
            setHoveredItemIndex={setHoveredItemIndex}
            subtext={subtext}
            value={value}
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
          ref={innerRef}
          // add accessibilityActiveDescendant once the option list element exists
          accessibilityActiveDescendant={
            showOptionsList && innerRef.current && hoveredItemIndex !== null
              ? `${id}-item-${hoveredItemIndex}`
              : undefined
          }
          accessibilityControls={showOptionsList && innerRef.current ? id : undefined}
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
          size={size}
          tags={selectedTags}
          type="text"
          value={controlledInputValue ?? textfieldInput}
        />
      </Box>
      {showOptionsList && innerRef.current ? (
        // @ts-expect-error - TS2786 - 'Layer' cannot be used as a JSX component.
        <Layer zIndex={zIndex}>
          {/* @ts-expect-error - TS2786 - 'InternalPopover' cannot be used as a JSX component. */}
          <InternalPopover
            anchor={innerRef.current}
            color="white"
            disablePortal
            hideWhenReferenceHidden
            idealDirection="down"
            onDismiss={handleOnDismiss}
            onKeyDown={handleKeyDown}
            role="listbox"
            shouldFocus={false}
            size="flexible"
          >
            <Box
              ref={dropdownRef}
              alignItems="center"
              direction="column"
              display="flex"
              flex="grow"
              // @ts-expect-error - TS2322 - Type '{ children: Element | Element[]; ref: MutableRefObject<HTMLElement | null>; alignItems: "center"; direction: "column"; display: "flex"; ... 6 more ...; width: number; }' is not assignable to type 'IntrinsicAttributes & Omit<Props, "ref"> & RefAttributes<HTMLElement>'.
              id={id}
              maxHeight="30vh"
              overflow="auto"
              padding={2}
              rounding={4}
              width={innerRef?.current?.offsetWidth}
            >
              {suggestedOptions.length > 0 ? (
                comboBoxItemList
              ) : (
                <Box paddingX={2} paddingY={4} width="100%">
                  <Text color="subtle" lineClamp={1}>
                    {noResultText ?? noResultTextDefault}
                  </Text>
                </Box>
              )}
            </Box>
          </InternalPopover>
        </Layer>
      ) : null}
    </Fragment>
  );
});

ComboBoxWithForwardRef.displayName = 'ComboBox';

export default ComboBoxWithForwardRef;
