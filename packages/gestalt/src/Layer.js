// @flow strict
import React, { useRef, useState, type Portal, type Node, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { type Indexable } from './zIndex.js';
import styles from './Layer.css';
import { useScrollableContainer } from './contexts/ScrollableContainer.js';
import { getContainerNode } from './utils/positioningUtils.js';

export default function Layer({
  children,
  zIndex: zIndexIndexable,
}: {|
  children: Node,
  zIndex?: Indexable,
|}): Portal | Node {
  const [mounted, setMounted] = useState(false);
  const portalContainer = useRef<?HTMLDivElement>(null);
  const zIndex = zIndexIndexable?.index();

  // If ScrollableContainer is parent of Layer, useScrollableContainer provides access to
  // the  ScrollableContainer node ref.
  const { scrollableContainerRef } = useScrollableContainer();

  // initialPositionRef is a temporary-placed DOM Node from which to traverse up to find
  // any ScrollableContainer parent. After mounting, it's replaced with a portal.
  const initialPositionRef = useRef<?HTMLDivElement>(null);

  useEffect(() => {
    // After the initial mount, useEffect gets called
    setMounted(true);

    // containerNode stores the ScrollableContainer node to use
    // as container in the portal -createPortal(child, container)-.
    const containerNode = getContainerNode({
      scrollableContainerRef,
      initialPositionRef: initialPositionRef?.current,
    });

    if (typeof document !== 'undefined' && document.createElement) {
      portalContainer.current = document.createElement('div');
    }

    if (portalContainer.current) {
      portalContainer.current.style.zIndex = zIndex === undefined ? '' : zIndex.toString();
      portalContainer.current.className = zIndex === undefined ? '' : styles.layer;

      if (containerNode) {
        // If containerNode is found, append the portal to it
        containerNode.appendChild(portalContainer.current);
      } else if (typeof document !== 'undefined' && document.body) {
        // If not, append the portal to document.body
        document.body.appendChild(portalContainer.current);
      }
    }

    return () => {
      if (portalContainer.current) {
        if (containerNode) {
          containerNode.removeChild(portalContainer.current);
        } else if (typeof document !== 'undefined' && document.body) {
          document.body.removeChild(portalContainer.current);
        }
      }
    };
  }, [zIndex, scrollableContainerRef]);

  if (!mounted || !portalContainer.current) {
    // The initial render will be this temporary div
    // to capture the initial position of the DOM node in the DOM tree
    return <div ref={initialPositionRef} />;
  }

  // After useEffect, we render the children into the portal container node outside the DOM hierarchy
  return createPortal(children, portalContainer.current);
}
