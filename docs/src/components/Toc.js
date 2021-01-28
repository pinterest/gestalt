// @flow strict
import React, { useEffect, useState, type Node } from 'react';
import { Box, Text, Link } from 'gestalt';

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
  const throttledCallback = React.useMemo(() => throttle(callback, delay), [callback, delay]);

  React.useEffect(() => {
    window.addEventListener('scroll', throttledCallback);
    return () => {
      window.removeEventListener('scroll', throttledCallback);
    };
  }, [throttledCallback]);
}

export default function Toc({ cards }: {| cards: Array<Node> |}): Node {
  const [anchors, setAnchors] = useState([]);
  const [activeState, setActiveState] = React.useState(null);
  const clickedRef = React.useRef(false);
  const unsetClickedRef = React.useRef(null);

  const findActiveIndex = React.useCallback(() => {
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

  React.useEffect(
    () => () => {
      clearTimeout(unsetClickedRef.current);
    },
    [],
  );

  return (
    <Box>
      {anchors.map((anchor, index) => (
        <Box key={index} display="flex">
          <Box color={activeState === anchor.id ? 'pine' : 'lightGray'} width={1} flex="none" />
          <Link
            hoverStyle={activeState === anchor.id ? 'none' : 'underline'}
            href={`#${anchor.id}`}
            onClick={({ event }) => handleClick(anchor.id, event)}
          >
            <Box padding={2}>
              <Text color={activeState === anchor.id ? 'pine' : 'darkGray'} weight="bold">
                {anchor.closest('h2')?.textContent}
              </Text>
            </Box>
          </Link>
        </Box>
      ))}
    </Box>
  );
}
