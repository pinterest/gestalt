// @flow strict
import * as React from 'react';

type Props = {|
  children: React.Node,
|};

export default class NoScrollBehavior extends React.Component<Props> {
  prevOverflow: string | null;

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

  render() {
    return this.props.children;
  }
}
