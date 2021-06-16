// @flow strict
import {
  cloneElement,
  forwardRef,
  Fragment,
  useEffect,
  useRef,
  useImperativeHandle,
  useState,
  type Element,
  type Node,
} from 'react';
import PropTypes from 'prop-types';
import Box from './Box.js';
import Layer from './Layer.js';
import Popover from './Popover.js';
import Text from './Text.js';
import InternalTextField from './InternalTextField.js';
import Tag from './Tag.js';
import ComboBoxOption, { type ComboBoxOptions } from './ComboBoxOption.js';
import { ESCAPE, TAB, ENTER, UP_ARROW, DOWN_ARROW } from './keyCodes.js';
import handleContainerScrolling, {
  KEYS,
  type DirectionOptionType,
} from './utils/keyboardNavigation.js';

type ComboBoxSize = 'md' | 'lg';

type Props = {|
  // REQUIRED
  accessibilityClearButtonLabel: string,
  id: string,
  options: $ReadOnlyArray<ComboBoxOptions>,
  noResultText: string,
  // OPTIONAL
  disabled?: boolean,
  errorMessage?: Node,
  helperText?: string,
  label?: string,
  onBlur?: ({|
    event: SyntheticFocusEvent<HTMLInputElement> | SyntheticEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  onChange?: ({|
    value: string,
    event: SyntheticInputEvent<HTMLInputElement>,
  |}) => void,
  onClear?: () => void,
  onFocus?: ({|
    event: SyntheticFocusEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  onKeyDown?: ({|
    event: SyntheticKeyboardEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  onSelect?: ({|
    event: SyntheticInputEvent<HTMLElement> | SyntheticKeyboardEvent<HTMLElement>,
    item: ComboBoxOptions,
  |}) => void,
  placeholder?: string,
  size?: ComboBoxSize,
  tags?: $ReadOnlyArray<Element<typeof Tag>>,
  value?: string,
|};

const ComboBoxWithForwardRef: React$AbstractComponent<Props, HTMLInputElement> = forwardRef<
  Props,
  HTMLInputElement,
>(function ComboBox(props, ref): Node {
  const {
    accessibilityClearButtonLabel,
    disabled,
    errorMessage,
    helperText,
    id,
    label,
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
    value: controlledValue = null,
  } = props;

  // ==== REFS ====

  const innerRef = useRef(null);
  const optionRef = useRef(null);
  const dropdownRef = useRef(null);
  const innerTagsConstainerRef = useRef(null);
  // When using both forwardRef and innerRefs, useimperativehandle() allows to externally set focus via the ref prop: textfieldRef.current.focus()
  useImperativeHandle(ref, () => innerRef.current);

  // ==== STATE ====

  const [hoveredItemIndex, setHoveredItemIndex] = useState<null | number>(null);
  const [isControlled] = useState<boolean>(
    !(controlledValue === null || controlledValue === undefined),
  );
  const [showOptionsList, setShowOptionsList] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<?ComboBoxOptions>(null);
  const [suggestedOptions, setSuggestedOptions] = useState<$ReadOnlyArray<ComboBoxOptions>>(
    options,
  );
  const [textfieldInput, setTextfieldInput] = useState<string>('');

  // ==== TAGS: Force disable state in Tags if Typeahead is disabled as well ====

  let selectedTags = tags;
  if (disabled && !!tags && tags.length > 0) {
    selectedTags = tags?.map((tag) => cloneElement(tag, { disabled: true }));
  }

  // ==== UNCONTROLLED COMBOBOX: Set suggestions ====

  useEffect(() => {
    if (!selectedItem) setHoveredItemIndex(null); // TODO can I clean this?
    if (!isControlled && !tags) {
      if (showOptionsList && !selectedItem) {
        const filteredOptions = options.filter(({ value }) =>
          value.toLowerCase().includes(textfieldInput.toLowerCase()),
        );
        setSuggestedOptions(filteredOptions);
      } else {
        setSuggestedOptions(options);
      }
    }
  }, [isControlled, options, selectedItem, showOptionsList, tags, textfieldInput]);

  // ==== CONTROLLED COMBOBOX ====

  useEffect(() => {
    if (isControlled) {
      setSelectedItem(null);
      setSuggestedOptions(options);

      if (!tags) {
        setSelectedItem(null);

        const matchedOptionArray = options.filter(({ value: optionValue }, index) => {
          const isMatchedValue = optionValue === controlledValue;
          if (isMatchedValue) setHoveredItemIndex(index);
          return isMatchedValue;
        });

        const matchedOption = matchedOptionArray?.[0];

        if (matchedOption) {
          setSelectedItem(matchedOption);
        }
      }
    }
  }, [controlledValue, isControlled, options, tags]);

  const handleSelectOptionItem = ({ event, item }) => {
    onSelect?.({ event, item });
    if (!tags) setSelectedItem(item);
    if (!isControlled && !tags) setTextfieldInput(item.value);
    setShowOptionsList(false);
  };

  // ==== KEYBOARD NAVIGATION LOGIC: Keyboard navigation is handled by Typeahead while onClick selection is handled in ComboBoxOption ====

  const handleKeyNavigation = (event, direction: DirectionOptionType) => {
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
      handleSelectOptionItem({ event, item: optionItem });
    }
  };

  const handleKeyDown = (event) => {
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
  };

  const textfieldIconButton =
    (controlledValue && controlledValue !== '') ||
    (textfieldInput && textfieldInput !== '') ||
    (tags && tags.length > 0)
      ? 'clear'
      : 'expand';

  return (
    <Fragment>
      <Box
        aria-autocomplete="list"
        aria-expanded={showOptionsList}
        aria-haspopup
        aria-owns={id}
        minWidth={280}
        position="relative"
        ref={innerTagsConstainerRef}
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
          disabled={disabled}
          errorMessage={errorMessage}
          hasError={!!errorMessage}
          helperText={helperText}
          id={`comboxbox-${id}`}
          label={label}
          onBlur={({ event, value }) => {
            if (!isControlled && !tags && !selectedItem) setTextfieldInput('');
            if (onBlur) onBlur({ event, value });
          }}
          onChange={({ event, value }) => {
            setSelectedItem(null);
            setHoveredItemIndex(null);
            if (!isControlled && !tags) setTextfieldInput(value);
            if (onChange) onChange({ event, value });
            if (showOptionsList === false) setShowOptionsList(true);
          }}
          onClickIconButton={
            textfieldIconButton === 'clear'
              ? () => {
                  setSelectedItem(null);
                  if (!isControlled && !tags) {
                    setTextfieldInput('');
                    setSuggestedOptions(options);
                  }
                  setHoveredItemIndex(null);
                  onClear?.();
                  innerRef?.current?.focus();
                }
              : () => setShowOptionsList(true)
          }
          onClick={() => setShowOptionsList(true)}
          onFocus={({ event, value }) => onFocus?.({ event, value })}
          onKeyDown={({ event, value }) => {
            if (!showOptionsList && event.keyCode !== TAB) setShowOptionsList(true);
            onKeyDown?.({ event, value });
          }}
          placeholder={tags && tags.length > 0 ? '' : placeholder}
          ref={innerRef}
          size={size}
          tags={selectedTags}
          textfieldIconButton={}
          type="text"
          value={controlledValue ?? textfieldInput}
        />
      </Box>
      {showOptionsList && innerRef.current ? (
        <Layer>
          <Popover
            anchor={(tags ? innerTagsConstainerRef : innerRef).current}
            handleKeyDown={handleKeyDown}
            idealDirection="down"
            onDismiss={() => setShowOptionsList(false)}
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
              width={(tags ? innerTagsConstainerRef : innerRef).current?.offsetWidth}
            >
              {suggestedOptions.length > 0 ? (
                suggestedOptions.map((option, index) => (
                  <ComboBoxOption
                    hoveredItemIndex={hoveredItemIndex}
                    id={id}
                    index={index}
                    key={`${option.value}${index}`}
                    option={option}
                    onSelect={({ event, item }) => handleSelectOptionItem({ event, item })}
                    selected={selectedItem}
                    setHoveredItemIndex={setHoveredItemIndex}
                    ref={optionRef}
                  />
                ))
              ) : (
                <Box width="100%" paddingX={2} paddingY={4}>
                  <Text truncate color="gray">
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

ComboBoxWithForwardRef.propTypes = {
  // REQUIRED
  accessibilityClearButtonLabel: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  noResultText: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.exact({
      value: PropTypes.string.isRequired,
      subtext: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
    }),
  ).isRequired,
  // OPTIONAL
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  helperText: PropTypes.string,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  onClear: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,
  size: (PropTypes.oneOf(['md', 'lg']): React$PropType$Primitive<ComboBoxSize>),
  tags: PropTypes.arrayOf(PropTypes.node),
  value: PropTypes.string,
};

ComboBoxWithForwardRef.displayName = 'ComboBox';

export default ComboBoxWithForwardRef;
