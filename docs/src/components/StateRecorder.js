// @flow
// @chrislloyd: This linter is disabled because initialState is polymorphic.
/* eslint react/forbid-prop-types:0 */
import type { Node } from 'react';
import React, { Component } from 'react';
import Card from './Card';

type Props<T> = {|
  name?: string,
  description?: string,
  stacked?: boolean,
  heading?: boolean,
  initialState: T,
  fn: Function,
|};

type State<T> = {|
  history: Array<T>,
  idx: number,
|};

const atom = <T>(initialState: T) => {
  let state: T = initialState;
  const listeners = [];

  const transition = (newState: T) => {
    state = newState;
    listeners.forEach(listener => listener(state));
  };

  return {
    deref: () => state,
    reset: (val: T) => transition(val),
    set: (fn: T => T) => transition(fn(state)),
    listen: (listener: Function) => listeners.push(listener),
  };
};

function Icon(props: { icon: string, label: string }) {
  const { icon, label } = props;
  return <i className={['fa', `fa-${icon}`].join(' ')} title={label} />;
}

function Control(props: {
  pred: boolean,
  color: string,
  children?: Node,
  onClick: Function,
}) {
  const { pred, color, children, onClick } = props;
  const iconColor = pred ? color : 'silver';
  if (pred) {
    return (
      <button
        className={['block col-2 center', iconColor].join(' ')}
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      >
        {children}
      </button>
    );
  }
  return (
    <div className={['col-2 center', iconColor].join(' ')}>{children}</div>
  );
}

export default class StateRecorder<T> extends Component<Props<T>, State<T>> {
  static defaultProps = {
    initialState: {},
  };

  constructor(props: Props<T>) {
    super(props);
    this.state = {
      history: [this.props.initialState],
      idx: 0,
    };
  }

  transition(val: T) {
    const history = this.state.history.slice(0, this.state.idx + 1);
    history.push(val);

    this.setState({
      history,
      idx: history.length - 1,
    });
  }

  handlePrevious = () => {
    this.setState({
      idx: this.state.idx - 1,
    });
  };

  handleNext = () => {
    this.setState({
      idx: this.state.idx + 1,
    });
  };

  handleReset = () => {
    this.setState({
      history: this.state.history.slice(0, this.state.idx + 1),
    });
  };

  handleRewind = () => {
    this.setState({
      idx: 0,
    });
  };

  handleFastForward = () => {
    this.setState({
      idx: this.state.history.length - 1,
    });
  };

  canGoBack() {
    return this.state.idx > 0;
  }

  canGoForward() {
    return this.state.idx + 1 < this.state.history.length;
  }

  renderHistoryControls() {
    return (
      <div className="flex justify-center h5 p1">
        <Control
          color="black"
          onClick={this.handleRewind}
          pred={this.canGoBack()}
        >
          <Icon icon="fast-backward" label="Rewind" />
        </Control>
        <Control
          color="black"
          onClick={this.handlePrevious}
          pred={this.canGoBack()}
        >
          <Icon icon="step-backward" label="Previous" />
        </Control>
        <Control
          color="red"
          onClick={this.handleReset}
          pred={this.canGoForward()}
        >
          <Icon icon="stop" label="Stop" />
        </Control>
        <Control
          color="black"
          onClick={this.handleNext}
          pred={this.canGoForward()}
        >
          <Icon icon="step-forward" label="Next" />
        </Control>
        <Control
          color="black"
          onClick={this.handleFastForward}
          pred={this.canGoForward()}
        >
          <Icon icon="fast-forward" label="Fast forward" />
        </Control>
      </div>
    );
  }

  render() {
    const {
      name = '',
      description = '',
      heading = true,
      stacked = false,
      fn,
    } = this.props;
    const { history, idx } = this.state;
    const state = history[idx];

    const a = atom(state);
    a.listen((newState: T) => this.transition(newState));

    return (
      <Card
        name={name}
        description={description}
        heading={heading}
        stacked={stacked}
      >
        {fn(a)}
      </Card>
    );
  }
}
