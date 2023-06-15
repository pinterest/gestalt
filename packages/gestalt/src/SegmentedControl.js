// @flow strict
import { type Node } from 'react';
import classnames from 'classnames';
import Box from './Box.js';
import focusStyles from './Focus.css';
import layout from './Layout.css';
import styles from './SegmentedControl.css';
import Text from './Text.js';
import useFocusVisible from './useFocusVisible.js';

type OnChange = ({| event: SyntheticMouseEvent<HTMLButtonElement>, activeIndex: number |}) => void;

type Props = {|
  /**
   * Items for selection. Though typically strings, React.Node is accepted to allow for Icons or other custom UI.
   */
  items: $ReadOnlyArray<Node>,
  /**
   * Callback triggered when the user selects an item.
   */
  onChange: OnChange,
  /**
   * By default, items have equal widths. If this prop is true, the width of an item is based on its content. See the [responsive example](https://gestalt.pinterest.systems/web/segmentedcontrol#Example:-Responsive) for more details.
   */
  responsive?: boolean,
  /**
   * Index of element in `items` that is currently selected.
   */
  selectedItemIndex: number,
|};

function SegmentedControlItem({
  index,
  item,
  isSelected,
  onChange,
  width,
}: {|
  index: number,
  item: Node,
  isSelected: boolean,
  onChange: OnChange,
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
        <Text color="default" align="center" size="200" weight="bold">
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
 * [SegmentedControl](https://gestalt.pinterest.systems/web/segmentedcontrol)  may be used to group multiple selections. The controls display the current state and related state.
 *
 * Create layout to convey clear sense of information hierarchy. When a control is engaged, information below the control should also be updated.
 *
 * ![SegmentedControl light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SegmentedControl.spec.mjs-snapshots/SegmentedControl-chromium-darwin.png)
 * ![SegmentedControl dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SegmentedControl-dark.spec.mjs-snapshots/SegmentedControl-dark-chromium-darwin.png)
 *
 */
export default function SegmentedControl({
  items,
  onChange,
  responsive,
  selectedItemIndex,
}: Props): Node {
  const buttonWidth = responsive ? undefined : `${Math.floor(100 / Math.max(1, items.length))}%`;
  return (
    <div className={classnames(styles.SegmentedControl, layout.medium)} role="tablist">
      {items.map((item, i) => (
        <SegmentedControlItem
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          index={i}
          item={item}
          isSelected={i === selectedItemIndex}
          onChange={onChange}
          width={buttonWidth}
        />
      ))}
    </div>
  );
}
