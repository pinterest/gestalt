// @flow strict
import { useCallback, forwardRef, type Node } from 'react';
import Box from './Box.js';
import Flex from './Flex.js';
import Text from './Text.js';
import Icon from './Icon.js';
import focusStyles from './Focus.css';

export type OptionItemType = {|
  label: string,
  subtext?: string,
  value: string,
|};

type Props = {|
  isHovered: boolean,
  id: string,
  index: number,
  onSelect?: ({|
    item: OptionItemType,
    event: SyntheticInputEvent<HTMLInputElement>,
  |}) => void,
  label: string,
  isSelected: boolean,
  setHoveredItemIndex: (number) => void,
  subtext?: string,
  value: string,
|};

const ComboBoxItemWithForwardRef: React$AbstractComponent<Props, ?HTMLElement> = forwardRef<
  Props,
  ?HTMLElement,
>(function OptionItem(
  { onSelect, isHovered, id, index, label, isSelected, setHoveredItemIndex, subtext, value }: Props,
  ref,
): Node {
  const handleEventPreventDefault = useCallback((event) => event.preventDefault(), []);

  const handleOnTap = useCallback(
    (event) => onSelect?.({ event, item: { label, value, subtext } }),
    [onSelect, label, value, subtext],
  );

  const handleOnMouseEnter = useCallback(() => setHoveredItemIndex(index), [
    index,
    setHoveredItemIndex,
  ]);

  return (
    <div
      aria-selected={isSelected}
      className={focusStyles.hideOutline}
      id={`${id}-item-${index}`}
      onClick={handleOnTap}
      onKeyPress={handleEventPreventDefault}
      onMouseDown={handleEventPreventDefault}
      onMouseEnter={handleOnMouseEnter}
      ref={isHovered ? ref : null}
      role="option"
      rounding={2}
      style={{
        cursor: 'pointer',
        width: '100%',
        borderRadius: '8px',
      }}
      tabIndex={-1}
    >
      <Box
        color={isHovered ? 'lightGray' : 'transparent'}
        direction="column"
        display="flex"
        padding={2}
        rounding={2}
      >
        <Flex>
          <Flex direction="column" flex="grow" gap={1}>
            <Flex alignItems="center">
              <Text color="darkGray" inline lineClamp={1}>
                {label}
              </Text>
            </Flex>
            {subtext && (
              <Text size="md" color="gray">
                {subtext}
              </Text>
            )}
          </Flex>
          <Box alignItems="center" color="transparent" display="flex" justifyContent="center">
            {isSelected ? (
              <Icon accessibilityLabel="Selected item" color="darkGray" icon="check" size={12} />
            ) : (
              <Box width={12} />
            )}
          </Box>
        </Flex>
      </Box>
    </div>
  );
});

ComboBoxItemWithForwardRef.displayName = 'ComboBoxItem';

export default ComboBoxItemWithForwardRef;
