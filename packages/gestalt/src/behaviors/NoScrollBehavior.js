/* @flow */
import * as React from 'react';

type Props = {|
  children?: React.Node,
|};

export default class NoScrollBehavior extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.prevOverflow = null;
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.prevOverflow = window.document.body.style.overflow;
      window.document.body.style.overflow = 'hidden';
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.document.body.style.overflow = this.prevOverflow;
    }
  }

  prevOverflow: string | null;

  render() {
    return this.props.children;
  }
}
