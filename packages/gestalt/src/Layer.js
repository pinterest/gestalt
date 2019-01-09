// @flow
import * as React from 'react';
import { createPortal } from 'react-dom';

type Props = {|
  children?: React.Node,
|};

export default class Layer extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    if (typeof document !== 'undefined' && document.createElement) {
      this.el = document.createElement('div');
    } else {
      // eslint-disable-next-line no-console
      console.warn(
        'Using Layer without document present. Children will be rendered directly.'
      );
    }
  }

  componentDidMount() {
    if (typeof document !== 'undefined' && document.body) {
      document.body.appendChild(this.el);
    }
  }

  componentWillUnmount() {
    if (typeof document !== 'undefined' && document.body) {
      document.body.removeChild(this.el);
    }
  }

  el: HTMLDivElement;

  render() {
    const { children } = this.props;
    if (typeof document !== 'undefined' && this.el) {
      return createPortal(children, this.el);
    }
    return children;
  }
}
