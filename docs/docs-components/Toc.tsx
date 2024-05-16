import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box, TableOfContents } from 'gestalt';

const HEADER_HEIGHT_PX = 60;
const FOOTER_HEIGHT_PX = 112;

function throttle(func: null | (() => void), wait: number) {
  let context;
  let args;
  let result;
  let timeout = null;
  let previous = 0;
  function later() {
    if (!func) {
      return;
    }
    previous = Date.now();
    timeout = null;
    if (args) {
      result = func.apply(context, args);
    } else {
      result = func.apply(context);
    }
    if (!timeout) {
      context = null;
      args = null;
    }
  }
  return function throttled(this: null, ...params: $ArrayLike<unknown>) {
    if (!func) {
      return null;
    }
    const now = Date.now();
    if (!previous) previous = now;
    const remaining = wait - (now - previous);
    context = this;
    args = params;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      if (args) {
        result = func.apply(context, args);
      } else {
        result = func.apply(context);
      }
      if (!timeout) {
        context = null;
        args = null;
      }
    } else if (!timeout) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

function useThrottledOnScroll(callback: null | (() => void), delay: number) {
  const throttledCallback = useMemo(() => throttle(callback, delay), [callback, delay]);

  useEffect(() => {
    window.addEventListener('scroll', throttledCallback);
    return () => {
      window.removeEventListener('scroll', throttledCallback);
    };
  }, [throttledCallback]);
}

type ToCItem = {
  id: string;
  label: string;
  children: ReadonlyArray<{
    id: string;
    label: string;
  }>;
};

type HandleClickParameters = {
  hash: string;
  event:
    | React.MouseEvent<HTMLDivElement>
    | React.KeyboardEvent<HTMLDivElement>
    | React.MouseEvent<HTMLAnchorElement>
    | React.KeyboardEvent<HTMLAnchorElement>;
};

type Props = {
  cards: ReadonlyArray<ReactNode>;
};

export default function Toc({ cards }: Props) {
  const [anchors, setAnchors] = useState<ReadonlyArray<HTMLElement>>([]);
  const [activeState, setActiveState] = useState<null | string>(null);
  const clickedRef = useRef<boolean>(false);
  const unsetClickedRef = useRef<null | number>(null);

  const findActiveIndex = useCallback(() => {
    // Don't set the active index based on scroll if a link was just clicked
    if (clickedRef.current) {
      return;
    }

    let active: HTMLElement | null | undefined;

    anchors
      .slice()
      .reverse()
      .every((anchor) => {
        // No hash if we're near the top of the page
        if (document.documentElement && document.documentElement.scrollTop < 120) {
          active = null;
          return false;
        }

        if (
          document.documentElement &&
          anchor?.offsetTop <
            document.documentElement.scrollTop + document.documentElement.clientHeight / 8
        ) {
          active = anchor;
          return false;
        }

        return true;
      });
    if (active && activeState !== active.id) {
      setActiveState(active.id);
    }
  }, [anchors, activeState]);

  useEffect(() => {
    setAnchors([...document.querySelectorAll('[data-anchor]')]);
  }, [cards]);

  // Corresponds to 10 frames at 60 Hz
  useThrottledOnScroll(anchors.length > 0 ? findActiveIndex : null, 166);

  const handleClick = ({ hash, event }: HandleClickParameters) => {
    // Ignore click for new tab/new window behavior
    if (
      event.defaultPrevented ||
      event.button !== 0 || // ignore everything but left-click
      event.metaKey ||
      event.ctrlKey ||
      event.altKey ||
      event.shiftKey
    ) {
      return;
    }

    // Used to disable findActiveIndex if the page scrolls due to a click
    clickedRef.current = true;
    unsetClickedRef.current = setTimeout(() => {
      clickedRef.current = false;
    }, 1000);

    if (activeState !== hash) {
      setActiveState(hash);
    }
  };

  useEffect(
    () => () => {
      clearTimeout(unsetClickedRef.current);
    },
    [],
  );

  const items = useMemo(() => {
    const result: Array<ToCItem> = [];

    anchors.reduce((accumulated, anchor, i) => {
      const isParentItem = i === 0 || anchor.getElementsByTagName('h2').length > 0;
      const lastParentItem = accumulated.at(-1);

      if (isParentItem) {
        accumulated.push({
          id: anchor.id,
          label: anchor.innerText?.replace('Beta', '') || '',
          children: [],
        });
      } else if (lastParentItem) {
        lastParentItem.children = [
          ...lastParentItem.children,
          {
            id: anchor.id,
            label: anchor.innerText?.replace('Beta', '').replace('Alpha', '') || '',
          },
        ];
      }

      return accumulated;
    }, result);

    return result;
  }, [anchors]);

  return (
    <Box
      // Accounting for the footer height as set in App.js
      dangerouslySetInlineStyle={{
        __style: { marginBottom: FOOTER_HEIGHT_PX },
      }}
      // These margins counter the padding set on the <Box role="main"> in App.js
      lgMarginTop={-8}
      marginTop={-4}
      maxHeight={`calc(100% - ${HEADER_HEIGHT_PX}px - ${FOOTER_HEIGHT_PX}px)`}
      mdMarginTop={-6}
      overflow="auto"
      paddingX={1}
      paddingY={8} // re-apply just the padding we need
      position="fixed"
      width={240}
    >
      <TableOfContents>
        {items.map((item) => (
          <TableOfContents.Item
            key={item.id}
            active={activeState === item.id}
            href={`#${item.id}`}
            label={item.label}
            onClick={({ event }) => handleClick({ hash: item.id, event })}
          >
            {item.children.map((subitem) => (
              <TableOfContents.Item
                key={subitem.id}
                active={activeState === subitem.id}
                href={`#${subitem.id}`}
                label={subitem.label}
                onClick={({ event }) => handleClick({ hash: subitem.id, event })}
              />
            ))}
          </TableOfContents.Item>
        ))}
      </TableOfContents>
    </Box>
  );
}
