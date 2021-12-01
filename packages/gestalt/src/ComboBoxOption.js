// @flow strict
import { useCallback, useMemo, forwardRef, type Node } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import Text from './Text.js';
import styles from './Touchable.css';
import getRoundingClassName from './getRoundingClassName.js';
import Icon from './Icon.js';
import focusStyles from './Focus.css';
import useFocusVisible from './useFocusVisible.js';

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
  subtext?: string,
  value: string,
  selectedValue?: string | null,
  setHoveredItemIndex: (number) => void,
|};

const OptionItemWithForwardRef: React$AbstractComponent<Props, ?HTMLElement> = forwardRef<
  Props,
  ?HTMLElement,
>(function OptionItem(
  {
    onSelect,
    isHovered,
    id,
    index,
    label,
    subtext,
    value,
    selectedValue,
    setHoveredItemIndex,
  }: Props,
  ref,
): Node {
  // Determine if the option is a current selected item
  const isSelectedItem = value === selectedValue;

  const className = useMemo(
    () =>
      classnames(
        getRoundingClassName(2),
        focusStyles.hideOutline,
        styles.fullWidth,
        styles.pointer,
      ),
    [],
  );

  return (
    <div
      aria-selected={isSelectedItem}
      className={className}
      id={`${id}-item-${index}`}
      onClick={useCallback((event) => onSelect?.({ event, item: { label, subtext, value } }), [
        onSelect,
        label,
        subtext,
        value,
      ])}
      onKeyPress={useCallback((event) => event.preventDefault(), [])}
      onMouseDown={useCallback((event) => event.preventDefault(), [])}
      onMouseEnter={useCallback(() => setHoveredItemIndex(index), [index, setHoveredItemIndex])}
      ref={isHovered ? ref : null}
      role="option"
      rounding={2}
      tabIndex={-1}
    >
      <Box
        color={isHovered ? 'lightGray' : 'transparent'}
        direction="column"
        display="flex"
        padding={2}
        rounding={2}
      >
        <Box display="flex" direction="column" flex="grow" gap={1}>
          <Box display="flex" alignItems="center">
            <Text color="darkGray" inline lineClamp={1}>
              {label}
            </Text>
          </Box>
          {subtext && (
            <Text size="md" color="gray">
              {subtext}
            </Text>
          )}
        </Box>
        <Box alignItems="center" color="transparent" display="flex" justifyContent="center">
          {isSelectedItem ? (
            <Icon accessibilityLabel="Selected item" color="darkGray" icon="check" size={12} />
          ) : (
            <Box width={12} />
          )}
        </Box>
      </Box>
    </div>
  );
});

OptionItemWithForwardRef.displayName = 'OptionItem';

export default OptionItemWithForwardRef;
