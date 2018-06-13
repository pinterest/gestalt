// @flow
import * as React from 'react';
import { findDOMNode } from 'react-dom';

type Props = {|
  children?: React.Node,
  onClick?: (event: MouseEvent) => void,
|};

export default class OutsideEventBehavior extends React.Component<Props> {
  componentDidMount() {
    document.addEventListener('click', this.handleClickEvent, {
      capture: true,
    });
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickEvent, {
      capture: true,
    });
  }

  handleClickEvent = (event: MouseEvent) => {
    // eslint-disable-next-line react/no-find-dom-node
    const el = findDOMNode(this);
    if (
      !this.props.onClick ||
      !el ||
      (event.target instanceof Node && el.contains(event.target))
    ) {
      return;
    }
    this.props.onClick(event);
  };

  render() {
    return this.props.children;
  }
}
