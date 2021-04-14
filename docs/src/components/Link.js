// @flow strict
import type { Node } from 'react';

import { useCallback } from 'react';
import { Link as GestaltLink } from 'gestalt';
import { withRouter } from 'react-router-dom';

type Props = {|
  children?: Node,
  history: *,
  onClick: Function, // flowlint-line unclear-type:off
  replace?: boolean,
  target?: null | 'self' | 'blank',
  to: string,
|};

const isModifiedEvent = (event) =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

const Link = ({ children, history, onClick, replace = false, target, to }: Props) => {
  const href = history.createHref({
    pathname: to,
  });

  const handleClick = useCallback(
    ({ event }) => {
      if (onClick) onClick({ event });

      if (
        !event.defaultPrevented && // onClick prevented default
        event.button === 0 && // ignore everything but left clicks
        !target && // let browser handle "target=_blank" etc.
        !isModifiedEvent(event) // ignore clicks with modifier keys
      ) {
        event.preventDefault();

        if (replace) {
          history.replace(to);
        } else {
          history.push(to);
        }
      }
    },
    [history, onClick, replace, target, to],
  );

  return (
    <GestaltLink target={target} onClick={handleClick} href={href}>
      {children}
    </GestaltLink>
  );
};

// $FlowIssue[signature-verification-failure]
export default withRouter(Link);
