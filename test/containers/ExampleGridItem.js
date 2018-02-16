import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Item extends Component {
  state = {
    counter: 0,
  };

  componentDidMount() {
    const mountCount = window.ITEM_MOUNT_COUNT || 0;
    window.ITEM_MOUNT_COUNT = mountCount + 1;
  }

  incrementStateCounter = () => {
    this.setState({
      counter: this.state.counter + 1,
    });
  };

  render() {
    const { addRelatedItems, data, fetchMore, itemIdx } = this.props;

    const pinStyles = {
      border: '1px solid #ff0000',
      background: data.color,
    };

    if (!this.props.flexible) {
      pinStyles.height = this.props.expanded ? data.height + 100 : data.height;
    } else {
      pinStyles.paddingBottom = '100%';
    }

    if (
      typeof window !== 'undefined' &&
      window.itemHeightOverrides &&
      window.itemHeightOverrides[itemIdx]
    ) {
      pinStyles.height = `${window.itemHeightOverrides[itemIdx]}px`;
    }

    return (
      <div style={pinStyles}>
        <div>{data.name}</div>
        <div>Slot Index: {itemIdx}</div>
        {addRelatedItems &&
          fetchMore && (
            <button
              id={`add-more-${itemIdx}`}
              onClick={() => fetchMore().then(addRelatedItems)}
            >
              Insert items
            </button>
          )}
        <div>
          <button
            id={`increment-counter-${itemIdx}`}
            onClick={this.incrementStateCounter}
          >
            Increment counter:
          </button>
          {'(Current '}
          <span id={`item-counter-${itemIdx}`}>{this.state.counter}</span>
          {')'}
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  addRelatedItems: PropTypes.func,
  data: PropTypes.shape({}),
  expanded: PropTypes.bool,
  fetchMore: PropTypes.func,
  flexible: PropTypes.bool,
  itemIdx: PropTypes.number,
};
