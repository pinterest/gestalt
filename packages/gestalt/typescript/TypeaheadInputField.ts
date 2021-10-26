import type { Element, Node, Ref, AbstractComponent } from "react";
import {
  forwardRef,
  Fragment,
  useState,
  useRef,
  useImperativeHandle,
} from "react";
import classnames from "classnames";
import focusStyles from "./Focus.css";
import layout from "./Layout.css";
import styles from "./SearchField.css";
import typeaheadStyle from "./TypeaheadInputField.css";
import Box from "./Box";
import Icon from "./Icon";
import FormLabel from "./FormLabel";
import Tag from "./Tag";
import type { DirectionOptionType } from "./utils/keyboardNavigation";
import "./utils/keyboardNavigation";
import { ENTER, UP_ARROW, DOWN_ARROW } from "./keyCodes";
type Props = {
  // eslint-disable-next-line react/no-unused-prop-types
  forwardedRef?: Ref<"input">;
  id: string;
  label?: string;
  onBlur: (arg0: { event: React.FocusEvent<HTMLInputElement> }) => void;
  onChange: (arg0: {
    value: string;
    event: React.SyntheticEvent<HTMLInputElement>;
  }) => void;
  onClear: () => void;
  onFocus: (arg0: {
    value: string;
    event: React.FocusEvent<HTMLInputElement>;
  }) => void;
  onKeyDown?: (arg0: {
    event: React.KeyboardEvent<HTMLInputElement>;
    value: string;
  }) => void;
  onKeyNavigation: (
    arg0: React.KeyboardEvent<HTMLInputElement>,
    arg1: DirectionOptionType
  ) => void;
  placeholder?: string;
  setContainer: (arg0: boolean) => void;
  size?: "md" | "lg";
  tags?: ReadonlyArray<Element<typeof Tag>>;
  value?: string;
};
const TypeaheadInputFieldWithForwardRef: AbstractComponent<
  Props,
  HTMLInputElement
> = forwardRef<Props, HTMLInputElement>(function InputField(
  props: Props,
  ref
): Node {
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
    size = "md",
    tags,
    value,
  } = props;
  const [hovered, setHovered] = useState<boolean>(false);
  const [focused, setFocused] = useState(false);
  const innerRef = useRef(null);
  useImperativeHandle(ref, () => innerRef.current);

  const handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    onChange({
      value: event.currentTarget.value,
      event,
    });
  };

  const handleClear = (event: React.SyntheticEvent<HTMLInputElement>) => {
    onChange({
      value: "",
      event,
    });
    onClear();
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus({
      value: event.currentTarget.value,
      event,
    });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur({
      event,
    });
  };

  const handleClick = (event: React.FocusEvent<HTMLInputElement>) => {
    handleFocus(event);
    setContainer(true);
    innerRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
      onKeyDown({
        event,
        value: value || "",
      });
    }
  };

  const hasValue = value && value?.length > 0;
  const className = classnames(
    styles.input,
    styles.inputActive,
    typeaheadStyle.inputRadius,
    {
      [layout.medium]: size === "md",
      [layout.large]: size === "lg",
      [styles.inputHovered]: hovered,
    },
    tags
      ? {
          [focusStyles.accessibilityOutlineFocus]: focused,
          [typeaheadStyle.inputWrapper]: true,
        }
      : {}
  );
  const clearButtonSize = size === "lg" ? 24 : 20;
  const clearIconSize = size === "lg" ? 12 : 10;
  const inputElement = (
    <input
      ref={innerRef}
      autoComplete="off"
      aria-label={label}
      className={tags ? typeaheadStyle.unstyledInput : className}
      id={id}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={() => setContainer(true)}
      onChange={handleChange}
      placeholder={placeholder}
      type="text"
      value={value}
      onKeyDown={handleKeyDown}
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
          icon={!hasValue ? "arrow-down" : "cancel"}
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
                {value || "-"}
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
TypeaheadInputFieldWithForwardRef.displayName = "TypeaheadInputField";
export default TypeaheadInputFieldWithForwardRef;