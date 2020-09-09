// @flow strict
import { useRef, useState, type Portal, type Node, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Layer({
  children,
}: {|
  children: Node,
|}): Portal | null {
  const [mounted, setMounted] = useState(false);
  const element = useRef<?HTMLDivElement>(null);

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

  if (!mounted || !element.current) {
    return null;
  }
  return createPortal(children, element.current);
}
