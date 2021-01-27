// @flow strict
import React, {
  useRef,
  useState,
  type Portal,
  type Node,
  useEffect,
} from 'react';
import { createPortal } from 'react-dom';
import { type Indexable } from './zIndex.js';
import styles from './Layer.css';
import { useScrollableBoxStore } from './contexts/ScrollableBoxStore.js';

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

  // When using Gestalt Provider (ScrollableBoxStoreProvider) and ScrollableBox,
  // the useScrollableBoxStore hook will return an array of the registered ScrollableBox under the Provider.
  const { refs } = useScrollableBoxStore();

  // initialPositionRef is the DOM Node from which we will traverse up to find any existing ScrollableBox parent
  const initialPositionRef = useRef<?HTMLDivElement>(null);

  useEffect(() => {
    // After the initial mount, this useEffect gets called
    setMounted(true);

    // Here we create a new div to be appended in the DOM tree through the React.Portal or another DOM Node reference.
    if (typeof document !== 'undefined' && document.createElement) {
      portalContainer.current = document.createElement('div');
    }

    // containerNode is a helper constant that allows us to reference the ScrollableBox node to append the the new div via React.Portal
    let containerNode = null;
    // currentNode is a helper constant that allows us to reference a DOM node while traversing up nodes in the DOM tree
    let currentNode = initialPositionRef.current;

    while (!containerNode) {
      // This loop will traverse currentNode up accessing its parent node until matching with the wrapping-ScrollableBox ref
      // stored in the ScrollableBoxStore context or until reaching the HTML document (loop break)
      if (refs.length !== 0 && currentNode && currentNode.parentNode) {
        // eslint-disable-next-line no-loop-func
        refs.forEach((ref) => {
          if (
            currentNode instanceof HTMLDivElement &&
            ref?.isSameNode(currentNode)
          ) {
            containerNode = ref;
          }
        });
        currentNode = currentNode.parentNode;
      } else {
        break;
      }
    }

    if (portalContainer.current) {
      if (containerNode) {
        // If containerNode contains the registered and matched ScrollableBox, append
        containerNode.appendChild(portalContainer.current);
      } else if (typeof document !== 'undefined' && document.body) {
        document.body.appendChild(portalContainer.current);
      }
    }

    if (portalContainer.current) {
      portalContainer.current.style.zIndex =
        zIndex === undefined ? '' : zIndex.toString();
      portalContainer.current.className =
        zIndex === undefined ? '' : styles.layer;
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
  }, [zIndex]);

  if (!mounted || !portalContainer.current) {
    // The initial mount will temporary render this div to capture the initial position of the DOM node in the DOM tree
    return <div ref={initialPositionRef} />;
  }

  // Finally, we render children into the portal container node outside the DOM hierarchy
  return createPortal(children, portalContainer.current);
}
