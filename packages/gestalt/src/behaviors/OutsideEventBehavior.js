// @flow
import * as React from 'react';

type Props = {|
  children?: React.Node,
  onClick?: (event: MouseEvent) => void,
|};

export default class OutsideEventBehavior extends React.Component<Props> {
  componentDidMount() {
    document.addEventListener('click', this.handleClickEvent);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickEvent);
  }

  setElRef = (el: ?HTMLDivElement) => {
    if (el) {
      this.el = el;
    }
  };

  handleClickEvent = (event: MouseEvent) => {
    if (
      !this.props.onClick ||
      !this.el ||
      this.el.contains((event.target: Node))
    ) {
      return;
    }
    this.props.onClick(event);
  };

  el: ?HTMLDivElement;

  render() {
    return <div ref={this.setElRef}>{this.props.children}</div>;
  }
}
