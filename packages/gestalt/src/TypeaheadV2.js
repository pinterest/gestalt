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
import TextField from './TextField.js';
import Tag from './Tag.js';
import MenuOption, { type OptionObject } from './MenuOption.js';
import { ESCAPE, SPACE, TAB, ENTER, UP_ARROW, DOWN_ARROW } from './keyCodes.js';
import handleContainerScrolling, {
  KEYS,
  type DirectionOptionType,
} from './utils/keyboardNavigation.js';

type TypeaheadSize = 'md' | 'lg';

type Props = {|
  // REQUIRED
  clearOptionsLabel: string,
  id: string,
  options: $ReadOnlyArray<OptionObject>,
  noResultText: string,
  showOptionsLabel: string,
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
  onSelect?: ({|
    event: SyntheticInputEvent<HTMLElement> | SyntheticKeyboardEvent<HTMLElement>,
    item: OptionObject,
  |}) => void,
  onFocus?: ({|
    event: SyntheticFocusEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  onKeyDown?: ({|
    event: SyntheticKeyboardEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  placeholder?: string,
  size?: TypeaheadSize,
  tags?: $ReadOnlyArray<Element<typeof Tag>>,
  value?: string,
|};

const TypeaheadV2WithForwardRef: React$AbstractComponent<Props, ?HTMLElement> = forwardRef<
  Props,
  ?HTMLElement,
>(function TypeaheadV2(props, ref): Node {
  const {
    clearOptionsLabel,
    disabled,
    errorMessage,
    helperText,
    id,
    label,
    noResultText,
    onBlur,
    onChange,
    onSelect,
    onFocus,
    onKeyDown,
    options,
    placeholder,
    showOptionsLabel,
    size,
    tags,
    value: defaultValue,
  } = props;

  // ==== REFS ====

  const innerRef = useRef<?HTMLElement>(null);
  const optionRef = useRef<?HTMLElement>(null);
  const dropdownRef = useRef<?HTMLElement>(null);
  const innerTagsRef = useRef<?HTMLElement>(null);

  // When using both forwardRef and innerRefs, useimperativehandle() allows to externally set focus via the ref prop: textfieldRef.current.focus()
  useImperativeHandle(ref, () => innerRef.current);

  // ==== STATE ====

  const [controlledTextfieldInput, setControlledTextfieldInput] = useState<string>('');
  const [hoveredItemIndex, setHoveredItemIndex] = useState<number>(0);
  const [showOptionsList, setShowOptionsList] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<?OptionObject>(null);
  const [suggestedOptions, setSuggestedOptions] = useState<$ReadOnlyArray<OptionObject>>(options);

  let selectedTags = tags;
  if (disabled && !!tags && tags.length > 0) {
    selectedTags = tags?.map((tag) => cloneElement(tag, { disabled: true }));
  }

  // ==== AUTOCOMPLETE LOGIC ====

  useEffect(() => {
    if (showOptionsList && !selectedItem) {
      const filteredOptions = options.filter((item) =>
        item.label.toLowerCase().includes(controlledTextfieldInput.toLowerCase()),
      );

      setSuggestedOptions(filteredOptions);
    }
  }, [options, controlledTextfieldInput, selectedItem, showOptionsList]);

  // ==== SET DEFAULT VALUE / NEW OPTIONS LOGIC ====

  useEffect(() => {
    setSuggestedOptions(options);
    setSelectedItem(null);
    setControlledTextfieldInput('');
    setHoveredItemIndex(0);

    if (defaultValue) {
      const matchedOptionArray = options.filter(({ value: optionValue }, index) => {
        if (optionValue === defaultValue) {
          setHoveredItemIndex(index);
          return true;
        }
        return false;
      });

      const matchedOption = matchedOptionArray?.[0];
      if (matchedOption) {
        setSelectedItem(matchedOption);
        setControlledTextfieldInput(matchedOption.label);
      }
    }
  }, [defaultValue, options]);

  const resetSuggestedOptions = () => {
    setShowOptionsList(false);
    setSuggestedOptions(options);
  };

  const selectOptionItem = ({ event, optionItem }) => {
    setSelectedItem(optionItem);
    if (!tags) setControlledTextfieldInput(optionItem.label);
    onSelect?.({ event, item: optionItem });
  };

  // ==== KEYBOARD NAVIGATION LOGIC ====

  // keyboard navigation is handled by Typeahead while onClick selection is handled in MenuOption
  const handleKeyNavigation = (event, direction: DirectionOptionType) => {
    const newIndex = direction + hoveredItemIndex;
    const optionsCount = suggestedOptions.length - 1;

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

    // handleContainerScrolling must be placed before we update hoveredItemIndex
    handleContainerScrolling({
      direction,
      containerRef: dropdownRef,
      currentHoveredMenuOption: optionRef.current,
    });

    setHoveredItemIndex(cursorIndex);

    const optionItem = suggestedOptions[cursorIndex];

    if (optionItem && direction === KEYS.ENTER) {
      selectOptionItem({ event, optionItem });
      resetSuggestedOptions();
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
    } else if (keyCode === SPACE) {
      event.preventDefault();
    }
  };

  return (
    <Fragment>
      <Box minWidth={280} position="relative" ref={innerTagsRef}>
        <TextField
          accessibilityControls={id}
          accessibilityExpanded={showOptionsList}
          accessibilityHaspopup
          accessibilityActivedescendant={`${id}-item-${hoveredItemIndex}`}
          accessibilityOwns={id}
          accessibilityRole="combobox"
          autoComplete="list"
          clearOptionsLabel={clearOptionsLabel}
          disabled={disabled}
          endButton={controlledTextfieldInput ? 'clear' : 'dropdown'}
          hasError={!!errorMessage}
          helperText={helperText}
          id={`typeahead-${id}`}
          errorMessage={errorMessage}
          label={label}
          onBlur={({ event, value }) => {
            if (!selectedItem) setControlledTextfieldInput('');
            if (onBlur) onBlur({ event, value });
          }}
          onChange={({ event, value }) => {
            setSelectedItem(null);
            setControlledTextfieldInput(value);
            if (showOptionsList === false) setShowOptionsList(true);
            if (onChange) onChange({ event, value });
          }}
          onClear={() => {
            setSelectedItem(null);
            setControlledTextfieldInput('');
            setSuggestedOptions(options);
            setHoveredItemIndex(0);
            if (innerRef) innerRef.current?.focus();
          }}
          onClick={() => setShowOptionsList(true)}
          onFocus={({ event, value }) => {
            if (onFocus) onFocus({ event, value });
          }}
          onKeyDown={({ event, value }) => {
            if (event.keyCode !== TAB) setShowOptionsList(true);
            if (onKeyDown) onKeyDown({ event, value });
          }}
          onShowOptions={() => setShowOptionsList(true)}
          placeholder={tags && tags.length > 0 ? '' : placeholder}
          ref={innerRef}
          showOptionsLabel={showOptionsLabel}
          size={size}
          tags={selectedTags}
          type="text"
          value={controlledTextfieldInput}
        />
      </Box>

      {showOptionsList && innerRef.current && (
        <Layer>
          <Popover
            anchor={(tags ? innerTagsRef : innerRef).current}
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
              overflow="auto"
              padding={2}
              maxHeight="30vh"
              ref={dropdownRef}
              role="listbox"
              rounding={4}
              width={(tags ? innerTagsRef : innerRef).current?.offsetWidth}
            >
              {suggestedOptions.length > 0 ? (
                suggestedOptions.map((option, index) => (
                  <MenuOption
                    handleSelect={({ event, item: optionItem }) => {
                      selectOptionItem({ event, optionItem });
                      resetSuggestedOptions();
                      if (document.activeElement !== innerRef.current) innerRef.current?.focus();
                    }}
                    hoveredItemIndex={hoveredItemIndex}
                    id={id}
                    index={index}
                    key={`${option.value}${index}`}
                    option={option}
                    role="option"
                    selected={selectedItem}
                    setHoveredItemIndex={setHoveredItemIndex}
                    ref={optionRef}
                    shouldTruncate
                    textWeight="normal"
                  />
                ))
              ) : (
                <Box margin={2}>
                  <Text color="gray">{noResultText}</Text>
                </Box>
              )}
            </Box>
          </Popover>
        </Layer>
      )}
    </Fragment>
  );
});

TypeaheadV2WithForwardRef.propTypes = {
  // REQUIRED
  clearOptionsLabel: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.exact({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      subtext: PropTypes.string,
    }),
  ).isRequired,
  noResultText: PropTypes.string.isRequired,
  showOptionsLabel: PropTypes.string.isRequired,
  // OPTIONAL
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  helperText: PropTypes.string,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.string,
  onSelect: PropTypes.string,
  onFocus: PropTypes.string,
  onKeyDown: PropTypes.string,
  placeholder: PropTypes.string,
  size: (PropTypes.oneOf(['md', 'lg']): React$PropType$Primitive<TypeaheadSize>),
  tags: PropTypes.arrayOf(PropTypes.node),
  value: PropTypes.string,
};

TypeaheadV2WithForwardRef.displayName = 'TypeaheadV2';

export default TypeaheadV2WithForwardRef;
