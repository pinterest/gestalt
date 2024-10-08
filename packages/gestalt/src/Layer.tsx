import { ReactElement, ReactNode, ReactPortal, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useScrollBoundaryContainer } from './contexts/ScrollBoundaryContainerProvider';
import styles from './Layer.css';
import getContainerNode from './utils/positioningUtils';
import { Indexable } from './zIndex';

type Props = {
  /**
   *
   */
  children: ReactNode;
  /**
   * An object representing the z-index value of the Layer. See the [z-index example](https://gestalt.pinterest.systems/web/layer#zIndex) for more details.
   */
  zIndex?: Indexable;
};

/**
 * [Layers](https://gestalt.pinterest.systems/web/layer) allow you to render children outside the DOM hierarchy of the parent. It's a wrapper around React createPortal that lets you use it as a component. This is particularly useful for places you might have needed to use z-index to overlay the screen before.
 *
 * ![Layer](https://raw.githubusercontent.com/pinterest/gestalt/master/docs/graphics/building-blocks/Layer.svg)
 */
export default function Layer({
  children,
  zIndex: zIndexIndexable,
}: Props): ReactPortal | ReactElement {
  const [mounted, setMounted] = useState(false);
  const portalContainer = useRef<HTMLDivElement | null | undefined>(null);
  const zIndex = zIndexIndexable?.index();

  // If ScrollBoundaryContainer is parent of Layer, useScrollBoundaryContainer provides access to
  // the  ScrollBoundaryContainer node ref.
  const { scrollBoundaryContainerRef } = useScrollBoundaryContainer();

  // initialPositionRef is a temporary-placed DOM Node from which to traverse up to find
  // any ScrollBoundaryContainer parent. After mounting, it's replaced with a portal.
  const initialPositionRef = useRef<HTMLDivElement | null | undefined>(null);

  useEffect(() => {
    // After the initial mount, useEffect gets called
    setMounted(true);

    // containerNode stores the ScrollBoundaryContainer node to use
    // as container in the portal -createPortal(child, container)-.
    const containerNode = getContainerNode({
      scrollBoundaryContainerRef,
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
  }, [zIndex, scrollBoundaryContainerRef]);

  if (!mounted || !portalContainer.current) {
    // The initial render will be this temporary div
    // to capture the initial position of the DOM node in the DOM tree
    // @ts-expect-error - TS2322 - Type 'MutableRefObject<HTMLDivElement | null | undefined>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'.
    return <div ref={initialPositionRef} />;
  }

  // After useEffect, we render the children into the portal container node outside the DOM hierarchy
  // @ts-expect-error - TS2322 - Type 'ReactPortal' is not assignable to type 'ReactNode'.
  return createPortal(children, portalContainer.current);
}

Layer.displayName = 'Layer';
