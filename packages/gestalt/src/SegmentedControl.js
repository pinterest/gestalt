// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Box from './Box.js';
import Text from './Text.js';
import styles from './SegmentedControl.css';

type Props = {|
  items: Array<React.Node>,
  onChange: ({ event: SyntheticMouseEvent<>, activeIndex: number }) => void,
  responsive?: boolean,
  selectedItemIndex: number,
  size?: 'md' | 'lg',
|};

export default function SegmentedControl(props: Props) {
  const { items, onChange, responsive, selectedItemIndex, size = 'md' } = props;
  const buttonWidth = responsive
    ? undefined
    : `${Math.floor(100 / Math.max(1, items.length))}%`;
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
            type="button"
            style={{ width: buttonWidth }}
          >
            {typeof item === 'string' ? (
              <Text
                bold
                color={isSelected ? 'darkGray' : 'gray'}
                align="center"
                size={size}
              >
                {item}
              </Text>
            ) : (
              <Box display="flex" justifyContent="center">
                {item}
              </Box>
            )}
          </button>
        );
      })}
    </div>
  );
}

SegmentedControl.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
  onChange: PropTypes.func.isRequired,
  responsive: PropTypes.bool,
  selectedItemIndex: PropTypes.number.isRequired,
  size: PropTypes.oneOf(['md', 'lg']),
};
