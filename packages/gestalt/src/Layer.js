// @flow strict
import { Fragment, type Node, type Portal, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import styles from './Layer.css';
import layoutStyles from './Layout.css';

type Props = {
  /**
   *
   */
  children: Node,
};

/**
 * [Layers](https://gestalt.pinterest.systems/web/layer) allow you to render children outside the DOM hierarchy of the parent. It's a wrapper around React createPortal that lets you use it as a component. This is particularly useful for places you might have needed to use z-index to overlay the screen before.
 *
 * ![Layer](https://raw.githubusercontent.com/pinterest/gestalt/master/docs/graphics/building-blocks/Layer.svg)
 */
export default function Layer({ children }: Props): Portal | Node {
  const [mounted, setMounted] = useState(false);
  const element = useRef<?HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const container = document.createElement('div');
    container.setAttribute('class', classNames(styles.layer, layoutStyles.isolate));

    element.current = container;
    document?.body?.appendChild(element.current);

    return () => {
      if (element.current) {
        document?.body?.removeChild(element.current);
      }
    };
  }, []);

  if (!mounted || !element.current) {
    return null;
  }

  return <Fragment>{createPortal(children, element.current)}</Fragment>;
}
