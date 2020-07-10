// @flow strict
import * as React from 'react';
import { Link as GestaltLink } from 'gestalt';
import NextLink from 'next/Link';

type Props = {|
  children?: React.Node,
  replace?: boolean,
  target?: null | 'self' | 'blank',
  href: string,
  as?: string,
|};

function DeGestaltClickEvent(fn) {
  return ({ event }) => {
    return fn(event);
  };
}

const GestaltLinkWithRef = React.forwardRef(function GestaltLinkWithoutRef(
  { onClick, ...props }: {| onClick: Function, ...Props |},
  ref
) {
  return (
    <GestaltLink {...props} ref={ref} onClick={DeGestaltClickEvent(onClick)} />
  );
});

export default function Link({
  children,
  target,
  href,
  as,
  replace,
}: Props): React.Node {
  if (target) {
    return (
      <GestaltLink href={href} target={target}>
        {children}
      </GestaltLink>
    );
  }

  return (
    <NextLink href={href} replace={replace} as={as} passHref>
      <GestaltLinkWithRef>{children}</GestaltLinkWithRef>
    </NextLink>
  );
}
