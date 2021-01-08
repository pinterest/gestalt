// @flow strict
import { useRef, useState, type Portal, type Node, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { type Indexable } from './zIndex.js';
import styles from './Layer.css';

export default function Layer({
  children,
  zIndex: zIndexIndexable,
}: {|
  children: Node,
  zIndex?: Indexable,
|}): Portal | null {
  const [mounted, setMounted] = useState(false);
  const element = useRef<?HTMLDivElement>(null);
  const zIndex = zIndexIndexable?.index();

  useEffect(() => {
    setMounted(true);

    if (typeof document !== 'undefined' && document.createElement) {
      element.current = document.createElement('div');
    }

    if (typeof document !== 'undefined' && document.body && element.current) {
      document.body.appendChild(element.current);
    }

    return () => {
      if (typeof document !== 'undefined' && document.body && element.current) {
        document.body.removeChild(element.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!element.current) {
      return;
    }
    element.current.style.zIndex = zIndex === undefined ? '' : `${zIndex}`;
    element.current.className = zIndex === undefined ? '' : styles.layer;
  }, [zIndex]);

  if (!mounted || !element.current) {
    return null;
  }

  return createPortal(children, element.current);
}
