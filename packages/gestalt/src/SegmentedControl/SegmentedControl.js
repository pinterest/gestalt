// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Text from '../Text/Text';
import styles from './SegmentedControl.css';

type Props = {|
  items: Array<string>,
  onChange: ({ event: SyntheticMouseEvent<>, activeIndex: number }) => void,
  selectedItemIndex: number,
  size?: 'md' | 'lg',
|};

export default function SegmentedControl(props: Props) {
  const { items, onChange, selectedItemIndex, size = 'md' } = props;
  return (
    <div
      className={classnames(styles.SegmentedControl, {
        [styles.md]: size === 'md',
        [styles.lg]: size === 'lg',
      })}
      role="tablist"
    >
      {items.map((item, i) => {
        const isSelected = i === selectedItemIndex;
        const cs = classnames(styles.item, {
          [styles.itemIsNotSelected]: !isSelected,
          [styles.itemIsSelected]: isSelected,
        });
        return (
          <button
            aria-selected={isSelected}
            className={cs}
            key={i}
            onClick={e => onChange({ event: e, activeIndex: i })}
            role="tab"
          >
            <Text
              bold
              color={isSelected ? 'darkGray' : 'gray'}
              align="center"
              size={size}
            >
              {item}
            </Text>
          </button>
        );
      })}
    </div>
  );
}

SegmentedControl.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
  onChange: PropTypes.func.isRequired,
  selectedItemIndex: PropTypes.number.isRequired,
};
