// @flow strict
import type { Node } from 'react';
import classnames from 'classnames';
import { type AbstractEventHandler } from './AbstractEventHandler.js';
import Box from './Box.js';
import focusStyles from './Focus.css';
import layout from './Layout.css';
import styles from './SegmentedControl.css';
import Text from './Text.js';
import useFocusVisible from './useFocusVisible.js';

type OnChange = AbstractEventHandler<
  SyntheticMouseEvent<HTMLButtonElement>,
  {| activeIndex: number |},
>;
type Props = {|
  items: $ReadOnlyArray<Node>,
  onChange: OnChange,
  responsive?: boolean,
  selectedItemIndex: number,
  size?: 'md' | 'lg',
|};

function SegmentedControlItem({
  index,
  item,
  isSelected,
  onChange,
  size,
  width,
}: {|
  index: number,
  item: Node,
  isSelected: boolean,
  onChange: OnChange,
  size?: 'md' | 'lg',
  width: ?string,
|}) {
  const { isFocusVisible } = useFocusVisible();
  const cs = classnames(styles.item, focusStyles.hideOutline, {
    [styles.itemIsNotSelected]: !isSelected,
    [styles.itemIsSelected]: isSelected,
    [focusStyles.accessibilityOutline]: isFocusVisible,
  });

  return (
    <button
      aria-selected={isSelected}
      className={cs}
      onClick={(event) => onChange({ event, activeIndex: index })}
      role="tab"
      type="button"
      style={{ width }}
    >
      {typeof item === 'string' ? (
        <Text color="darkGray" align="center" size={size} weight="bold">
          {item}
        </Text>
      ) : (
        <Box display="flex" justifyContent="center">
          {item}
        </Box>
      )}
    </button>
  );
}

/**
 * [SegmentedControls](https://gestalt.pinterest.systems/segmentedcontrol)  may be used to group between multiple selections. The controls display the current state and related state.
 *
 * Create layout to convey clear sense of information hierarchy. When a control is engaged, information below the control should get updated.
 */
export default function SegmentedControl({
  items,
  onChange,
  responsive,
  selectedItemIndex,
  size = 'md',
}: Props): Node {
  const buttonWidth = responsive ? undefined : `${Math.floor(100 / Math.max(1, items.length))}%`;
  return (
    <div
      className={classnames(styles.SegmentedControl, size === 'md' ? layout.medium : layout.large)}
      role="tablist"
    >
      {items.map((item, i) => (
        <SegmentedControlItem
          key={i}
          index={i}
          item={item}
          isSelected={i === selectedItemIndex}
          onChange={onChange}
          size={size}
          width={buttonWidth}
        />
      ))}
    </div>
  );
}
