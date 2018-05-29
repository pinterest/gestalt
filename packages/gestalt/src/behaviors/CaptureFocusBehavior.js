/* @flow */
import * as React from 'react';

type Props = {|
  children?: React.Node,
|};

export default class CaptureFocusBehavior extends React.Component<Props> {
  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.previouslyFocusedEl = window.document.activeElement;
    }
  }

  componentWillUnmount() {
    // Need to check for existence of focus property for IE11.
    // http://www.mkyong.com/javascript/focus-is-not-working-in-ie-solution/
    if (this.previouslyFocusedEl && this.previouslyFocusedEl.focus) {
      this.previouslyFocusedEl.focus();
    }
  }

  previouslyFocusedEl: HTMLElement;

  render() {
    return this.props.children;
  }
}
