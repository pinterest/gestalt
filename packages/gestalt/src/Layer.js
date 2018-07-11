// @flow
import * as React from 'react';
import { createPortal } from 'react-dom';

type Props = {|
  children?: React.Node,
|};

export default class Layer extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    if (document.body) {
      document.body.appendChild(this.el);
    }
  }

  componentWillUnmount() {
    if (document.body) {
      document.body.removeChild(this.el);
    }
  }

  el: HTMLDivElement;

  render() {
    const { children } = this.props;
    return createPortal(children, this.el);
  }
}
