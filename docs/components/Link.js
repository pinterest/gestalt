// @flow strict
import { type Node } from 'react';
import { Link as GestaltLink } from 'gestalt';
import { useRouter } from 'next/router';

type Props = {|
  accessibilityLabel?: $ElementType<React$ElementConfig<typeof GestaltLink>, 'accessibilityLabel'>,
  children?: $ElementType<React$ElementConfig<typeof GestaltLink>, 'children'>,
  href: $ElementType<React$ElementConfig<typeof GestaltLink>, 'href'>,
  onClick?: () => void,
  target?: $ElementType<React$ElementConfig<typeof GestaltLink>, 'target'>,
|};

const isModifiedEvent = (event) =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

export default function Link({ accessibilityLabel, children, href, target, onClick }: Props): Node {
  const router = useRouter();

  const handleClick = ({ event }) => {
    onClick?.();

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
    <GestaltLink
      accessibilityLabel={accessibilityLabel}
      href={href}
      onClick={handleClick}
      target={target}
    >
      {children}
    </GestaltLink>
  );
}
