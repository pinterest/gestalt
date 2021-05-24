// @flow strict
import type { Element, Node, Ref } from 'react';
import { forwardRef, Fragment, useState, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import focusStyles from './Focus.css';
import layout from './Layout.css';
import styles from './SearchField.css';
import typeaheadStyle from './TypeaheadInputField.css';
import Box from './Box.js';
import Icon from './Icon.js';
import FormLabel from './FormLabel.js';
import Tag from './Tag.js';
import { type DirectionOptionType } from './utils/keyboardNavigation.js';
import { ENTER, UP_ARROW, DOWN_ARROW } from './keyCodes.js';

type Props = {|
  forwardedRef?: Ref<'input'>,
  id: string,
  label?: string,
  onBlur: ({|
    event: SyntheticFocusEvent<HTMLInputElement>,
  |}) => void,
  onChange: ({|
    value: string,
    event: SyntheticInputEvent<HTMLInputElement>,
  |}) => void,
  onClear: () => void,
  onFocus: ({|
    value: string,
    event: SyntheticFocusEvent<HTMLInputElement>,
  |}) => void,
  onKeyDown?: ({|
    event: SyntheticKeyboardEvent<HTMLInputElement>,
    value: string,
  |}) => void,
  onKeyNavigation: (SyntheticKeyboardEvent<HTMLInputElement>, DirectionOptionType) => void,
  placeholder?: string,
  setContainer: (boolean) => void,
  size?: 'md' | 'lg',
  tags?: $ReadOnlyArray<Element<typeof Tag>>,
  value?: string,
|};

const TypeaheadInputFieldWithForwardRef: React$AbstractComponent<
  Props,
  HTMLInputElement,
> = forwardRef<Props, HTMLInputElement>(function InputField(props, ref): Node {
  const {
    id,
    label,
    onBlur,
    onChange,
    onClear,
    onKeyDown,
    onKeyNavigation,
    onFocus,
    setContainer,
    placeholder,
    size = 'md',
    tags,
    value,
  } = props;

  const [hovered, setHovered] = useState<boolean>(false);
  const [focused, setFocused] = useState(false);

  const innerRef = useRef(null);
  useImperativeHandle(ref, () => innerRef.current);

  const handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    onChange({
      value: event.currentTarget.value,
      event,
    });
  };

  const handleClear = (event: SyntheticInputEvent<HTMLInputElement>) => {
    onChange({ value: '', event });

    onClear();
  };

  const handleFocus = (event: SyntheticFocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus({
      value: event.currentTarget.value,
      event,
    });
  };

  const handleBlur = (event: SyntheticFocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur({ event });
  };

  const handleClick = (event: SyntheticFocusEvent<HTMLInputElement>) => {
    handleFocus(event);
    setContainer(true);
    innerRef.current?.focus();
  };

  const handleKeyDown = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    setContainer(true);
    const KEYS = {
      UP: -1,
      DOWN: 1,
      ENTER: 0,
    };
    if (event.keyCode === UP_ARROW) {
      onKeyNavigation(event, KEYS.UP);
    } else if (event.keyCode === DOWN_ARROW) {
      onKeyNavigation(event, KEYS.DOWN);
    } else if (event.keyCode === ENTER) {
      onKeyNavigation(event, KEYS.ENTER);
    }

    if (onKeyDown) {
      onKeyDown({ event, value: value || '' });
    }
  };

  const hasValue = value && value?.length > 0;

  const className = classnames(
    styles.input,
    styles.inputActive,
    typeaheadStyle.inputRadius,
    {
      [layout.medium]: size === 'md',
      [layout.large]: size === 'lg',
      [styles.inputHovered]: hovered,
    },
    tags
      ? {
          [focusStyles.accessibilityOutlineFocus]: focused,
          [typeaheadStyle.inputWrapper]: true,
        }
      : {},
  );

  const clearButtonSize = size === 'lg' ? 24 : 20;
  const clearIconSize = size === 'lg' ? 12 : 10;

  const inputElement = (
    <input
      aria-label={label}
      autoComplete="off"
      className={tags ? typeaheadStyle.unstyledInput : className}
      id={id}
      onBlur={handleBlur}
      onClick={() => setContainer(true)}
      onChange={handleChange}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      ref={innerRef}
      type="text"
      value={value}
    />
  );

  const iconButton = (
    <button
      className={hasValue ? styles.clear : typeaheadStyle.icon}
      onClick={!hasValue ? handleClick : handleClear}
      tabIndex={-1}
      type="button"
    >
      <Box
        alignItems="center"
        color="transparent"
        display="flex"
        height={clearButtonSize}
        justifyContent="center"
        rounding="circle"
        width={clearButtonSize}
        left
        right
      >
        <Icon
          accessibilityLabel=""
          color="darkGray"
          icon={!hasValue ? 'arrow-down' : 'cancel'}
          size={clearIconSize}
        />
      </Box>
    </button>
  );
  return (
    <Fragment>
      {label && <FormLabel id={id} label={label} />}
      <Box
        alignItems="center"
        display="flex"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        position="relative"
      >
        {tags ? (
          <div className={className}>
            {tags.map((tag, tagIndex) => (
              <Box key={tagIndex} marginEnd={1} marginBottom={1}>
                {tag}
              </Box>
            ))}
            <Box flex="grow" marginEnd={2} maxWidth="100%" position="relative">
              {/* This is an invisible spacer div which mirrors the input's
               * content. We use it to implement the flex wrapping behavior
               * which is not supported by inputs, by having the actual input
               * track it with absolute positioning. */}
              <div aria-hidden className={typeaheadStyle.inputSpacer}>
                {/* Keep a non-empty value so that the div doesn't collapse */}
                {value || '-'}
              </div>
              {inputElement}
            </Box>
            {iconButton}
          </div>
        ) : (
          <Fragment>
            {inputElement}
            {iconButton}
          </Fragment>
        )}
      </Box>
    </Fragment>
  );
});

TypeaheadInputFieldWithForwardRef.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onClear: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyNavigation: PropTypes.func,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['md', 'lg']),
  setContainer: PropTypes.func,
  tags: PropTypes.arrayOf(PropTypes.node),
  value: PropTypes.string,
};

TypeaheadInputFieldWithForwardRef.displayName = 'TypeaheadInputField';

export default TypeaheadInputFieldWithForwardRef;
