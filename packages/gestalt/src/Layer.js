// @flow strict
import React, { useRef, useState, type Portal, type Node, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { type Indexable } from './zIndex.js';
import { useScroll } from './contexts/Scroll.js';
import styles from './Layer.css';


export default function Layer({
  children,
  zIndex: zIndexIndexable,
}: {|
  children: Node,
  zIndex?: Indexable,
|}): Portal | Node {
  const [mounted, setMounted] = useState(false);
  const element = useRef<?HTMLDivElement>(null);
  const zIndex = zIndexIndexable?.index();
  const positionRef = useRef<?HTMLDivElement>(null);
  const { refs } = useScroll();

  useEffect(() => {
    setMounted(true);

    if (!positionRef.current) {
      return;
    }

    if (typeof document !== 'undefined' && document.createElement) {
      element.current = document.createElement('div');
    }

    let containerNode = null;
    let curNode = positionRef.current;

    while (!containerNode) {
      const parentNode = curNode.parentNode;
      if (parentNode) {
        refs.forEach((ref) => {
          if (ref && ref.isSameNode(curNode)) {
            containerNode = ref;
          }
        });
        curNode = parentNode;
      } else {
        break;
      }
    }

    if (element.current) {
      if (containerNode) {
        containerNode.appendChild(element.current);
      } else if (typeof document !== 'undefined' && document.body) {
        document.body.appendChild(element.current);
      }
    }

    return () => {
      if (element.current) {
        if (containerNode) {
          containerNode.removeChild(element.current);
        } else if (typeof document !== 'undefined' && document.body) {
          document.body.removeChild(element.current);
        }
      }
    };
  }, []);

  useEffect(() => {
    if (!element.current) {
      return;
    }
    element.current.style.zIndex = zIndex === undefined ? '' : `${zIndex}`;
    element.current.className = zIndex === undefined ? '' : styles.layer;
  }, [zIndex, refs]);

  if (!mounted || !element.current) {
    return <div ref={positionRef} />;
  }

  return createPortal(children, element.current);
}
