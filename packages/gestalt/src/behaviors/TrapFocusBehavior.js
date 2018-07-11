/* @flow */
import * as React from 'react';

type Props = {|
  children?: React.Node,
|};

function queryFocusableAll(el: HTMLDivElement) {
  const selector = [
    'a[href]',
    'area[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    'object',
    'embed',
    '[tabindex="-1"]',
    '[tabindex="0"]',
    '[contenteditable]',
    'audio[controls]',
    'video[controls]',
    'summary',
  ].join(',');
  return el.querySelectorAll(selector);
}

const focusElement = (el: HTMLElement) => {
  if (typeof el.focus === 'function') {
    el.focus();
  }
};

export default class TrapFocusBehavior extends React.Component<Props> {
  componentDidMount() {
    this.previouslyFocusedEl = document.activeElement;
    this.focusFirstChild();
    document.addEventListener('focus', this.handleFocus, true);
  }

  componentWillUnmount() {
    document.removeEventListener('focus', this.handleFocus, true);
    if (this.previouslyFocusedEl) {
      focusElement(this.previouslyFocusedEl);
    }
  }

  setElRef = (el: ?HTMLDivElement) => {
    if (el) {
      this.el = el;
    }
  };

  handleFocus = (event: FocusEvent) => {
    if (
      !this.el ||
      (event.target instanceof Node && this.el.contains(event.target))
    ) {
      return;
    }

    event.stopPropagation();
    event.preventDefault();
    this.focusFirstChild();
  };

  focusFirstChild() {
    const { el } = this;
    if (el) {
      focusElement(queryFocusableAll(el)[0]);
    }
  }

  el: ?HTMLDivElement;

  previouslyFocusedEl: ?HTMLElement;

  render() {
    return <div ref={this.setElRef}>{this.props.children}</div>;
  }
}
