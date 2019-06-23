// @flow
import * as React from 'react';
import { Link as GestaltLink } from 'gestalt';
import { createLocation } from 'history';
import { withRouter } from 'react-router-dom';

type Props = {|
  children?: React.Node,
  history: *,
  onClick: Function,
  replace?: boolean,
  target?: null | 'self' | 'blank',
  to: string | Object,
|};

const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

class Link extends React.Component<Props> {
  static defaultProps = {
    replace: false,
  };

  handleClick = ({ event }) => {
    if (this.props.onClick) this.props.onClick({ event });

    if (
      !event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore everything but left clicks
      !this.props.target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
    ) {
      event.preventDefault();

      const { replace, to, history } = this.props;

      if (replace) {
        history.replace(to);
      } else {
        history.push(to);
      }
    }
  };

  render() {
    const { children, to, history, target } = this.props;
    const href = history.createHref(
      typeof to === 'string'
        ? createLocation(to, null, null, history.location)
        : to
    );
    return (
      <GestaltLink target={target} onClick={this.handleClick} href={href}>
        {children}
      </GestaltLink>
    );
  }
}

export default withRouter(Link);
