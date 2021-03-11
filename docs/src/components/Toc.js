// @flow strict
import type { Node } from 'react';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Box, Flex, Link, Text } from 'gestalt';

function throttle(func, wait) {
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
    // $FlowIssue[incompatible-type]
    result = func.apply(context, args);
    if (!timeout) {
      context = null;
      args = null;
    }
  }
  return function throttled(...params) {
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
      result = func.apply(context, args);
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

function useThrottledOnScroll(callback, delay) {
  const throttledCallback = useMemo(() => throttle(callback, delay), [callback, delay]);

  useEffect(() => {
    window.addEventListener('scroll', throttledCallback);
    return () => {
      window.removeEventListener('scroll', throttledCallback);
    };
  }, [throttledCallback]);
}

type Props = {|
  cards: Array<Node>,
|};

export default function Toc({ cards }: Props): Node {
  const [anchors, setAnchors] = useState([]);
  const [activeState, setActiveState] = useState(null);
  const clickedRef = useRef(false);
  const unsetClickedRef = useRef(null);

  const findActiveIndex = useCallback(() => {
    // Don't set the active index based on scroll if a link was just clicked
    if (clickedRef.current) {
      return;
    }

    let active;

    anchors
      .slice()
      .reverse()
      .every((anchor) => {
        // No hash if we're near the top of the page
        if (document.documentElement && document.documentElement.scrollTop < 120) {
          active = { id: null };
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

  const handleClick = (hash, event) => {
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

  return (
    <Box
      // Accounting for the footer height as set in App.js
      dangerouslySetInlineStyle={{ __style: { marginBottom: '90px' } }}
      // These margins counter the padding set on the <Box role="main"> in App.js
      marginTop={-4}
      mdMarginTop={-6}
      lgMarginTop={-8}
      maxHeight="calc(100% - 60px - 90px)"
      minWidth={240}
      overflow="auto"
      paddingY={8} // re-apply just the padding we need
      position="fixed"
    >
      {anchors.map((anchor) => {
        const isActive = activeState === anchor.id;
        return (
          <Flex key={anchor.id}>
            {/* INDICATOR */}
            <Box color={isActive ? 'pine' : 'lightGray'} width={1} flex="none" />

            <Link
              hoverStyle={isActive ? 'none' : 'underline'}
              href={`#${anchor.id}`}
              onClick={({ event }) => handleClick(anchor.id, event)}
            >
              <Box padding={2}>
                {anchor.getElementsByTagName('h2').length > 0 ? (
                  <Text color={isActive ? 'pine' : 'darkGray'} weight="bold">
                    {anchor.innerText}
                  </Text>
                ) : (
                  <Box paddingX={3}>
                    <Text size="md" color={isActive ? 'pine' : 'darkGray'} weight="bold">
                      {anchor.innerText}
                    </Text>
                  </Box>
                )}
              </Box>
            </Link>
          </Flex>
        );
      })}
    </Box>
  );
}
