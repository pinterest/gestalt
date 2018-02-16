// @chrislloyd: This linter is disabled because initialState is polymorphic.
/* eslint react/forbid-prop-types:0 */
import React, { Component } from "react";

const atom = initialState => {
  let state = initialState;
  const listeners = [];

  const transition = newState => {
    state = newState;
    listeners.forEach(listener => listener(state));
  };

  return {
    deref: () => state,
    reset: val => transition(val),
    set: fn => transition(fn(state)),
    listen: listener => listeners.push(listener),
  };
};

function Icon(props) {
  const { icon, label } = props;
  return <i className={["fa", `fa-${icon}`].join(" ")} title={label} />;
}

function Control(props) {
  const { pred, color, children, onClick } = props;
  const iconColor = pred ? color : "silver";
  if (pred) {
    return (
      <button
        className={["block col-2 center", iconColor].join(" ")}
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        {children}
      </button>
    );
  }
  return (
    <div className={["col-2 center", iconColor].join(" ")}>
      {children}
    </div>
  );
}

export default class StateRecorder extends Component {
  constructor(props) {
    super(props);
    this.handlePrevious = this.unboundHandlePrevious.bind(this);
    this.handleNext = this.unboundHandleNext.bind(this);
    this.handleReset = this.unboundHandleReset.bind(this);
    this.handleRewind = this.unboundHandleRewind.bind(this);
    this.handleFastForward = this.unboundHandleFastForward.bind(this);
    this.state = {
      history: [this.props.initialState],
      idx: 0,
    };
  }

  transition(val) {
    const history = this.state.history.slice(0, this.state.idx + 1);
    history.push(val);

    this.setState({
      history,
      idx: history.length - 1,
    });
  }

  unboundHandlePrevious() {
    this.setState({
      idx: this.state.idx - 1,
    });
  }

  unboundHandleNext() {
    this.setState({
      idx: this.state.idx + 1,
    });
  }

  unboundHandleReset() {
    this.setState({
      history: this.state.history.slice(0, this.state.idx + 1),
    });
  }

  unboundHandleRewind() {
    this.setState({
      idx: 0,
    });
  }

  unboundHandleFastForward() {
    this.setState({
      idx: this.state.history.length - 1,
    });
  }

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
    const { fn, showState, showHistory } = this.props;
    const { history, idx } = this.state;
    const state = history[idx];

    const a = atom(state);
    a.listen(newState => this.transition(newState));

    return (
      <div>
        {fn(a)}
        {showHistory ? this.renderHistoryControls() : null}
        {/* showState ? <JsonData data={state} /> : null */}
      </div>
    );
  }
}
