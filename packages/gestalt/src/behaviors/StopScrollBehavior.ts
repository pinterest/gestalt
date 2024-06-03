import { Component, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default class NoScrollBehavior extends Component<Props> {
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
      // @ts-expect-error - TS2322 - Type 'string | null' is not assignable to type 'string'.
      window.document.body.style.overflow = this.prevOverflow;
    }
  }

  render() {
    return this.props.children;
  }
}
