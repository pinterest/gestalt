// @flow strict
import { forwardRef, type Node } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import Flex from './Flex.js';
import Text from './Text.js';
import styles from './Touchable.css';
import getRoundingClassName from './getRoundingClassName.js';
import Icon from './Icon.js';
import focusStyles from './Focus.css';

export type OptionItemType = {|
  label: string,
  subtext?: string,
  value: string,
|};

type Props = {|
  hoveredItemIndex: ?number,
  id: string,
  index: number,
  onSelect?: ({|
    item: OptionItemType,
    event: SyntheticInputEvent<HTMLInputElement>,
  |}) => void,
  option: OptionItemType,
  selected?: OptionItemType | $ReadOnlyArray<OptionItemType> | null,
  setHoveredItemIndex: (number) => void,
|};

const ComboBoxItemWithForwardRef: React$AbstractComponent<Props, ?HTMLElement> = forwardRef<
  Props,
  ?HTMLElement,
>(function OptionItem(
  { onSelect, hoveredItemIndex, id, index, option, selected, setHoveredItemIndex }: Props,
  ref,
): Node {
  const matches = (Array.isArray(selected) ? selected : []).filter(
    ({ value }) => value === option.value,
  );
  // Determine if the option is a current selected item
  const isSelectedItem = matches.length > 0 || JSON.stringify(option) === JSON.stringify(selected);

  const handleOnTap = (event) => {
    onSelect?.({ event, item: option });
  };

  const className = classnames(getRoundingClassName(2), focusStyles.hideOutline, {
    [styles.fullWidth]: true,
    [styles.pointer]: true,
  });

  const optionItemContent = (
    <Flex>
      <Flex direction="column" flex="grow" gap={1}>
        <Flex alignItems="center">
          <Text color="darkGray" inline lineClamp={1}>
            {option?.label}
          </Text>
        </Flex>
        {option.subtext && (
          <Text size="md" color="gray">
            {option.subtext}
          </Text>
        )}
      </Flex>
      <Box alignItems="center" color="transparent" display="flex" justifyContent="center">
        {isSelectedItem ? (
          <Icon accessibilityLabel="Selected item" color="darkGray" icon="check" size={12} />
        ) : (
          <Box width={12} />
        )}
      </Box>
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
      role="option"
      rounding={2}
      tabIndex={-1}
    >
      <Box
        color={index === hoveredItemIndex ? 'lightGray' : 'transparent'}
        direction="column"
        display="flex"
        padding={2}
        rounding={2}
      >
        {optionItemContent}
      </Box>
    </div>
  );
});

ComboBoxItemWithForwardRef.displayName = 'ComboBoxItem';

export default ComboBoxItemWithForwardRef;
