import type { Node, AbstractComponent } from "react";
import { forwardRef, Fragment } from "react";
import classnames from "classnames";
import Badge from "./Badge";
import Box from "./Box";
import Flex from "./Flex";
import Link from "./Link";
import Text from "./Text";
import styles from "./Touchable.css";
import getRoundingClassName from "./getRoundingClassName";
import Icon from "./Icon";
import focusStyles from "./Focus.css";
import useFocusVisible from "./useFocusVisible";
import type { AbstractEventHandler } from "./AbstractEventHandler";
import "./AbstractEventHandler";
import type { FontWeight } from "./textTypes";
import "./textTypes";
export type OptionItemType = {
  label: string;
  subtext?: string;
  value: string;
};
type Props = {
  badgeText?: string;
  children?: Node;
  hoveredItemIndex: number | null | undefined;
  href?: string;
  id: string;
  index: number;
  isExternal?: boolean;
  onClick?: AbstractEventHandler<
    | React.MouseEvent<HTMLAnchorElement>
    | React.KeyboardEvent<HTMLAnchorElement>,
    {
      dangerouslyDisableOnNavigation: () => void;
    }
  >;
  onSelect?: (arg0: {
    item: OptionItemType;
    event: React.SyntheticEvent<HTMLInputElement>;
  }) => void;
  option: OptionItemType;
  role?: "option" | "menuitem";
  selected?: OptionItemType | ReadonlyArray<OptionItemType> | null;
  setHoveredItemIndex: (arg0: number) => void;
  shouldTruncate?: boolean;
  textWeight?: FontWeight;
};
const OptionItemWithForwardRef: AbstractComponent<
  Props,
  HTMLElement | null | undefined
> = forwardRef<Props, HTMLElement | null | undefined>(function OptionItem(
  props: Props,
  ref
): Node {
  const {
    badgeText,
    children,
    onSelect,
    hoveredItemIndex,
    href,
    id,
    index,
    isExternal,
    onClick,
    option,
    role,
    selected,
    setHoveredItemIndex,
    shouldTruncate = false,
    textWeight = "normal",
  } = props;
  const matches = (Array.isArray(selected) ? selected : []).filter(
    ({ value }) => value === option.value
  );
  // Determine if the option is a current selected item
  const isSelectedItem =
    matches.length > 0 || JSON.stringify(option) === JSON.stringify(selected);

  const handleOnTap = (event) => {
    if (!href && !children) {
      event.preventDefault();
    }

    onSelect?.({
      event,
      item: option,
    });
  };

  const { isFocusVisible } = useFocusVisible();
  const className = classnames(
    getRoundingClassName(2),
    focusStyles.hideOutline,
    {
      [focusStyles.accessibilityOutline]: isFocusVisible,
      [focusStyles.accessibilityOutlineFocusWithin]: isFocusVisible,
      [styles.fullWidth]: true,
      [styles.pointer]: true,
    }
  );
  const optionItemContent = (
    <Flex>
      <Flex direction="column" flex="grow" gap={1}>
        <Flex alignItems="center">
          {children || (
            <Fragment>
              <Text
                color="darkGray"
                inline
                lineClamp={shouldTruncate ? 1 : undefined}
                weight={textWeight}
              >
                {option?.label}
              </Text>
              {badgeText && (
                <Box marginStart={2} marginTop={1}>
                  {/* Adds a pause for screen reader users between the text content */}
                  <Box display="visuallyHidden">{`, `}</Box>
                  <Badge text={badgeText} />
                </Box>
              )}
            </Fragment>
          )}
        </Flex>
        {option.subtext && (
          <Text size="md" color="gray">
            {option.subtext}
          </Text>
        )}
      </Flex>
      <Box
        alignItems="center"
        color="transparent"
        display={!isExternal ? "flex" : "none"}
        justifyContent="center"
      >
        {isSelectedItem && !isExternal ? (
          <Icon
            accessibilityLabel="Selected item"
            color="darkGray"
            icon="check"
            size={12}
          />
        ) : (
          <Box width={12} />
        )}
      </Box>
      {isExternal && (
        <Box
          alignItems="center"
          color="transparent"
          display="flex"
          justifyContent="center" // marginStart is for spacing relative to Badge, should not be moved to parent Flex's gap
          marginStart={2}
        >
          {/* TODO: this label needs to be translated */}
          <Icon
            accessibilityLabel=", External"
            color="darkGray"
            icon="arrow-up-right"
            size={12}
          />
        </Box>
      )}
    </Flex>
  );
  return (
    <div
      aria-selected={isSelectedItem}
      className={className}
      id={`${id}-item-${index}`}
      onClick={handleOnTap}
      onKeyPress={(event) => {
        event.preventDefault();
      }}
      onMouseDown={(event) => {
        event.preventDefault();
      }}
      onMouseEnter={() => setHoveredItemIndex(index)}
      ref={index === hoveredItemIndex ? ref : null}
      role={role}
      rounding={2}
      tabIndex={-1}
    >
      <Box
        color={index === hoveredItemIndex ? "lightGray" : "transparent"}
        direction="column"
        display="flex"
        padding={2}
        rounding={2}
      >
        {href ? (
          <Link
            hoverStyle="none"
            href={href}
            onClick={onClick}
            target={isExternal ? "blank" : "self"}
          >
            {optionItemContent}
          </Link>
        ) : (
          optionItemContent
        )}
      </Box>
    </div>
  );
});
OptionItemWithForwardRef.displayName = "OptionItem";
export default OptionItemWithForwardRef;