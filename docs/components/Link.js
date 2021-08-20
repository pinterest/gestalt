// @flow strict
import type { Node } from 'react';
import { Link as GestaltLink } from 'gestalt';
import { useRouter } from 'next/router';

type Props = {|
  children?: Node,
  target?: null | 'self' | 'blank',
  onClick: () => void,
  href: string,
|};

const isModifiedEvent = (event) =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

export default function Link({ children, href, target, onClick }: Props): Node {
  const router = useRouter();

  const handleClick = ({ event }) => {
    if (onClick) onClick();

    if (
      !event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore everything but left clicks
      !target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
    ) {
      event.preventDefault();

      router.push(href);
    }
  };

  return (
    <GestaltLink target={target} onClick={handleClick} href={href}>
      {children}
    </GestaltLink>
  );
}
